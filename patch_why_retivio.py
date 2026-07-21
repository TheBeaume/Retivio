from pathlib import Path

content = r'''export default function WhyRetivio() {
  const items = [
    {
      title: "Professional Websites",
      description:
        "Create a professional online presence using our AI Website Builder or work with our team for a fully customised business website."
    },
    {
      title: "Business Management",
      description:
        "Manage customers, appointments, billing, reports and day-to-day operations from one organised workspace."
    },
    {
      title: "Marketing",
      description:
        "Promote your business through WhatsApp campaigns, SEO content, reviews and marketing tools designed for long-term growth."
    },
    {
      title: "Built to Grow",
      description:
        "Whether you're an individual business or managing multiple locations, Retivio scales with your business as you grow."
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Why Retivio
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Everything your business needs to grow.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Build your online presence, manage daily operations and
            grow your business from one integrated platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {items.map((item) => (

            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-10"
            >

              <h3 className="text-2xl font-semibold text-slate-950">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
'''

Path("src/components/landing/WhyRetivio.jsx").write_text(content)

print("WhyRetivio.jsx updated successfully.")
