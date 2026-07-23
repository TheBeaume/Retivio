import React, { useMemo, useState } from "react";

export default function SalonProfitCalculator() {
  const [form, setForm] = useState({
    revenue: "",
    rent: "",
    salary: "",
    electricity: "",
    products: "",
    marketing: "",
    other: "",
  });

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const num = (v) => Number(v || 0);

  const totalExpenses = useMemo(
    () =>
      num(form.rent) +
      num(form.salary) +
      num(form.electricity) +
      num(form.products) +
      num(form.marketing) +
      num(form.other),
    [form]
  );

  const revenue = num(form.revenue);
  const profit = revenue - totalExpenses;

  const margin =
    revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0";

  const fields = [
    ["Monthly Revenue","revenue"],
    ["Rent","rent"],
    ["Salary","salary"],
    ["Electricity","electricity"],
    ["Products","products"],
    ["Marketing","marketing"],
    ["Other Expenses","other"],
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-5xl font-black">
          Salon Profit Calculator
        </h1>

        <p className="mt-4 text-slate-400 max-w-2xl">
          Calculate your monthly salon profit in seconds.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <h2 className="text-xl font-bold mb-6">
              Enter Details
            </h2>

            <div className="space-y-4">

              {fields.map(([label,key])=>(
                <div key={key}>
                  <label className="mb-2 block text-sm text-slate-300">
                    {label}
                  </label>

                  <input
                    type="number"
                    value={form[key]}
                    onChange={(e)=>update(key,e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 outline-none focus:border-purple-500"
                  />
                </div>
              ))}

            </div>

          </div>

          <div className="space-y-5">

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
              <p className="text-slate-400">Revenue</p>
              <h2 className="mt-2 text-4xl font-black">
                ₹{revenue.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
              <p className="text-slate-400">Expenses</p>
              <h2 className="mt-2 text-4xl font-black">
                ₹{totalExpenses.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-3xl border border-purple-600 bg-gradient-to-br from-purple-700/20 to-transparent p-6">
              <p className="text-slate-300">Net Profit</p>
              <h2 className="mt-2 text-5xl font-black">
                ₹{profit.toLocaleString()}
              </h2>

              <p className="mt-4 text-purple-300">
                Profit Margin: {margin}%
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
