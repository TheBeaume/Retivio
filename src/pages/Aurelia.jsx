import { Link } from "react-router-dom";

function Aurelia() {
  const features = [
    "Premium Luxury Design",
    "React + Vite",
    "Tailwind CSS",
    "Fully Responsive",
    "SEO Optimized",
    "AI Generated Images",
    "Easy Customization",
    "Commercial License",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium">
            Premium Website Template by Retivio
          </span>

          <h1 className="mt-6 text-6xl font-extrabold">
            AURELIA
          </h1>

          <p className="mt-5 text-2xl text-purple-100">
            Luxury Salon Website Template
          </p>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-purple-100">
            A premium React + Vite website template crafted for salons,
            beauty studios, spas and wellness brands. Beautiful,
            responsive, SEO-friendly and easy to customize.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <a
              href="https://aurelia-cyan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-4 font-bold text-purple-700 transition hover:scale-105"
            >
              Live Demo
            </a>

            <Link
              to="/contact"
              className="rounded-full border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-purple-700"
            >
              Contact Sales
            </Link>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            AURELIA includes everything you need to launch a premium
            salon website without starting from scratch.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-2xl">✓</div>

              <p className="mt-4 font-semibold">
                {feature}
              </p>
            </div>
          ))}

        </div>

      </section>
      {/* What's Included */}

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold">
              What's Included
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Everything you need to launch your salon website quickly
              and professionally.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-sm border">
              <div className="text-5xl">💻</div>

              <h3 className="mt-6 text-2xl font-bold">
                Complete Source Code
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Clean React + Vite project with reusable components and
                organized folder structure.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border">
              <div className="text-5xl">📘</div>

              <h3 className="mt-6 text-2xl font-bold">
                Full Documentation
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Installation guide, customization guide, license,
                changelog and product documentation included.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border">
              <div className="text-5xl">🚀</div>

              <h3 className="mt-6 text-2xl font-bold">
                Ready To Launch
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Responsive, SEO-friendly and production-ready for
                immediate deployment.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Perfect For */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold">
              Perfect For
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Designed for modern beauty businesses.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[
              "Luxury Salons",
              "Beauty Studios",
              "Hair Stylists",
              "Spa & Wellness Centers",
              "Bridal Makeup Artists",
              "Beauty Clinics",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="text-4xl">✨</div>

                <h3 className="mt-4 text-xl font-semibold">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Documentation */}

      <section className="bg-purple-50 py-24">
        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold">
              Documentation Included
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Every purchase includes complete documentation to help
              you customize and deploy your website with confidence.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              "README",
              "Installation Guide",
              "Customization Guide",
              "License & Changelog",
            ].map((doc) => (
              <div
                key={doc}
                className="rounded-2xl bg-white p-6 text-center shadow-sm border"
              >
                <div className="text-4xl">📄</div>

                <p className="mt-4 font-semibold">
                  {doc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
      {/* Why Choose AURELIA */}

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold">
              Why Choose AURELIA?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Built for salon owners and developers who want a premium,
              modern website without spending weeks on design.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Premium Design
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Every section is carefully designed to create a luxury
                experience that reflects high-end beauty brands.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Developer Friendly
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Clean React components, reusable structure and simple
                customization make development fast and enjoyable.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Mobile Optimized
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Designed to look beautiful on desktop, tablet and
                mobile devices.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Future Ready
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Designed to integrate with future Retivio products,
                including the upcoming Website Builder.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ */}

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-5xl px-6">

          <h2 className="text-center text-5xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-16 space-y-6">

            <div className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-xl font-bold">
                Is AURELIA beginner friendly?
              </h3>

              <p className="mt-3 text-gray-600">
                Yes. Complete documentation is included, making it easy
                to customize even if you're new to React.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-xl font-bold">
                Can I use it for client projects?
              </h3>

              <p className="mt-3 text-gray-600">
                Yes. Your commercial license allows you to build
                websites for clients according to the license terms.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-xl font-bold">
                Which technologies are used?
              </h3>

              <p className="mt-3 text-gray-600">
                React, Vite and Tailwind CSS.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-xl font-bold">
                Is support available?
              </h3>

              <p className="mt-3 text-gray-600">
                Documentation is included, and additional support options
                can be offered separately.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Retivio CRM */}

      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm">
            Complete Salon Business Solution
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Need More Than Just a Website?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-purple-100">
            Pair AURELIA with Retivio CRM to manage appointments,
            customers, WhatsApp communication, follow-ups, reports and
            business growth — all from one platform.
          </p>

          <Link
            to="/"
            className="mt-10 inline-block rounded-full bg-white px-8 py-4 font-bold text-purple-700 transition hover:scale-105"
          >
            Explore Retivio CRM
          </Link>

        </div>
      </section>
      {/* Final CTA */}

      <section className="py-24 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <span className="rounded-full bg-purple-600/30 px-5 py-2 text-sm font-medium">
            Launch Faster with Retivio
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Ready to Build Your Luxury Salon Website?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Start with AURELIA and create a stunning online presence for
            your salon. When you're ready to manage appointments,
            customers, WhatsApp and business growth, Retivio CRM is
            ready to help.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <a
              href="https://aurelia-cyan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white transition hover:bg-purple-700"
            >
              Live Demo
            </a>

            <Link
              to="/contact"
              className="rounded-full border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-slate-900"
            >
              Contact Sales
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Aurelia;
