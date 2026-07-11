export default function WhyRetivio() {
  const items = [
    {
      title: "Salon CRM",
      desc: "Manage customers, appointments and daily operations from one dashboard.",
    },
    {
      title: "Premium Templates",
      desc: "Launch a professional salon website in minutes with AURELIA.",
    },
    {
      title: "Business Growth",
      desc: "WhatsApp, analytics, marketing and AI tools to help your salon grow.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-purple-700 font-semibold uppercase tracking-widest">
            One Platform
          </span>

          <h2 className="mt-4 text-5xl font-bold">
            Everything Your Salon Needs
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Retivio combines powerful salon management software with
            premium website templates, helping beauty businesses launch,
            manage and grow from one platform.
          </p>
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-3">

          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
