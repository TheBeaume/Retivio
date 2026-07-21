from pathlib import Path
import re

folder = Path("src/components/landing")

files = [
    "Hero.jsx",
    "Products.jsx",
    "WebsiteBuilderCTA.jsx",
    "DashboardPreview.jsx",
    "GrowthTools.jsx",
    "Pricing.jsx",
    "BetaCTA.jsx",
    "TemplatesPreview.jsx",
]

updated = 0

for name in files:
    path = folder / name

    if not path.exists():
        continue

    text = path.read_text()

    text = re.sub(r'font-bold', 'font-semibold', text)
    text = re.sub(r'py-3(?!\.)', 'py-3.5', text)

    path.write_text(text)

    updated += 1
    print(f"Updated: {name}")

print(f"\n{updated} files polished successfully.")
