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

{/* Pricing */}

<section className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
        🚀 Launch Offer
      </span>

      <h2 className="mt-6 text-5xl font-bold">
        Choose Your Plan
      </h2>

      <p className="mt-6 text-lg text-gray-600">
        Start with the template or let us handle everything for you.
      </p>
    </div>

    <div className="mt-16 grid gap-8 lg:grid-cols-3">

      {/* Template */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h3 className="text-2xl font-bold">
          Template Only
        </h3>

        <p className="mt-6 text-5xl font-extrabold text-purple-700">
          ₹2,999
        </p>

        <ul className="mt-8 space-y-3 text-gray-700">
          <li>✅ React + Vite Source Code</li>
          <li>✅ Tailwind CSS</li>
          <li>✅ Responsive Design</li>
          <li>✅ Documentation</li>
          <li>✅ Commercial License</li>
        </ul>

        <a
          href="https://wa.me/91YOURNUMBER?text=Hi%2C%20I%20want%20to%20buy%20AURELIA%20Template."
          className="mt-10 block rounded-full bg-purple-700 py-4 text-center font-bold text-white"
        >
          Buy Template
        </a>

      </div>

      {/* Recommended */}

      <div className="rounded-3xl border-2 border-purple-700 bg-purple-50 p-8 shadow-xl">

        <span className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white">
          Recommended
        </span>

        <h3 className="mt-6 text-2xl font-bold">
          Template + Setup
        </h3>

        <p className="mt-6 text-5xl font-extrabold text-purple-700">
          ₹4,999
        </p>

        <ul className="mt-8 space-y-3 text-gray-700">
          <li>✅ Everything in Template</li>
          <li>✅ Installation</li>
          <li>✅ Logo & Branding</li>
          <li>✅ Basic Customization</li>
          <li>✅ Launch Ready</li>
        </ul>

        <Link
          to="/contact"
          className="mt-10 block rounded-full bg-purple-700 py-4 text-center font-bold text-white"
        >
          Contact Sales
        </Link>

      </div>

      {/* Complete */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h3 className="text-2xl font-bold">
          Business Launch
        </h3>

        <p className="mt-6 text-5xl font-extrabold text-purple-700">
          ₹9,999
        </p>

        <ul className="mt-8 space-y-3 text-gray-700">
          <li>✅ Website Setup</li>
          <li>✅ Retivio CRM Setup</li>
          <li>✅ Domain Connection</li>
          <li>✅ Basic Training</li>
          <li>✅ Priority Support</li>
        </ul>

        <Link
          to="/contact"
          className="mt-10 block rounded-full border-2 border-purple-700 py-4 text-center font-bold text-purple-700"
        >
          Book Consultation
        </Link>

      </div>

    </div>

  </div>
</section>
<section className="bg-white py-24">
  <div className="mx-auto max-w-5xl px-6 text-center">

    <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
      🚀 Limited Launch Offer
    </span>

    <h2 className="mt-6 text-5xl font-bold">
      Own AURELIA Today
    </h2>

    <p className="mt-6 text-lg text-gray-600">
      Premium salon website template built for businesses that want a
      luxury online presence.
    </p>

    <div className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-10 shadow-lg">

      <p className="text-gray-500 line-through text-2xl">
        ₹4,999
      </p>

      <h3 className="mt-2 text-6xl font-extrabold text-purple-700">
        ₹2,999
      </h3>

      <p className="mt-4 text-lg text-gray-700">
        One-time payment • Lifetime access
      </p>

      <ul className="mt-10 space-y-3 text-left max-w-md mx-auto text-gray-700">
        <li>✅ Complete React + Vite Source Code</li>
        <li>✅ Tailwind CSS</li>
        <li>✅ AI Generated Premium Images</li>
        <li>✅ SEO Optimized</li>
        <li>✅ Fully Responsive</li>
        <li>✅ Documentation Included</li>
        <li>✅ Commercial Use License</li>
      </ul>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <a
          href="https://wa.me/918899267521?text=Hi%2C%20I'm%20interested%20in%20buying%20the%20AURELIA%20website%20template."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700 transition"
        >
          Buy on WhatsApp
        </a>

        <a
          href="https://aurelia-cyan.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-purple-700 px-8 py-4 font-bold text-purple-700"
        >
          Live Demo
        </a>

      </div>

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

{/* Why Buy AURELIA */}

<section className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-bold">
        Why Buy AURELIA?
      </h2>

      <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
        Save weeks of design and development time with a premium,
        production-ready salon website.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-2">

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold">
          ⚡ Launch Faster
        </h3>

        <p className="mt-4 text-gray-600 leading-7">
          Get your salon website online in hours instead of spending
          weeks designing from scratch.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold">
          🎨 Premium Design
        </h3>

        <p className="mt-4 text-gray-600 leading-7">
          Luxury-inspired layout that builds trust and attracts
          high-value clients.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold">
          📱 Fully Responsive
        </h3>

        <p className="mt-4 text-gray-600 leading-7">
          Looks beautiful on mobile, tablet and desktop devices.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold">
          🚀 Ready for Business
        </h3>

        <p className="mt-4 text-gray-600 leading-7">
          SEO-friendly, easy to customize and ready for deployment.
        </p>
      </div>

    </div>

  </div>
</section>

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

      {/* Support & License */}

      <section className="bg-gray-100 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full bg-purple-100 px-5 py-2 text-sm font-semibold text-purple-700">
              Purchase Benefits
            </span>

            <h2 className="mt-6 text-5xl font-bold">
              Buy With Confidence
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Every purchase includes everything you need to launch your
              salon website quickly and confidently.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="text-5xl">📄</div>

              <h3 className="mt-6 text-2xl font-bold">
                Commercial License
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Use AURELIA for your own salon or client projects in
                accordance with the included license.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="text-5xl">📘</div>

              <h3 className="mt-6 text-2xl font-bold">
                Complete Documentation
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Step-by-step installation and customization guide to help
                you get started quickly.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="text-5xl">🚀</div>

              <h3 className="mt-6 text-2xl font-bold">
                Lifetime Access
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                One-time purchase with lifetime access to the template
                version you purchase.
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
