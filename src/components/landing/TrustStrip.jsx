import {
  Scissors,
  Database,
  Workflow,
  TrendingUp,
} from "lucide-react";

const items = [
  {
    icon: Scissors,
    title: "Built for salons",
    text: "Designed around salon workflows",
  },
  {
    icon: Database,
    title: "One customer view",
    text: "Keep important activity connected",
  },
  {
    icon: Workflow,
    title: "Simpler operations",
    text: "Manage daily work from one place",
  },
  {
    icon: TrendingUp,
    title: "Growth built in",
    text: "Move beyond basic management",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className={`flex items-center gap-3 py-5 sm:px-5 ${
              index > 0 ? "border-t border-slate-200 sm:border-t-0" : ""
            }`}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm ring-1 ring-slate-200">
              <Icon size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
