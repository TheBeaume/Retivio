import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-purple-400">
              Retivio
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              AI-powered Salon CRM helping beauty businesses manage
              customers, appointments, WhatsApp and business growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Product
            </h3>

            <div className="space-y-3 text-slate-400">
              <Link to="/features" className="block hover:text-white">
                Features
              </Link>

              <Link to="/templates" className="block hover:text-white">
                Templates
              </Link>

              <Link to="/blog" className="block hover:text-white">
                Blog
              </Link>

              <Link to="/contact" className="block hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Resources
            </h3>

            <div className="space-y-3 text-slate-400">
              <Link to="/about" className="block hover:text-white">
                About
              </Link>

              <Link to="/privacy-policy" className="block hover:text-white">
                Privacy Policy
              </Link>

              <Link to="/terms" className="block hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Featured Template
            </h3>

            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">

              <p className="font-bold text-xl">
                AURELIA
              </p>

              <p className="mt-2 text-slate-400 text-sm">
                Luxury Salon Website Template
              </p>

              <Link
                to="/templates/aurelia"
                className="inline-block mt-5 rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700"
              >
                View Template
              </Link>

            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-slate-500">

          <p>
            © 2026 Retivio. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ by Pravi Technologies
          </p>

        </div>

      </div>
    </footer>
  );
}
