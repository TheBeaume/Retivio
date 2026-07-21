from pathlib import Path

path = Path("src/pages/LandingPage.jsx")
text = path.read_text()

# Remove current DashboardPreview
text = text.replace("""

        <DashboardPreview />""", "")

# Insert after WhyRetivio
text = text.replace(
"""        <WhyRetivio />

        <HowItWorks />""",
"""        <WhyRetivio />

        <DashboardPreview />

        <HowItWorks />"""
)

path.write_text(text)

print("✅ DashboardPreview moved after WhyRetivio.")
