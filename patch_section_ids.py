from pathlib import Path

updates = {
    "src/components/landing/Products.jsx": ('<section', '<section id="products"', 'id="products"'),
    "src/components/landing/WhyRetivio.jsx": ('<section', '<section id="why-retivio"', 'id="why-retivio"'),
    "src/components/landing/HowItWorks.jsx": ('<section', '<section id="how-it-works"', 'id="how-it-works"'),
    "src/components/landing/WebsiteBuilderCTA.jsx": ('<section', '<section id="website-builder"', 'id="website-builder"'),
    "src/components/landing/DashboardPreview.jsx": ('<section', '<section id="salon-crm"', 'id="salon-crm"'),
    "src/components/landing/GrowthTools.jsx": ('<section', '<section id="marketing"', 'id="marketing"'),
    "src/components/landing/Industries.jsx": ('<section', '<section id="industries"', 'id="industries"'),
    "src/components/landing/Pricing.jsx": ('<section', '<section id="pricing"', 'id="pricing"'),
    "src/components/landing/FAQ.jsx": ('<section', '<section id="faq"', 'id="faq"'),
}

for file_path, (search, replace, marker) in updates.items():
    path = Path(file_path)
    if not path.exists():
        continue

    text = path.read_text()

    if marker not in text:
        text = text.replace(search, replace, 1)
        path.write_text(text)
        print(f"Updated: {file_path}")
    else:
        print(f"Skipped: {file_path}")

print("\nSection IDs updated successfully.")
