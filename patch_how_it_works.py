from pathlib import Path

content = r'''export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Solution",
      description:
        "Select the solution that fits your business, whether you need a professional website, salon CRM or marketing tools."
    },
    {
      number: "02",
      title: "Set Up Your Business",
      description:
        "Create your website, organise your business information and configure your workspace in just a few steps."
    },
    {
      number: "03",
      title: "Manage Daily Operations",
      description:
        "Handle customers, appointments, billing, reports and everyday business activities from one platform."
    },
    {
      number: "04",
      title: "Grow Your Business",
      description:
        "Use marketing tools, customer engagement features and business insights to attract more customers and build long-term growth."
    }
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            How It Works
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            A simple workflow for modern businesses.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From creating your online presence to managing daily operations
            and growing your business, everything happens in one place.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >

              <p className="text-4xl font-bold text-purple-700">
                {step.number}
              </p>

              <h3 className="mt-6 text-2xl font-semibold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
'''

Path("src/components/landing/HowItWorks.jsx").write_text(content)

print("HowItWorks.jsx updated successfully.")
