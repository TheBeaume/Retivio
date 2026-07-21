from pathlib import Path

files = [
    "Products.jsx",
    "HowItWorks.jsx",
    "Industries.jsx",
    "Pricing.jsx",
    "FAQ.jsx",
    "TemplatesPreview.jsx",
]

folder = Path("src/components/landing")

for name in files:
    path = folder / name

    if not path.exists():
        print(f"Skipped: {name}")
        continue

    text = path.read_text()

    if 'import SectionHeader from "./SectionHeader";' not in text:
        imports = text.split("\n")
        last_import = 0

        for i, line in enumerate(imports):
            if line.startswith("import "):
                last_import = i

        imports.insert(last_import + 1, 'import SectionHeader from "./SectionHeader";')
        text = "\n".join(imports)

    path.write_text(text)

    print(f"Updated import: {name}")

print("\nSectionHeader imports added successfully.")
