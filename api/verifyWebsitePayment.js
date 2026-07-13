import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function getBearerToken(req) {
  const authorization = req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabasePublicKey = process.env.SUPABASE_ANON_KEY;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (
      !supabaseUrl ||
      !supabasePublicKey ||
      !supabaseSecretKey ||
      !razorpayKeyId ||
      !razorpayKeySecret
    ) {
      throw new Error("Server payment configuration is incomplete.");
    }

    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const authClient = createClient(
      supabaseUrl,
      supabasePublicKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication session.",
      });
    }

    const admin = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const {
      projectId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body || {};

    if (
      !projectId ||
      !razorpayPaymentId ||
      !razorpayOrderId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are incomplete.",
      });
    }

    const { data: payment, error: paymentError } = await admin
      .from("website_builder_payments")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .eq("razorpay_order_id", razorpayOrderId)
      .single();

    if (paymentError || !payment) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found.",
      });
    }

    if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        verified: true,
        alreadyVerified: true,
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(
        `${payment.razorpay_order_id}|${razorpayPaymentId}`
      )
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const receivedBuffer = Buffer.from(
      String(razorpaySignature),
      "utf8"
    );

    const signatureValid =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signatureValid) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed.",
      });
    }

    const razorpayPaymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(
        razorpayPaymentId
      )}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${razorpayKeyId}:${razorpayKeySecret}`
            ).toString("base64"),
        },
      }
    );

    const razorpayPayment =
      await razorpayPaymentResponse.json();

    if (
      !razorpayPaymentResponse.ok ||
      razorpayPayment.order_id !== payment.razorpay_order_id ||
      razorpayPayment.amount !== payment.amount ||
      razorpayPayment.currency !== payment.currency ||
      razorpayPayment.status !== "captured"
    ) {
      console.error(
        "Razorpay payment validation failed:",
        razorpayPayment
      );

      return res.status(400).json({
        success: false,
        message:
          "Payment has not been captured successfully.",
      });
    }

    const { error: updateError } = await admin
      .from("website_builder_payments")
      .update({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        status: "paid",
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id)
      .eq("status", "created");

    if (updateError) {
      console.error("Payment update error:", updateError);

      return res.status(500).json({
        success: false,
        message: "Unable to complete payment verification.",
      });
    }

    return res.status(200).json({
      success: true,
      verified: true,
      alreadyVerified: false,
    });
  } catch (error) {
    console.error("Verify website payment error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to verify payment.",
    });
  }
}
