import {
  Building2,
  CalendarCheck2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Set up your salon",
    text: "Add your business details and organise the services that power your daily workflow.",
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Manage daily operations",
    text: "Keep customers, visits, appointments and billing closer together as your salon works.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Turn activity into growth",
    text: "Use follow-ups, reports and growth tools to spot opportunities and make clearer decisions.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            How Retivio works
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            From daily salon work to better business decisions.
          </h2>
        </div>

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, text }, index) => (
            <div key={number} className="relative">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-purple-700">
                    {number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Icon size={21} />
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-purple-700 shadow-sm lg:flex">
                  <ArrowRight size={15} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
