import { ExternalLink, LayoutTemplate } from "lucide-react";
import aureliaShowcase from "../../assets/images/aurelia-showcase.png";

export default function TemplatesPreview() {
  return (
    <section id="featured-websites" className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Featured Websites
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
            Professional websites built with Retivio.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore websites created using Retivio. More customer websites
            will be added as our community grows.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">

            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white flex items-center justify-center">
              <img
                src={aureliaShowcase}
                alt="AURELIA Luxury Salon Website"
                className="w-full h-full object-contain bg-white p-4 transition duration-500 hover:scale-105"
                loading="lazy"
              />
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
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3.5 font-semibold text-white hover:bg-purple-800"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>

                <a
                  href="/website-builder"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-900 hover:border-purple-300 hover:text-purple-700"
                >
                  <LayoutTemplate size={16} />
                  Use Design
                </a>

              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-dashed border-purple-300 bg-purple-50 p-10 text-center">

            <h3 className="text-2xl font-semibold text-slate-950">
              Ready to showcase your business?
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              Your business could be the next featured website built with
              Retivio.
            </p>

            <a
              href="/website-builder"
              className="mt-8 inline-flex rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white hover:bg-purple-800"
            >
              Build Your Website
            </a>

          </div>


        </div>

      </div>

    </section>
  );
}