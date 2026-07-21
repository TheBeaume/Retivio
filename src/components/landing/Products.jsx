import { Link } from "react-router-dom";
import {
  Globe,
  Wand2,
  Palette,
  Smartphone,
  Users,
  Calendar,
  Receipt,
  BarChart3,
  MessageCircle,
  Megaphone,
  Mail,
  Search,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Products() {
  const solutions = [
    {
      title: "Website Solutions",
      description:
        "Professional websites designed to help your business stand out and convert more visitors.",
      cta: "Explore AURELIA",
      href: "https://aurelia-cyan.vercel.app/",
      features: [
        { icon: Wand2, label: "AI Builder" },
        { icon: Palette, label: "Custom Design" },
        { icon: Globe, label: "Development" },
        { icon: Smartphone, label: "SEO Ready" },
        { icon: Globe, label: "Business Blogs" },
        { icon: Globe, label: "Hosting" },
      ],
    },
    {
      title: "Salon CRM",
      description:
        "Everything you need to manage customers, appointments and daily operations.",
      cta: "Explore CRM",
      href: "/signup",
      features: [
        { icon: Users, label: "Customers" },
        { icon: Calendar, label: "Appointments" },
        { icon: Receipt, label: "Billing" },
        { icon: BarChart3, label: "Reports" },
        { icon: MessageCircle, label: "Follow-ups" },
        { icon: MessageCircle, label: "WhatsApp" },
      ],
    },
    {
      title: "Marketing",
      description:
        "Reach more customers and grow your business with built-in marketing tools.",
      cta: "Explore Marketing",
      href: "/signup",
      features: [
        { icon: MessageCircle, label: "WhatsApp" },
        { icon: Mail, label: "Email" },
        { icon: Search, label: "SEO" },
        { icon: Star, label: "Reviews" },
        { icon: Megaphone, label: "Promotions" },
        { icon: TrendingUp, label: "Growth" },
      ],
    },
  ];

  return (
    <section id="products" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Our Solutions
          </p>

          <h2 className="mt-5 text-4xl font-bold text-slate-950">
            Everything your business needs.
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Build your website, manage your business and grow with confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-slate-950">
                {solution.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                {solution.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">

                {solution.features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                  >
                    <Icon size={16} className="text-purple-700" />
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                  </div>
                ))}

              </div>

              {solution.href.startsWith("http") ? (
                <a
                  href={solution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-800"
                >
                  {solution.cta}
                  <ArrowRight size={16} />
                </a>
              ) : (
                <Link
                  to={solution.href}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-800"
                >
                  {solution.cta}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
