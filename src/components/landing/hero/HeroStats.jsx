import {
  Users,
  IndianRupee,
  MonitorSmartphone,
} from "lucide-react";

const stats = [
  {
    title: "Website Leads",
    value: "36",
    change: "+8 Today",
    icon: MonitorSmartphone,
  },
  {
    title: "Customers",
    value: "248",
    change: "+18 This Month",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "₹48.5K",
    change: "+12.4%",
    icon: IndianRupee,
  },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-[#111827]/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(124,58,237,.18)]"
          >
            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-400">
                {item.title}
              </span>

              <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
                <Icon size={18} />
              </div>

            </div>

            <h3 className="mt-5 text-3xl font-black text-white">
              {item.value}
            </h3>

            <p className="mt-2 text-sm font-medium text-emerald-400">
              {item.change}
            </p>

          </div>
        );
      })}
    </div>
  );
}
