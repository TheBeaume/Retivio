from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function WebsiteBuilderCTA() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
              Website Solutions
            </p>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
              Build it yourself or let us build it for you.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Create professional business websites with the Retivio Website Builder,
              or choose our custom website design and development service for a
              completely tailored online presence.
            </p>

            <div className="mt-10 space-y-4">

              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-xl font-semibold text-slate-900">
                  AI Website Builder
                </h3>

                <p className="mt-2 text-slate-600">
                  Design, customise and publish your business website without writing code.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-xl font-semibold text-slate-900">
                  Custom Website Development
                </h3>

                <p className="mt-2 text-slate-600">
                  Work with our team to build a fully customised website that reflects your brand.
                </p>
              </div>

            </div>

            <Link
              to="/website-builder"
              className="mt-10 inline-flex rounded-xl bg-purple-700 px-6 py-3 text-white font-semibold hover:bg-purple-800 transition"
            >
              Explore Website Builder
            </Link>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10">

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="space-y-4">

                <div className="h-5 w-40 rounded bg-slate-200"></div>

                <div className="h-56 rounded-xl border border-slate-200 bg-slate-100"></div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="h-20 rounded-xl bg-slate-100"></div>

                  <div className="h-20 rounded-xl bg-slate-100"></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
'''

Path("src/components/landing/WebsiteBuilderCTA.jsx").write_text(content)

print("WebsiteBuilderCTA updated successfully.")
