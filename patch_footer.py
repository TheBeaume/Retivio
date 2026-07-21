from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-5">

          <div className="lg:col-span-2">

            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Retivio
            </h2>

            <p className="mt-5 max-w-md leading-8 text-slate-600">
              Professional website solutions, salon CRM and marketing tools
              designed to help businesses establish, manage and grow from one
              integrated platform.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-slate-950">
              Solutions
            </h3>

            <div className="mt-5 space-y-3">

              <Link to="/website-builder" className="block text-slate-600 hover:text-purple-700">
                Website Builder
              </Link>

              <Link to="/templates" className="block text-slate-600 hover:text-purple-700">
                Custom Websites
              </Link>

              <Link to="/signup" className="block text-slate-600 hover:text-purple-700">
                Salon CRM
              </Link>

              <Link to="/signup" className="block text-slate-600 hover:text-purple-700">
                Marketing
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-slate-950">
              Company
            </h3>

            <div className="mt-5 space-y-3">

              <a href="#why-retivio" className="block text-slate-600 hover:text-purple-700">
                Why Retivio
              </a>

              <a href="#pricing" className="block text-slate-600 hover:text-purple-700">
                Pricing
              </a>

              <a href="#faq" className="block text-slate-600 hover:text-purple-700">
                FAQ
              </a>

              <Link to="/contact" className="block text-slate-600 hover:text-purple-700">
                Contact
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-slate-950">
              Legal
            </h3>

            <div className="mt-5 space-y-3">

              <Link to="/privacy-policy" className="block text-slate-600 hover:text-purple-700">
                Privacy Policy
              </Link>

              <Link to="/terms-and-conditions" className="block text-slate-600 hover:text-purple-700">
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 Retivio. All rights reserved.
          </p>

          <p>
            Build. Manage. Grow.
          </p>

        </div>

      </div>

    </footer>
  );
}
'''

Path("src/components/landing/Footer.jsx").write_text(content)

print("Footer.jsx updated successfully.")
