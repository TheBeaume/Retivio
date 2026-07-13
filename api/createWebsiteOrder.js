import { createClient } from "@supabase/supabase-js";

const WEBSITE_PRICE = 299900;
const CURRENCY = "INR";

function getBearerToken(req) {
  const authorization = req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7);
}

function getServerConfig() {
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

  return {
    supabaseUrl,
    supabasePublicKey,
    supabaseSecretKey,
    razorpayKeyId,
    razorpayKeySecret,
  };
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
    const config = getServerConfig();
    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const authClient = createClient(
      config.supabaseUrl,
      config.supabasePublicKey,
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
      console.error("Supabase auth validation error:", {
        message: userError?.message || null,
        status: userError?.status || null,
        code: userError?.code || null,
        hasUser: Boolean(user),
      });

      return res.status(401).json({
        success: false,
        message: "Invalid authentication session.",
      });
    }

    const admin = createClient(
      config.supabaseUrl,
      config.supabaseSecretKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const projectId = String(req.body?.projectId || "");

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Website project is required.",
      });
    }

    const { data: project, error: projectError } = await admin
      .from("website_builder_projects")
      .select("id, user_id, business_name")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Website project not found.",
      });
    }

    const { data: paidPayment } = await admin
      .from("website_builder_payments")
      .select("id")
      .eq("project_id", project.id)
      .eq("user_id", user.id)
      .eq("status", "paid")
      .maybeSingle();

    if (paidPayment) {
      return res.status(200).json({
        success: true,
        alreadyPaid: true,
      });
    }

    const receipt = `website_${project.id.replace(/-/g, "").slice(0, 24)}`;

    const razorpayResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${config.razorpayKeyId}:${config.razorpayKeySecret}`
            ).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: WEBSITE_PRICE,
          currency: CURRENCY,
          receipt,
          notes: {
            project_id: project.id,
            user_id: user.id,
            product: "Retivio Website Hosting",
          },
        }),
      }
    );

    const razorpayOrder = await razorpayResponse.json();

    if (!razorpayResponse.ok || !razorpayOrder?.id) {
      console.error("Razorpay order error:", razorpayOrder);

      return res.status(502).json({
        success: false,
        message: "Unable to create payment order.",
      });
    }

    const { error: paymentError } = await admin
      .from("website_builder_payments")
      .insert({
        project_id: project.id,
        user_id: user.id,
        provider: "razorpay",
        amount: WEBSITE_PRICE,
        currency: CURRENCY,
        razorpay_order_id: razorpayOrder.id,
        status: "created",
      });

    if (paymentError) {
      console.error("Payment record error:", paymentError);

      return res.status(500).json({
        success: false,
        message: "Unable to prepare payment record.",
      });
    }

    return res.status(200).json({
      success: true,
      alreadyPaid: false,
      keyId: config.razorpayKeyId,
      orderId: razorpayOrder.id,
      amount: WEBSITE_PRICE,
      currency: CURRENCY,
      businessName: project.business_name,
    });
  } catch (error) {
    console.error("Create website order error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create payment order.",
    });
  }
}
