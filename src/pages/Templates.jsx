import { Link } from "react-router-dom";

function Templates() {
  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-br from-purple-700 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">
            Premium Website Templates
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-purple-100">
            Professionally designed website templates built for modern
            businesses. Launch faster with beautiful, responsive and
            SEO-friendly templates.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              Salon Template
            </span>

            <h2 className="mt-6 text-3xl font-bold">
              AURELIA
            </h2>

            <p className="mt-4 text-gray-600">
              Premium luxury salon website template built with React,
              Vite and Tailwind CSS.
            </p>

            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✓ Fully Responsive</li>
              <li>✓ SEO Optimized</li>
              <li>✓ AI Generated Images</li>
              <li>✓ Easy Customization</li>
            </ul>

            <div className="mt-8 flex gap-4">

              <a
                href="https://YOUR-AURELIA-DEMO.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-purple-600 px-5 py-3 font-semibold text-purple-700"
              >
                Live Demo
              </a>

              <Link
                to="/templates/aurelia"
                className="rounded-full bg-purple-700 px-5 py-3 font-semibold text-white"
              >
                View Details
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Templates;
