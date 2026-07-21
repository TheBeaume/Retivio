from pathlib import Path

content = r'''import { ExternalLink, LayoutTemplate } from "lucide-react";

export default function TemplatesPreview() {
  return (
    <section id="featured-websites" className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Featured Websites
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Professional websites built with Retivio.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore websites created using Retivio. More customer websites
            will be added as our community grows.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">

            <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-400">
              AURELIA Preview
            </div>

            <div className="p-7">

              <h3 className="text-2xl font-semibold text-slate-950">
                AURELIA
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Luxury salon website designed for modern beauty businesses.
              </p>

              <div className="mt-8 flex gap-3">

                <a
                  href="/templates/aurelia"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>

                <a
                  href="/website-builder"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:border-purple-300 hover:text-purple-700"
                >
                  <LayoutTemplate size={16} />
                  Use Design
                </a>

              </div>

            </div>

          </div>

          {["Your Business Could Be Here","Your Business Could Be Here","Your Business Could Be Here"].map((item,index)=>(
            <div
              key={index}
              className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 flex items-center justify-center text-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-700">
                  {item}
                </h3>

                <p className="mt-3 text-slate-500">
                  Showcase your business with a professional website built
                  using Retivio.
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/TemplatesPreview.jsx").write_text(content)

landing = Path("src/pages/LandingPage.jsx")
text = landing.read_text()

if 'import TemplatesPreview from "../components/landing/TemplatesPreview";' not in text:
    text = text.replace(
        'import WebsiteBuilderCTA from "../components/landing/WebsiteBuilderCTA";',
        'import WebsiteBuilderCTA from "../components/landing/WebsiteBuilderCTA";\nimport TemplatesPreview from "../components/landing/TemplatesPreview";'
    )

text = text.replace(
    '<WebsiteBuilderCTA />',
    '<TemplatesPreview />\n\n        <WebsiteBuilderCTA />'
)

landing.write_text(text)

print("Featured Websites section added successfully.")
