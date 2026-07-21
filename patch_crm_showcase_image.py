from pathlib import Path

path = Path("src/components/landing/DashboardPreview.jsx")
text = path.read_text()

# Add import
if 'retivio-dashboard-showcase.png' not in text:

    lines = text.splitlines()

    last_import = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import = i

    lines.insert(
        last_import + 1,
        'import dashboardShowcase from "../../assets/images/retivio-dashboard-showcase.png";'
    )

    text = "\n".join(lines)

old = '''
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm font-semibold text-slate-900">
                  Salon CRM Dashboard
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Customers</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">248</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Appointments</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">18</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Revenue</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">₹48.5K</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Pending Follow-ups</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
                </div>

              </div>

            </div>
'''

new = '''
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <img
                src={dashboardShowcase}
                alt="Retivio Salon CRM Dashboard"
                className="w-full h-auto object-cover"
                loading="lazy"
              />

            </div>
'''

text = text.replace(old, new)

path.write_text(text)

print("CRM showcase updated successfully.")
