export default function ComparisonSection() {

  const rows = [
    {
      traditional: "Multiple software subscriptions",
      retivio: "One integrated business platform"
    },
    {
      traditional: "Manual customer records",
      retivio: "Centralised customer management"
    },
    {
      traditional: "Separate website provider",
      retivio: "Professional website solutions"
    },
    {
      traditional: "Disconnected marketing tools",
      retivio: "Integrated marketing workflows"
    },
    {
      traditional: "Limited business insights",
      retivio: "Reports and business analytics"
    }
  ];

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            One Platform
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            A simpler way to manage your business.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Replace multiple disconnected tools with one platform designed
            to help your business establish, manage and grow.
          </p>

        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white">

          <div className="grid grid-cols-2 border-b border-slate-200">

            <div className="border-r border-slate-200 px-8 py-6 text-center">
              <h3 className="text-2xl font-semibold text-slate-700">
                Traditional Way
              </h3>
            </div>

            <div className="px-8 py-6 text-center">
              <h3 className="text-2xl font-semibold text-purple-700">
                With Retivio
              </h3>
            </div>

          </div>

          {rows.map((row,index)=>(
            <div
              key={index}
              className="grid grid-cols-2 border-b border-slate-100 last:border-0"
            >

              <div className="border-r border-slate-100 px-8 py-6 text-slate-600">
                {row.traditional}
              </div>

              <div className="px-8 py-6 font-medium text-slate-900">
                {row.retivio}
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
