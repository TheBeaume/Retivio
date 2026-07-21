from pathlib import Path

content = r'''import { Link } from "react-router-dom";

export default function GrowthTools() {

  const tools = [
    {
      title: "WhatsApp Campaigns",
      description: "Promote offers and reconnect with existing customers."
    },
    {
      title: "Email Marketing",
      description: "Share updates, announcements and promotional campaigns."
    },
    {
      title: "SEO Content",
      description: "Improve your online visibility with search-friendly content."
    },
    {
      title: "Google Reviews",
      description: "Build trust by collecting and managing customer reviews."
    },
    {
      title: "Business Promotions",
      description: "Create marketing campaigns that help attract more customers."
    },
    {
      title: "Performance Insights",
      description: "Understand campaign performance through simple reports."
    }
  ];

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Marketing
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Reach more customers with smarter marketing.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Build stronger customer relationships through integrated marketing
            tools designed to help your business grow consistently.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {tools.map((tool) => (

            <div
              key={tool.title}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >

              <h3 className="text-xl font-semibold text-slate-950">
                {tool.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {tool.description}
              </p>

            </div>

          ))}

        </div>

        <div className="mt-12 text-center">

          <Link
            to="/signup"
            className="inline-flex rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800"
          >
            Explore Marketing Tools
          </Link>

        </div>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/GrowthTools.jsx").write_text(content)

print("GrowthTools updated successfully.")
