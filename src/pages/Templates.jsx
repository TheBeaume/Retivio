import { Link } from "react-router-dom";

function Templates() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium">
            Premium Templates by Retivio
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            Website Templates
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-purple-100">
            Launch beautiful business websites in days, not weeks.
            Professionally designed templates built for modern businesses.
          </p>

        </div>
      </section>

      {/* Templates */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              Featured Template
            </span>

            <h2 className="mt-6 text-3xl font-bold">
              AURELIA
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Premium luxury salon website template built with React,
              Vite and Tailwind CSS.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
              <li>✓ Fully Responsive</li>
              <li>✓ SEO Optimized</li>
              <li>✓ AI Generated Images</li>
              <li>✓ Easy Customization</li>
              <li>✓ Commercial Ready</li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="https://aurelia-cyan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-purple-700 px-5 py-3 font-semibold text-purple-700 hover:bg-purple-700 hover:text-white transition"
              >
                Live Demo
              </a>

              <Link
                to="/templates/aurelia"
                className="rounded-full bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800 transition"
              >
                View Details
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">

          <h2 className="text-4xl font-bold">
            Need More Than Just a Website?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Combine AURELIA with Retivio CRM to manage customers,
            appointments, WhatsApp, reports and grow your salon from
            one platform.
          </p>

          <Link
            to="/"
            className="mt-10 inline-block rounded-full bg-purple-700 px-8 py-4 font-semibold text-white hover:bg-purple-800 transition"
          >
            Explore Retivio CRM
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Templates;
