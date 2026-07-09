import { Link } from "react-router-dom";

export default function TemplatesPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="text-purple-700 font-semibold uppercase tracking-widest">
          Premium Templates
        </span>

        <h2 className="mt-4 text-5xl font-bold">
          Launch Your Salon Website Faster
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600">
          Beautiful, responsive website templates built for salons,
          spas and beauty businesses. Pair them with Retivio CRM for a
          complete business solution.
        </p>

        <div className="mt-14 max-w-md mx-auto rounded-3xl border bg-white p-8 shadow-lg">

          <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            Featured Template
          </span>

          <h3 className="mt-6 text-3xl font-bold">
            AURELIA
          </h3>

          <p className="mt-4 text-gray-600">
            Luxury Salon Website Template built with React, Vite and
            Tailwind CSS.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Link
              to="/templates/aurelia"
              className="rounded-full bg-purple-700 px-6 py-3 text-white font-semibold"
            >
              View Template
            </Link>

            <a
              href="https://YOUR-AURELIA-DEMO.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-purple-700 px-6 py-3 font-semibold text-purple-700"
            >
              Live Demo
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
