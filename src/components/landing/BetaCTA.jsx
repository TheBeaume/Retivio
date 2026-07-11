import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function BetaCTA() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-purple-900/60 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
              Start with Retivio
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to run your salon from one place?
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Start organising customers, appointments, follow-ups,
              billing and growth with a platform built for salon
              businesses.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
              {[
                "Free access available",
                "No credit card required",
                "Web-based platform",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-4 font-bold text-white shadow-lg shadow-purple-900/30 transition hover:-translate-y-0.5 hover:bg-purple-500"
          >
            Create free account
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
