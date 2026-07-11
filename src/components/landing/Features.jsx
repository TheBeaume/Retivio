import {
  Users,
  CalendarDays,
  BellRing,
  ReceiptText,
  BarChart3,
  Search,
  Megaphone,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Customer Management",
    desc: "Keep customer profiles, visit activity and spending context organised in one place.",
  },
  {
    icon: CalendarDays,
    title: "Appointments",
    desc: "Organise upcoming bookings and stay clear on the salon's daily schedule.",
  },
  {
    icon: BellRing,
    title: "Follow-ups",
    desc: "See customers who need attention and create a more consistent retention workflow.",
  },
  {
    icon: ReceiptText,
    title: "Billing & Invoices",
    desc: "Create bills, manage service transactions and keep customer activity connected.",
  },
  {
    icon: BarChart3,
    title: "Reports & Insights",
    desc: "Understand revenue, customer activity and business performance with clearer reporting.",
  },
  {
    icon: Search,
    title: "Customer Finder",
    desc: "Use built-in growth tools to discover potential business opportunities and prospects.",
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    desc: "Plan targeted customer outreach and bring marketing activity closer to your CRM.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Booking",
    desc: "Support WhatsApp-led booking workflows from a platform designed around salon operations.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
              One connected platform
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Everything your salon needs to stay organised and move forward.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-slate-400 lg:justify-self-end">
            From the first customer visit to billing, follow-ups and
            growth, Retivio keeps the work that matters closer together.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  <Icon size={21} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-600 transition group-hover:text-purple-300"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
