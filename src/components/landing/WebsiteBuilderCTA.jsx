import { Link } from "react-router-dom";
import {
  ArrowRight,
  MonitorSmartphone,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

export default function WebsiteBuilderCTA() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
                <Sparkles size={16} />
                Retivio Website Builder
              </div>

              <h2 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Build your salon website in minutes.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Choose a website style, add your salon details and watch
                your website come to life instantly. No coding required.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: Palette,
                    label: "Choose your style",
                  },
                  {
                    icon: Zap,
                    label: "Edit instantly",
                  },
                  {
                    icon: MonitorSmartphone,
                    label: "Live preview",
                  },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <Icon size={18} className="text-purple-400" />
                    <span className="text-sm font-semibold text-slate-200">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/website-builder"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-purple-500"
              >
                Try Website Builder
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />

                <span className="ml-3 text-xs text-slate-500">
                  Live website preview
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl bg-white text-slate-950">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <p className="font-extrabold text-purple-700">
                    Your Salon
                  </p>

                  <p className="text-xs font-bold text-slate-500">
                    BOOK NOW
                  </p>
                </div>

                <div className="bg-slate-950 px-6 py-12 text-center text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
                    Welcome to
                  </p>

                  <h3 className="mt-4 text-3xl font-extrabold">
                    Your Salon
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    Beauty, care and confidence
                  </p>

                  <div className="mx-auto mt-6 w-fit rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold">
                    Book an appointment
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs font-medium text-slate-500">
                Change your details. See your website update instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
