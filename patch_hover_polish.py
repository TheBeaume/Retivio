from pathlib import Path

folder = Path("src/components/landing")

files = [
    "Products.jsx",
    "WhyRetivio.jsx",
    "WebsiteBuilderCTA.jsx",
    "DashboardPreview.jsx",
    "GrowthTools.jsx",
    "Industries.jsx",
    "Pricing.jsx",
    "TemplatesPreview.jsx",
]

old = 'className="rounded-3xl border border-slate-200 bg-white p-8"'

new = '''className="rounded-3xl border border-slate-200 bg-white p-8
transition-all duration-300
hover:-translate-y-1
hover:border-purple-300
hover:shadow-xl"'''

count = 0

for name in files:
    path = folder / name

    if not path.exists():
        continue

    text = path.read_text()

    if old in text:
        text = text.replace(old, new)
        path.write_text(text)
        print(f"Updated: {name}")
        count += 1

print(f"\nUpdated {count} components.")
