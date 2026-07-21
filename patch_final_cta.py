from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function BetaCTA() {
  return (
    <section className="bg-slate-950 py-24">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
          Get Started
        </p>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Build, manage and grow your business with Retivio.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Whether you need a professional website, a complete Salon CRM or
          marketing tools, Retivio provides everything you need in one
          integrated platform.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/signup"
            className="rounded-xl bg-purple-700 px-7 py-3.5 font-semibold text-white transition hover:bg-purple-800"
          >
            Get Started
          </Link>

          <Link
            to="/contact"
            className="rounded-xl border border-slate-600 px-7 py-3.5 font-semibold text-white transition hover:border-white"
          >
            Book Demo
          </Link>

        </div>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/BetaCTA.jsx").write_text(content)

print("BetaCTA.jsx updated successfully.")
