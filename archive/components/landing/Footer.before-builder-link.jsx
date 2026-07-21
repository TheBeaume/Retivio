import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features", anchor: true },
      { label: "How it works", href: "/#how-it-works", anchor: true },
      { label: "Products", href: "/#products", anchor: true },
      { label: "Start free", href: "/signup" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Salon websites", href: "/templates" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-tight text-white"
            >
              Retivio
            </Link>

            <p className="mt-5 leading-7 text-slate-400">
              Salon management and business growth products built for
              modern beauty businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold text-white">{group.title}</h3>

                <div className="mt-5 space-y-3">
                  {group.links.map((item) =>
                    item.anchor ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block text-sm text-slate-400 transition hover:text-white"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block text-sm text-slate-400 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Retivio. All rights reserved.</p>
          <p>Digital products built for salon businesses.</p>
        </div>
      </div>
    </footer>
  );
}
