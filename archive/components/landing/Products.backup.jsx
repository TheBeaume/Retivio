import { Link } from "react-router-dom";

export default function Products() {
  const solutions = [
    {
      title: "Website Solutions",
      description:
        "Build your own professional website with our AI Website Builder or let our team design and develop a fully customised website for your business.",
      items: [
        "AI Website Builder",
        "Custom Website Design",
        "Professional Website Development",
        "SEO Ready Pages",
        "Business Blogs",
        "Domain & Hosting"
      ]
    },
    {
      title: "Salon CRM",
      description:
        "Manage your salon from a single platform with customer records, appointments, billing, reports and follow-up tools designed for daily operations.",
      items: [
        "Customer Management",
        "Appointments",
        "Billing",
        "Reports",
        "Follow-ups",
        "WhatsApp Booking"
      ]
    },
    {
      title: "Marketing",
      description:
        "Reach more customers through marketing tools that help you promote your business, improve visibility and build long-term customer relationships.",
      items: [
        "WhatsApp Campaigns",
        "Email Campaigns",
        "SEO Content",
        "Google Reviews",
        "Promotions",
        "Business Growth"
      ]
    }
  ];

  return (
    <section id="products" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-700">
            Our Solutions
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
            Everything your business needs in one platform.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Build your online presence, manage your business and grow with
            professional digital solutions designed for modern businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {solutions.map((solution) => (

            <div
              key={solution.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-purple-300 hover:shadow-lg"
            >

              <h3 className="text-2xl font-semibold text-slate-950">
                {solution.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {solution.description}
              </p>

              <ul className="mt-8 space-y-3">

                {solution.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-slate-100 pb-3 text-slate-700"
                  >
                    {item}
                  </li>
                ))}

              </ul>

              <Link
                to="/signup"
                className="mt-10 inline-flex font-semibold text-purple-700"
              >
                Learn More
              </Link>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
