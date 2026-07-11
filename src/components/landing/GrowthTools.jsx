import {
  Search,
  BellRing,
  Megaphone,
  BarChart3,
  ArrowRight,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: BellRing,
    title: "Retention opportunities",
    text: "Keep follow-up activity visible instead of letting customers quietly disappear.",
  },
  {
    icon: Megaphone,
    title: "Campaign planning",
    text: "Bring targeted customer outreach closer to the customer information in your CRM.",
  },
  {
    icon: BarChart3,
    title: "Business visibility",
    text: "Use reports to understand revenue and customer activity with more clarity.",
  },
];

export default function GrowthTools() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full bg-purple-100/60 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-400">
                    Growth workspace
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Find the next opportunity
                  </h3>
                </div>
                <Target size={25} className="text-purple-400" />
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-500">
                  <Search size={18} />
                  <span className="text-sm">Search potential businesses...</span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    ["Aura Beauty Studio", "Business opportunity"],
                    ["The Glow Room", "Potential prospect"],
                    ["Blush Salon", "Growth lead"],
                  ].map(([name, label]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div>
                        <p className="text-sm font-semibold">{name}</p>
                        <p className="mt-1 text-xs text-slate-500">{label}</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
              Built for salon growth
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              More than salon management. Built to help you move forward.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Retivio brings growth-focused workflows into the same
              platform you use to understand customers and salon activity.
            </p>

            <div className="mt-8 space-y-5">
              {tools.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/signup"
              className="mt-9 inline-flex items-center gap-2 font-bold text-purple-700 transition hover:gap-3"
            >
              Explore Retivio
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
