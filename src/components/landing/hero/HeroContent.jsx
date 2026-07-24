import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">

      <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
        <span className="h-2 w-2 rounded-full bg-purple-500" />
        AI Powered Business Platform
      </div>

      <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
        Grow Your Business.
        <br />
        Manage Everything.
        <br />
        <span className="text-gradient">
          From One Platform.
        </span>
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-9 text-slate-300">
        Retivio combines professional websites, salon CRM and
        marketing tools into one platform so you can attract
        more customers, manage daily operations and grow
        faster.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        <Link
          to="/signup"
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold"
        >
          Start Free

          <ArrowRight size={18} />

        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
        >
          Book Demo
        </Link>

      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">

        {[
          "Website Builder",
          "Salon CRM",
          "Marketing",
          "AI Powered",
        ].map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <span className="text-slate-400">
              {item}
            </span>

            {index < 3 && (
              <span className="text-slate-600">
                •
              </span>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}
