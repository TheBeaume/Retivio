import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  ReceiptText,
  BellRing,
  TrendingUp,
  MonitorSmartphone,
  Sparkles,
  Layers3,
} from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            Retivio products
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Built for the business behind the beauty.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore digital products designed to help salons operate
            better, look more professional and grow faster.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="group relative overflow-hidden rounded-3xl bg-purple-700 p-7 text-white shadow-xl shadow-purple-700/15 sm:p-9 lg:col-span-7">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                Flagship product
              </div>

              <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl">
                Retivio Salon CRM
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-purple-100">
                Customers, appointments, follow-ups, billing, reports and
                growth tools connected in one salon workspace.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Users, label: "Customer CRM" },
                  { icon: ReceiptText, label: "Billing" },
                  { icon: BellRing, label: "Follow-ups" },
                  { icon: TrendingUp, label: "Growth" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/15 bg-white/10 p-3"
                  >
                    <Icon size={18} />
                    <p className="mt-2 text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-purple-700 transition hover:-translate-y-0.5"
              >
                Start free
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-9 lg:col-span-5">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-300">
                <MonitorSmartphone size={23} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                Premium salon website
              </p>

              <h3 className="mt-3 text-3xl font-extrabold tracking-wide">
                AURELIA
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                A luxury digital storefront designed to give modern salons
                a more premium online presence.
              </p>

              <Link
                to="/templates/aurelia"
                className="mt-auto inline-flex items-center gap-2 pt-8 font-bold text-white transition group-hover:gap-3"
              >
                Explore AURELIA
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-purple-50 p-7 sm:p-9 lg:col-span-12">
            <div className="grid items-center gap-7 lg:grid-cols-[auto_1fr_auto]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm ring-1 ring-purple-100">
                <Layers3 size={26} />
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-purple-700">
                  <Sparkles size={16} />
                  A growing salon product ecosystem
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  More tools are being built for salons.
                </h3>
                <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                  Retivio is creating a growing collection of digital
                  products for beauty businesses — built around real salon
                  operations, customer experience and growth.
                </p>
              </div>

              <Link
                to="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-5 py-3 font-bold text-purple-700 transition hover:border-purple-300 hover:shadow-md"
              >
                Explore products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
