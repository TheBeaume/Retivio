from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function Pricing() {

  const plans = [
    {
      title: "Website Builder",
      description: "Build and publish your own professional business website.",
      cta: "Explore Builder"
    },
    {
      title: "Custom Website",
      description: "Work with our team to design and develop a customised website.",
      cta: "Request Consultation"
    },
    {
      title: "Salon CRM",
      description: "Manage customers, appointments, billing and daily operations.",
      cta: "Start CRM"
    },
    {
      title: "Business Bundle",
      description: "Website, CRM and marketing tools together in one platform.",
      cta: "Contact Sales"
    }
  ];

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Pricing
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Flexible solutions for every business.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Choose the solution that best fits your business today and expand
            whenever you're ready.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {plans.map((plan) => (

            <div
              key={plan.title}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >

              <h3 className="text-2xl font-semibold text-slate-950">
                {plan.title}
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                {plan.description}
              </p>

              <Link
                to="/contact"
                className="mt-10 inline-flex rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:border-purple-400 hover:text-purple-700"
              >
                {plan.cta}
              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/Pricing.jsx").write_text(content)

print("Pricing.jsx updated successfully.")
