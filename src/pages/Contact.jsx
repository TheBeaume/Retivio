import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Building2,
  LifeBuoy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import SEO from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const CONTACT_ENDPOINT =
  "https://formsubmit.co/ajax/retivio.support@gmail.com";

const initialForm = {
  name: "",
  email: "",
  salon: "",
  enquiryType: "Product enquiry",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          salon: form.salon || "Not provided",
          enquiry_type: form.enquiryType,
          message: form.message,
          _subject: `New Retivio enquiry: ${form.enquiryType}`,
          _template: "table",
          _url: "https://retivio.in/contact",
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success === "false" || data.success === false) {
        throw new Error(data.message || "Unable to send your message.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message ||
          "We could not send your message. Please try again."
      );
    }
  };

  return (
    <>
      <SEO
        title="Contact Retivio | Product, Support & Partnership Enquiries"
        description="Contact Retivio for salon CRM questions, product enquiries, support, partnerships and digital product discussions."
        canonical="/contact"
      />

      <Navbar />

      <main className="bg-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
                Contact Retivio
              </p>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Let's talk about your salon,
                <span className="text-purple-400"> product or idea.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Questions about Retivio, support, partnerships or salon
                digital products? Send a message and tell us what you need.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquareText,
                  title: "Product enquiries",
                  text: "Questions about Retivio, AURELIA or salon digital products.",
                },
                {
                  icon: LifeBuoy,
                  title: "Support",
                  text: "Tell us what is not working or where you need help.",
                },
                {
                  icon: Building2,
                  title: "Partnerships",
                  text: "Discuss business, product and collaboration opportunities.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Icon size={21} />
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-slate-950">
                    {title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl bg-purple-700 p-6 text-white">
                <Mail size={22} />

                <p className="mt-5 text-sm text-purple-200">
                  Prefer email?
                </p>

                <p className="mt-1 break-all font-bold">
                  retivio.support@gmail.com
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
              {status === "success" ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={30} />
                  </div>

                  <h2 className="mt-6 text-3xl font-extrabold text-slate-950">
                    Message received.
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-slate-600">
                    Thank you for contacting Retivio. Your enquiry has been
                    submitted successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-7 font-bold text-purple-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                    Send a message
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                    How can we help?
                  </h2>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700">
                          Your name
                        </span>
                        <input
                          required
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                          placeholder="Full name"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700">
                          Email address
                        </span>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                          placeholder="you@example.com"
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700">
                          Salon or business
                        </span>
                        <input
                          type="text"
                          name="salon"
                          value={form.salon}
                          onChange={handleChange}
                          autoComplete="organization"
                          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                          placeholder="Optional"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700">
                          Enquiry type
                        </span>
                        <select
                          name="enquiryType"
                          value={form.enquiryType}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                        >
                          <option>Product enquiry</option>
                          <option>Retivio support</option>
                          <option>Salon website</option>
                          <option>Partnership</option>
                          <option>Feedback</option>
                          <option>Other</option>
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">
                        Message
                      </span>
                      <textarea
                        required
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={7}
                        className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                        placeholder="Tell us how we can help..."
                      />
                    </label>

                    {status === "error" && (
                      <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={19} className="flex-shrink-0" />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 font-bold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
