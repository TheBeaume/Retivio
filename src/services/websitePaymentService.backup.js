import { supabase } from "../lib/supabase";

async function getAccessToken() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.access_token) {
    throw new Error("Please sign in before continuing.");
  }

  return session.access_token;
}

async function paymentApiRequest(url, body) {
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Payment request failed."
    );
  }

  return data;
}

export async function createWebsitePaymentOrder(projectId) {
  return await paymentApiRequest(
    "/api/createWebsiteOrder",
    { projectId }
  );
}

export async function verifyWebsitePayment({
  projectId,
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
}) {
  return await paymentApiRequest(
    "/api/verifyWebsitePayment",
    {
      projectId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    }
  );
}

export function loadRazorpayCheckout() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true,
      });

      existingScript.addEventListener(
        "error",
        () =>
          reject(
            new Error("Unable to load secure checkout.")
          ),
        { once: true }
      );

      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve();

    script.onerror = () =>
      reject(
        new Error("Unable to load secure checkout.")
      );

    document.body.appendChild(script);
  });
}
