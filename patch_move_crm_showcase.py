from pathlib import Path

path = Path("src/pages/LandingPage.jsx")
text = path.read_text()

old = """        <Products />

        <WhyRetivio />

        <TemplatesPreview />

        <DashboardPreview />"""

new = """        <Products />

        <WhyRetivio />

        <DashboardPreview />

        <TemplatesPreview />"""

if old in text:
    text = text.replace(old, new)
    path.write_text(text)
    print("✅ DashboardPreview moved before TemplatesPreview.")
else:
    print("❌ Expected section order not found. No changes made.")

