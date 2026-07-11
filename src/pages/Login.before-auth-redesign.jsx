import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function Login() {
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

navigate("/dashboard");

  }
async function forgotPassword() {
  if (!email.trim()) {
    alert("Please enter your email address first.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://retivio.in/reset-password",
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Password reset email has been sent. Please check your inbox.");
  }
}

async function resendVerification() {
  if (!email) {
    alert("Please enter your email address first.");
    return;
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: "https://retivio.in/login",
    },
  });

  if (error) {
    alert(error.message);
  } else {
    alert(
      "✅ Verification email sent successfully.\n\nPlease check your inbox and spam folder."
    );
  }
}

return (
  <>
    <SEO
      title="Login | Retivio Salon CRM"
      description="Log in to Retivio and manage salon appointments, customers, WhatsApp follow-ups, billing and business growth."
      canonical="/login"
    />

<div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Retivio
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 text-white p-3 rounded"
        >
          Login
        </button>
<div className="mt-6 text-center">

  <p className="text-gray-600">
    Don't have an account?
  </p>

  <button
    type="button"
    onClick={() => navigate("/signup")}
    className="mt-2 text-purple-700 font-semibold hover:underline"
  >
    Create Free Account
  </button>

</div>

<div className="mt-4 text-center">

<div className="space-y-2">

<button
  type="button"
  onClick={forgotPassword}
  className="text-sm text-gray-500 hover:text-purple-700"
>
  Forgot Password?
</button>
  <br />

  <button
    type="button"
    onClick={resendVerification}
    className="text-sm text-purple-700 hover:underline"
  >
    Resend Verification Email
  </button>

</div>
</div>
      </form>
    </div>
</>
  );
}
