import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Globe2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";

const products = [
  {
    name: "AURELIA",
    type: "Luxury Salon Website Template",
    description:
      "A premium, conversion-focused website experience created for salons, beauty studios, spas and modern wellness brands.",
    price: "$49",
    oldPrice: "$79",
    status: "Available now",
    features: [
      "Complete React + Vite source code",
      "Responsive luxury design",
      "SEO-ready structure",
      "Tailwind CSS",
      "Commercial use license",
      "Documentation included",
    ],
    detailsUrl: "/templates/aurelia",
    demoUrl: "https://aurelia-cyan.vercel.app/",
  },
];

export default function Templates() {
  return (
    <>
      <SEO
        title="Salon Digital Products & Website Templates | Retivio"
        description="Explore premium digital products for salon businesses by Retivio, including luxury salon website templates and business growth tools."
        canonical="/templates"
      />

      <Navbar />

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-700 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-900 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200">
                <Layers3 size={16} />
                Retivio Product Studio
              </div>

              <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                Digital products built for
                <span className="block text-purple-400">
                  modern salon businesses.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Launch faster, look more professional and grow with
                carefully designed digital products created specifically
                for the beauty industry.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-semibold text-white transition hover:bg-purple-500"
                >
                  Explore products
                  <ArrowRight size={18} />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Talk to Retivio
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              {
                icon: Globe2,
                title: "Built for global buyers",
                text: "Professional digital products available to businesses worldwide.",
              },
              {
                icon: ShieldCheck,
                title: "Clear product experience",
                text: "Understand what you receive before making a purchase.",
              },
              {
                icon: Sparkles,
                title: "Salon-first design",
                text: "Products created around real beauty business needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="products"
          className="bg-slate-50 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                Product collection
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Start with a stronger digital presence.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our product library is growing. Every Retivio product is
                designed to solve a practical salon business problem.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {products.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="border-b border-slate-200 bg-slate-950 p-7 text-white sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="rounded-full bg-purple-500/15 px-3 py-1.5 text-xs font-bold text-purple-300">
                        {product.status}
                      </span>

                      <span className="text-sm text-slate-400">
                        Retivio Product
                      </span>
                    </div>

                    <h3 className="mt-8 text-4xl font-extrabold tracking-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-lg font-medium text-purple-300">
                      {product.type}
                    </p>

                    <p className="mt-5 max-w-xl leading-7 text-slate-300">
                      {product.description}
                    </p>
                  </div>

                  <div className="p-7 sm:p-9">
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-extrabold text-slate-950">
                        {product.price}
                      </span>
                      <span className="pb-1 text-lg text-slate-400 line-through">
                        {product.oldPrice}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      One-time payment
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <Check
                            size={17}
                            className="mt-0.5 shrink-0 text-purple-700"
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to={product.detailsUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white transition hover:bg-purple-800"
                      >
                        View product
                        <ArrowRight size={18} />
                      </Link>

                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-800 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                      >
                        Live demo
                        <ExternalLink size={17} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex min-h-[360px] flex-col justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                  <Layers3 size={23} />
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-purple-700">
                  Product ecosystem
                </p>

                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                  More salon products are coming.
                </h3>

                <p className="mt-5 max-w-lg leading-7 text-slate-600">
                  Retivio is building a focused collection of digital
                  products for salon management, customer growth and
                  professional online presence.
                </p>

                <Link
                  to="/blog"
                  className="mt-7 inline-flex w-fit items-center gap-2 font-bold text-purple-700"
                >
                  Follow product updates
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Running a salon?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Retivio also helps manage customers, appointments,
              follow-ups, billing and business growth from one platform.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-7 py-4 font-semibold text-white transition hover:bg-purple-800"
            >
              Start Retivio free
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
