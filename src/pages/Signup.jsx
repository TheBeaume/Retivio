import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must contain at least 6 characters.",
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

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: "https://retivio.in/login",
        data: {
          owner_name: ownerName.trim(),
          salon_name: salonName.trim(),
          mobile: mobile.trim(),
          city: city.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      return;
    }

    if (window.gtag) {
      window.gtag("event", "sign_up", {
        method: "email",
      });
    }

    navigate("/login", {
      replace: true,
    });
  }

  const fields = [
    {
      id: "owner-name",
      label: "Owner name",
      placeholder: "Your full name",
      value: ownerName,
      setter: setOwnerName,
      icon: User,
      type: "text",
      autoComplete: "name",
      required: true,
    },
    {
      id: "salon-name",
      label: "Salon name",
      placeholder: "Your salon or business name",
      value: salonName,
      setter: setSalonName,
      icon: Building2,
      type: "text",
      autoComplete: "organization",
      required: true,
    },
    {
      id: "mobile",
      label: "Mobile number",
      placeholder: "Your contact number",
      value: mobile,
      setter: setMobile,
      icon: Phone,
      type: "tel",
      autoComplete: "tel",
      required: true,
    },
    {
      id: "city",
      label: "City",
      placeholder: "Where is your salon?",
      value: city,
      setter: setCity,
      icon: MapPin,
      type: "text",
      autoComplete: "address-level2",
      required: false,
    },
  ];

  return (
    <>
      <SEO
        title="Create Free Account | Retivio Salon CRM"
        description="Create your free Retivio account and start managing customers, appointments, follow-ups and salon growth."
        canonical="/signup"
      />

      <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <Link
            to="/"
            className="relative z-10 text-3xl font-extrabold tracking-tight"
          >
            Retivio
          </Link>

          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-purple-100">
              <Sparkles size={16} />
              Start free
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-tight">
              Build stronger customer relationships.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Give your salon one organized place for customer management,
              appointments, follow-ups and business growth.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Free to start",
                "Built specifically for salons",
                "Simple, focused and easy to use",
                "Access from your browser",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={19} className="text-purple-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            Built by Pravi Technologies
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:py-14">
          <div className="w-full max-w-xl">
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
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                Get started
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Create your Retivio account
              </h2>

              <p className="mt-3 text-slate-600">
                Start organizing and growing your salon from one workspace.
              </p>

              {message && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSignup} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => {
                    const Icon = field.icon;

                    return (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="text-sm font-semibold text-slate-800"
                        >
                          {field.label}
                        </label>

                        <div className="relative mt-2">
                          <Icon
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id={field.id}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            required={field.required}
                            className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>

                    <div className="relative mt-2">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-11 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Confirm password
                    </label>

                    <div className="relative mt-2">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  By creating an account, you agree to Retivio's{" "}
                  <Link to="/terms" className="font-semibold text-purple-700">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-semibold text-purple-700"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create free account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-7 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-purple-700 hover:text-purple-900"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
