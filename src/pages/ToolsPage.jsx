import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const tools = [
  {
    name: "Salon Profit Calculator",
    description:
      "Calculate your monthly salon profit, expenses and profit margin in seconds.",
    href: "/tools/salon-profit-calculator",
    status: "Available",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
          Free Tools
        </span>

        <h1 className="mt-6 text-5xl font-black">
          Free Business Tools
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Practical calculators and AI tools to help businesses grow.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool)=>(
            <div
              key={tool.name}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6 transition hover:border-purple-500 hover:-translate-y-1"
            >
              <Calculator className="mb-4 text-purple-400" size={32}/>
              <h2 className="text-xl font-bold">{tool.name}</h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {tool.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-emerald-400 text-sm">
                  {tool.status}
                </span>

                <Link
                  to={tool.href}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
