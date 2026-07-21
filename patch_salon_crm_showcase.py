from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function DashboardPreview() {
  const features = [
    "Customer Management",
    "Appointments",
    "Billing & Invoices",
    "Reports",
    "Follow-ups",
    "WhatsApp Booking"
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div className="order-2 lg:order-1">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm font-semibold text-slate-900">
                  Salon CRM Dashboard
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Customers</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">248</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Appointments</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">18</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Revenue</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">₹48.5K</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Pending Follow-ups</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
                </div>

              </div>

            </div>

          </div>

          <div className="order-1 lg:order-2">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
              Salon CRM
            </p>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
              Manage your salon from one organised workspace.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Keep customer information, appointments, billing, reports and
              daily operations connected through a single platform designed
              for modern salon businesses.
            </p>

            <div className="mt-10 grid gap-3">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-slate-200 px-5 py-4 text-slate-700"
                >
                  {feature}
                </div>
              ))}

            </div>

            <Link
              to="/signup"
              className="mt-10 inline-flex rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800"
            >
              Explore Salon CRM
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
'''

Path("src/components/landing/DashboardPreview.jsx").write_text(content)

print("DashboardPreview updated successfully.")
