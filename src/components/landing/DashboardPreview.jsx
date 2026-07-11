import {
  Users,
  CalendarDays,
  BellRing,
  ReceiptText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const workflow = [
  {
    icon: Users,
    title: "Know the customer",
    text: "Profiles and activity stay connected.",
  },
  {
    icon: CalendarDays,
    title: "Manage the visit",
    text: "Appointments and salon activity stay visible.",
  },
  {
    icon: ReceiptText,
    title: "Complete the transaction",
    text: "Billing stays closer to the customer record.",
  },
  {
    icon: BellRing,
    title: "Create the next opportunity",
    text: "Follow-up signals help you reconnect.",
  },
];

export default function DashboardPreview() {
  return (
    <section className="overflow-hidden bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
              Connected salon operations
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Customer activity should tell one complete story.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Retivio is designed to connect the daily moments that matter
              — from customer records and appointments to billing and the
              next follow-up opportunity.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Less scattered customer information",
                "Clearer daily salon workflows",
                "Better visibility into customer activity",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-purple-700"
                  />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/signup"
              className="mt-9 inline-flex items-center gap-2 font-bold text-purple-700 transition hover:gap-3"
            >
              Start organising your salon
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-purple-100/70 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Customer journey
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    One connected workflow
                  </h3>
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  Active
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {workflow.map(({ icon: Icon, title, text }, index) => (
                  <div
                    key={title}
                    className="group relative flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-purple-200 hover:bg-purple-50/50"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-600">
                          0{index + 1}
                        </span>
                        <h4 className="font-bold text-slate-900">{title}</h4>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {text}
                      </p>
                    </div>

                    {index < workflow.length - 1 && (
                      <div className="absolute -bottom-4 left-[2.15rem] z-10 h-4 w-px bg-purple-200" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-3">
                  <BarChart3 size={21} className="text-purple-400" />
                  <div>
                    <p className="font-semibold">Turn activity into insight</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Understand the business behind your daily salon work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
