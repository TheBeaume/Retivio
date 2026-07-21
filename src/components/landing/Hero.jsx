import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  IndianRupee,
  BellRing,
  TrendingUp,
  Search,
  LayoutDashboard,
  ReceiptText,
  BarChart3,
MonitorSmartphone
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: MonitorSmartphone, label: "Websites" },
  { icon: Users, label: "Customers" },
  { icon: TrendingUp, label: "Marketing" },
  { icon: BarChart3, label: "Reports" },
  { icon: ReceiptText, label: "Settings" },
];

const stats = [
  {
    label: "Website Leads",
    value: "36",
    detail: "This week",
    icon: MonitorSmartphone,
  },
  {
    label: "Customers",
    value: "248",
    detail: "+18 this month",
    icon: Users,
  },
  {
    label: "Revenue",
    value: "₹48.5K",
    detail: "+12.4% growth",
    icon: IndianRupee,
  },
];

export default function Hero() {
  return (
    <section
      id="product"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-purple-100 blur-3xl" />
      <div className="pointer-events-none absolute -left-48 top-64 h-80 w-80 rounded-full bg-violet-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-2 text-sm font-semibold text-purple-700">
              <span className="h-2 w-2 rounded-full bg-purple-600" />
              Business Growth Platform
            </div>

            <h1
              id="hero-title"
              className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Build your website.
              <span className="text-purple-700"> Manage your business. </span>
              Grow with confidence.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Retivio combines professional website solutions, salon CRM and
              marketing tools into one platform, helping businesses build
              their online presence, manage daily operations and grow with
              confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800"
              >
                Start free
                <ArrowRight size={18} />
              </Link>

              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
              >
                Explore Solutions
              </a>
            </div>

<div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
  {[
    "Website Solutions",
    "Salon CRM",
    "Marketing",
  ].map((item, index) => (
    <React.Fragment key={item}>
      <span className="font-medium text-slate-600">
        {item}
      </span>

      {index < 2 && (
        <span className="text-slate-300">•</span>
      )}
    </React.Fragment>
  ))}
</div>

          </div>

          <div className="relative mx-auto w-full max-w-3xl lg:mx-0">
            <div className="absolute -inset-5 rounded-[2rem] bg-purple-100/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
              <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>

                <div className="hidden rounded-md border border-slate-200 bg-white px-8 py-1 text-[10px] text-slate-400 sm:block">
                  app.retivio.in
                </div>

                <div className="h-6 w-6 rounded-full bg-purple-100" />
              </div>

              <div className="flex min-h-[430px]">
                <aside className="hidden w-40 flex-shrink-0 border-r border-slate-200 bg-slate-950 p-3 sm:block">
                  <div className="px-2 py-3.5 text-lg font-semibold text-white">
                    Retivio
                  </div>

                  <div className="mt-3 space-y-1">
                    {sidebarItems.map(({ icon: Icon, label, active }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${
                          active
                            ? "bg-purple-600 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        <Icon size={14} />
                        {label}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="min-w-0 flex-1 bg-slate-50 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>

<p className="text-[10px] font-medium text-purple-700">
  BUSINESS OVERVIEW
</p>

<h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-xl">
  Welcome back
</h2>

<p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
  Your websites, customers, marketing and revenue in one place.
</p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
                      <Search size={14} />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {stats.map(({ label, value, detail, icon: Icon }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-slate-500">{label}</p>
                          <Icon size={13} className="text-purple-700" />
                        </div>
                        <p className="mt-2 text-lg font-semibold text-slate-950">
                          {value}
                        </p>
                        <p className="mt-1 text-[9px] font-medium text-emerald-600">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-[1.45fr_0.8fr]">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800">
Business Performance
                        </p>
                        <TrendingUp size={14} className="text-purple-700" />
                      </div>

                      <div className="mt-6 flex h-28 items-end gap-2">
                        {[38, 55, 46, 70, 61, 88, 76].map((height, index) => (
                          <div
                            key={index}
                            className="flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-md bg-purple-600 transition-all duration-500 hover:bg-purple-700"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 flex justify-between text-[8px] text-slate-400">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800">
Marketing Activity
                        </p>
                        <BellRing size={14} className="text-purple-700" />
                      </div>

                      <p className="mt-5 text-3xl font-semibold text-slate-950">8</p>
                      <p className="mt-1 text-[10px] text-slate-500">
campaigns currently active
                      </p>

                      <div className="mt-5 space-y-2">
                        {[72, 54, 84].map((width, index) => (
                          <div
                            key={index}
                            className="h-2 rounded-full bg-slate-100"
                          >
                            <div
                              className="h-2 rounded-full bg-purple-200"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <BellRing size={17} />
              </div>
              <div>
<p className="text-xs font-semibold text-slate-900">
  Business Activity
</p>
<p className="mt-0.5 text-[10px] text-slate-500">
  Website, CRM and marketing working together.
</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
