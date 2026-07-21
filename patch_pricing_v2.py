from pathlib import Path

content = '''import { Link } from "react-router-dom";

export default function Pricing() {

  const plans = [
    {
      title: "Website Builder",
      price: "₹4,999",
      badge: "One-Time",
      description:
        "Build and publish your own professional business website with the Retivio Website Builder.",
      features: [
        "Professional Website",
        "Responsive Design",
        "SEO Ready Pages",
        "Blog Support",
        "Website Export",
        "Future Updates"
      ],
      cta: "Start Building",
      featured: false
    },
    {
      title: "Custom Website",
      price: "Starting ₹9,999",
      badge: "One-Time",
      description:
        "Custom designed and professionally developed website tailored to your business.",
      features: [
        "Premium Design",
        "Custom Development",
        "SEO Setup",
        "Business Pages",
        "Fast Delivery",
        "Consultation Included"
      ],
      cta: "Request Consultation",
      featured: false
    },
    {
      title: "Salon CRM",
      price: "₹999/month",
      badge: "Subscription",
      description:
        "Manage customers, appointments, billing and daily salon operations from one platform.",
      features: [
        "Customer Management",
        "Appointments",
        "Billing",
        "Reports",
        "Follow-ups",
        "Marketing"
      ],
      cta: "Start CRM",
      featured: false
    },
    {
      title: "Retivio Pro",
      price: "₹1,499/month",
      badge: "MOST POPULAR",
      description:
        "Everything you need to build, manage and grow your business.",
      features: [
        "Website Builder Included",
        "Salon CRM",
        "Marketing Tools",
        "Managed Hosting",
        "Priority Support",
        "Future Updates"
      ],
      cta: "Get Started",
      featured: true
    }
  ];

  return (
    <section id="pricing" className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Pricing
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
            Simple and transparent pricing.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Choose the solution that fits your business today and upgrade whenever you're ready.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {plans.map((plan) => (

            <div
              key={plan.title}
              className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.featured
                  ? "border-2 border-purple-600 bg-white"
                  : "border border-slate-200 bg-white hover:border-purple-300"
              }`}
            >

              <div className="flex items-center justify-between">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    plan.featured
                      ? "bg-purple-700 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {plan.badge}
                </span>

              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-950">
                {plan.title}
              </h3>

              <p className="mt-4 text-4xl font-bold text-slate-950">
                {plan.price}
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                {plan.description}
              </p>

              <div className="mt-8 space-y-3">

                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="text-sm text-slate-700"
                  >
                    • {feature}
                  </div>
                ))}

              </div>

              <Link
                to="/signup"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 font-semibold transition ${
                  plan.featured
                    ? "bg-purple-700 text-white hover:bg-purple-800"
                    : "border border-slate-300 text-slate-900 hover:border-purple-400 hover:text-purple-700"
                }`}
              >
                {plan.cta}
              </Link>

            </div>

          ))}

        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          No hidden charges. You own your website.
        </p>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/Pricing.jsx").write_text(content)

print("✅ Pricing upgraded successfully.")
