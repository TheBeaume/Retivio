import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  FileText,
  Gauge,
  Globe2,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";

const GUMROAD_URL = "https://retivio.gumroad.com/l/obsmgs";

const included = [
  "Complete React + Vite source code",
  "Tailwind CSS styling",
  "Responsive mobile-first layout",
  "Premium salon-focused design",
  "SEO-ready page structure",
  "Premium image assets included",
  "Setup and customization documentation",
  "Commercial use license",
];

const benefits = [
  {
    icon: Palette,
    title: "Luxury visual direction",
    description:
      "A premium design system created to help beauty businesses present a stronger and more credible online brand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive by design",
    description:
      "Built to deliver a polished browsing experience across mobile, tablet and desktop screens.",
  },
  {
    icon: Zap,
    title: "Launch faster",
    description:
      "Skip the blank-page design process and start from a complete salon website foundation.",
  },
  {
    icon: Code2,
    title: "Developer friendly",
    description:
      "Organized React components and Tailwind styling make the template easier to understand and customize.",
  },
];

const audiences = [
  "Luxury salons",
  "Beauty studios",
  "Hair professionals",
  "Spa and wellness businesses",
  "Bridal makeup artists",
  "Beauty clinics",
];

const faqs = [
  {
    question: "What do I receive after purchase?",
    answer:
      "You receive the AURELIA template package with source code, included assets, documentation and the applicable commercial use license.",
  },
  {
    question: "Is AURELIA mobile responsive?",
    answer:
      "Yes. AURELIA is designed for mobile, tablet and desktop experiences.",
  },
  {
    question: "Which technologies does the template use?",
    answer:
      "AURELIA is built with React, Vite and Tailwind CSS.",
  },
  {
    question: "Can the branding and content be changed?",
    answer:
      "Yes. The salon name, copy, services, imagery and visual styling can be customized in the source project.",
  },
  {
    question: "Do you offer customization services?",
    answer:
      "Yes. If you want Retivio to customize or prepare the website for your business, submit a project brief and we can review your requirements separately.",
  },
];

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AURELIA – Luxury Salon Website Template",
  description:
    "Premium React, Vite and Tailwind CSS website template for salons, beauty studios, spas and wellness brands.",
  brand: {
    "@type": "Brand",
    name: "Retivio",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "49",
    availability: "https://schema.org/InStock",
    url: GUMROAD_URL,
  },
};

export default function Aurelia() {
  return (
    <>
      <SEO
        title="AURELIA Luxury Salon Website Template | Retivio"
        description="Buy AURELIA, a premium React, Vite and Tailwind CSS salon website template built for salons, beauty studios, spas and wellness brands."
        canonical="/templates/aurelia"
        jsonLd={productSchema}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/templates" },
          { name: "AURELIA", url: "/templates/aurelia" },
        ]}
      />

      <Navbar />

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-purple-700 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-900 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200">
                <Sparkles size={16} />
                Premium salon website template
              </div>

              <h1 className="mt-7 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                AURELIA
              </h1>

              <p className="mt-4 text-xl font-semibold text-purple-300 sm:text-2xl">
                Luxury Salon Website Template
              </p>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Give your salon a premium digital presence with a
                polished website foundation designed specifically for
                beauty, salon and wellness businesses.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                {[
                  "React + Vite",
                  "Tailwind CSS",
                  "Responsive",
                  "Commercial use",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check size={16} className="text-purple-400" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-4 font-bold text-white transition hover:bg-purple-500"
                >
                  Buy AURELIA — $49
                  <ArrowRight size={18} />
                </a>

                <a
                  href="https://aurelia-cyan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  View live demo
                  <ExternalLink size={17} />
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                One-time purchase. Digital product.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="rounded-2xl bg-white p-6 text-slate-950 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700">
                      Launch offer
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold">
                      AURELIA Template
                    </h2>
                  </div>

                  <LayoutTemplate className="text-purple-700" size={30} />
                </div>

                <div className="mt-7 flex items-end gap-3">
                  <span className="text-5xl font-extrabold">$49</span>
                  <span className="pb-1.5 text-lg text-slate-400 line-through">
                    $79
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  One-time payment
                </p>

                <div className="mt-7 space-y-3">
                  {included.slice(0, 6).map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-purple-700"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-4 font-bold text-white transition hover:bg-purple-800"
                >
                  Get AURELIA
                  <ArrowRight size={18} />
                </a>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck size={15} />
                  Secure purchase and digital delivery via Gumroad
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              { icon: Globe2, text: "Available worldwide" },
              { icon: Gauge, text: "Performance focused" },
              { icon: MonitorSmartphone, text: "Mobile responsive" },
              { icon: ShieldCheck, text: "Commercial use license" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <Icon size={19} className="shrink-0 text-purple-700" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                Why AURELIA
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Your salon deserves more than a generic website.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                AURELIA gives beauty businesses a purpose-built digital
                foundation with premium design and a clear customer
                experience.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                What's included
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Everything you need to start customizing.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Purchase once and receive the complete AURELIA template
                package.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {included.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-purple-700"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
              <FileText size={30} className="text-purple-400" />

              <h3 className="mt-6 text-3xl font-extrabold">
                Documentation included.
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                The product package includes guidance to help you
                understand, customize and work with the template.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Project README",
                  "Installation guidance",
                  "Customization guidance",
                  "License information",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <Check size={17} className="text-purple-400" />
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Store size={30} className="mx-auto text-purple-700" />

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Designed for beauty businesses.
              </h2>

              <p className="mt-5 text-lg text-slate-600">
                AURELIA is a focused salon template, not a generic
                multi-industry website kit.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {audiences.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center font-bold text-slate-800 shadow-sm sm:p-6"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                Simple pricing
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                One template. One clear price.
              </h2>

              <p className="mt-5 text-lg text-slate-600">
                No confusing package comparison for the digital product.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-xl rounded-3xl border-2 border-purple-200 bg-white p-7 shadow-xl sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-purple-700">
                    AURELIA
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">
                    Complete Template
                  </h3>
                </div>

                <Sparkles size={28} className="text-purple-700" />
              </div>

              <div className="mt-8 flex items-end gap-3">
                <span className="text-6xl font-extrabold">$49</span>
                <span className="pb-2 text-xl text-slate-400 line-through">
                  $79
                </span>
              </div>

              <p className="mt-3 text-slate-600">
                One-time payment for the digital template package.
              </p>

              <div className="mt-8 space-y-3">
                {included.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-purple-700"
                    />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-4 font-bold text-white transition hover:bg-purple-800"
              >
                Buy AURELIA — $49
                <ArrowRight size={18} />
              </a>

              <p className="mt-4 text-center text-xs text-slate-500">
                Purchase and digital product delivery are handled via Gumroad.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <h3 className="font-bold text-slate-950">
                Need the website customized for your salon?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Custom setup and business-specific changes are separate
                services. Tell us what you need and we'll review your project.
              </p>

              <Link
                to="/project-brief"
                className="mt-5 inline-flex items-center gap-2 font-bold text-purple-700"
              >
                Submit project brief
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                FAQ
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Questions before you buy?
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950">
                    {faq.question}
                    <ChevronDown
                      size={19}
                      className="shrink-0 text-slate-500 transition group-open:rotate-180"
                    />
                  </summary>

                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-purple-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Build a stronger salon presence with AURELIA.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-purple-100">
              Start with a premium salon website foundation and make it
              your own.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-purple-700 transition hover:bg-purple-50"
              >
                Get AURELIA — $49
                <ArrowRight size={18} />
              </a>

              <a
                href="https://aurelia-cyan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                View demo
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
