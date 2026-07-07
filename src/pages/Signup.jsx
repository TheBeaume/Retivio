import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";

export default function Signup() {
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [salonName, setSalonName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: "https://retivio.in/login",
  },
});

if (error) {
  console.log("Signup Error:", error);
  alert(JSON.stringify(error, null, 2));
  return;
}

if (window.gtag) {
  window.gtag("event", "sign_up", {
    method: "email",
  });
}

alert(
  "🎉 Welcome to Retivio!\n\nYour account has been created successfully."
);

navigate("/login");
}

return (
  <>
    <SEO
      title="Start Free | Retivio Salon CRM"
      description="Create your free Retivio account and start managing appointments, customers, WhatsApp follow-ups and salon growth."
      canonical="/signup"
    />

<div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Create Retivio Account
        </h1>

        <input
          type="text"
          placeholder="Owner Name"
          className="w-full border p-3 rounded mb-4"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Salon Name"
          className="w-full border p-3 rounded mb-4"
          value={salonName}
          onChange={(e) => setSalonName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full border p-3 rounded mb-4"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="City"
          className="w-full border p-3 rounded mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded mb-6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl font-semibold"
        >
          Create Account
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 text-purple-700 font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    </>
);
}
