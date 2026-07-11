import {
  UserRoundCheck,
  BellRing,
  Workflow,
  ChartSpline,
} from "lucide-react";

const benefits = [
  {
    icon: UserRoundCheck,
    title: "Know your customers",
    text: "Keep useful customer context closer to every visit.",
  },
  {
    icon: BellRing,
    title: "Stay on top of follow-ups",
    text: "Make customer retention part of the daily workflow.",
  },
  {
    icon: Workflow,
    title: "Simplify salon operations",
    text: "Bring important work into one connected platform.",
  },
  {
    icon: ChartSpline,
    title: "Understand performance",
    text: "See business activity with more clarity and context.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            What changes with Retivio
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Less scattered work. More clarity around your salon.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-7">
              <Icon size={25} className="text-purple-700" />
              <h3 className="mt-8 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
