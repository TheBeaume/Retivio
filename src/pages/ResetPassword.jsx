import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleReset(e) {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Your new password must contain at least 6 characters.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match. Please check and try again.",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text:
          error.message ||
          "Your reset link may have expired. Request a new link from the login page.",
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Password updated successfully. Redirecting you to login...",
    });

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1400);
  }

  return (
    <>
      <SEO
        title="Reset Password | Retivio"
        description="Securely create a new password for your Retivio account."
        canonical="/reset-password"
      />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-12">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-7 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Retivio
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <ShieldCheck size={27} />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950">
              Create a new password
            </h1>

            <p className="mt-3 leading-7 text-slate-600">
              Choose a secure password for your Retivio account.
            </p>

            {message && (
              <div
                className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message.type === "success" && (
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleReset} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="text-sm font-semibold text-slate-800"
                >
                  New password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-12 pr-12 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-new-password"
                  className="text-sm font-semibold text-slate-800"
                >
                  Confirm new password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirm-new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Updating password...
                  </>
                ) : (
                  <>
                    Update password
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Secure account access powered by Retivio
          </p>
        </div>
      </main>
    </>
  );
}
