import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      return;
    }

    const requestedRedirect = searchParams.get("redirect");

    const safeRedirect =
      requestedRedirect &&
      requestedRedirect.startsWith("/") &&
      !requestedRedirect.startsWith("//")
        ? requestedRedirect
        : "/dashboard";

    navigate(safeRedirect, { replace: true });
  }

  async function forgotPassword() {
    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Enter your email address first, then select Forgot password.",
      });
      return;
    }

    setMessage(null);
    setActionLoading("reset");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: "https://retivio.in/reset-password",
      }
    );

    setActionLoading("");

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Password reset link sent. Check your inbox and spam folder.",
    });
  }

  async function resendVerification() {
    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Enter your email address first to resend verification.",
      });
      return;
    }

    setMessage(null);
    setActionLoading("verify");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: {
        emailRedirectTo: "https://retivio.in/login",
      },
    });

    setActionLoading("");

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Verification email sent. Please check your inbox and spam folder.",
    });
  }

  return (
    <>
      <SEO
        title="Log in | Retivio Salon CRM"
        description="Log in to Retivio and manage customers, appointments, follow-ups and salon growth from one powerful dashboard."
        canonical="/login"
      />

      <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <Link
            to="/"
            className="relative z-10 text-3xl font-extrabold tracking-tight"
          >
            Retivio
          </Link>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-purple-100">
              <Sparkles size={16} />
              Built for modern salon businesses
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-tight">
              Welcome back to your salon growth workspace.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Manage customer relationships, appointments, follow-ups and
              business insights from one focused platform.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Keep customer history organized",
                "Stay on top of appointments and follow-ups",
                "Understand your salon performance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={19} className="text-purple-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            A Retivio product by Pravi Technologies
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-tight text-purple-700"
              >
                Retivio
              </Link>

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
              >
                <ArrowLeft size={16} />
                Home
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                  Welcome back
                </span>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
                  Log in to Retivio
                </h2>

                <p className="mt-3 text-slate-600">
                  Enter your account details to continue.
                </p>
              </div>

              {message && (
                <div
                  className={`mt-6 rounded-2xl border px-4 py-3 text-sm leading-6 ${
                    message.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="login-password"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={forgotPassword}
                      disabled={actionLoading === "reset"}
                      className="text-sm font-semibold text-purple-700 transition hover:text-purple-900 disabled:opacity-60"
                    >
                      {actionLoading === "reset"
                        ? "Sending..."
                        : "Forgot password?"}
                    </button>
                  </div>

                  <div className="relative mt-2">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      Log in
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 border-t border-slate-200 pt-6 text-center">
                <p className="text-sm text-slate-600">
                  Haven't verified your email?
                </p>

                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={actionLoading === "verify"}
                  className="mt-2 text-sm font-bold text-purple-700 transition hover:text-purple-900 disabled:opacity-60"
                >
                  {actionLoading === "verify"
                    ? "Sending verification..."
                    : "Resend verification email"}
                </button>
              </div>
            </div>

            <p className="mt-7 text-center text-sm text-slate-600">
              New to Retivio?{" "}
              <Link
                to="/signup"
                className="font-bold text-purple-700 hover:text-purple-900"
              >
                Create your free account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
