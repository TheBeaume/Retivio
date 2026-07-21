export default function Industries() {

  const industries = [
    "Salons",
    "Beauty Studios",
    "Clinics",
    "Spas",
    "Restaurants",
    "Cafés",
    "Fashion Brands",
    "Jewellery Stores",
    "Gyms & Fitness",
    "Consultants",
    "Real Estate",
    "Local Businesses"
  ];

  return (
    <section id="industries" className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Industries
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Built for businesses across multiple industries.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Retivio provides flexible solutions that adapt to different business
            types while keeping the experience simple and professional.
          </p>

        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center font-medium text-slate-700 transition hover:border-purple-300 hover:shadow-sm"
            >
              {industry}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
