from pathlib import Path
import shutil

file = Path("src/components/landing/Navbar.jsx")

backup = file.with_suffix(".jsx.bak_navbar")
shutil.copy(file, backup)

text = file.read_text()

old = '  { label: "Resources", href: "/#faq" },\n'

if old not in text:
    print("Resources menu not found.")
    raise SystemExit(1)

text = text.replace(old, "", 1)

file.write_text(text)

print("✅ Duplicate Resources removed.")
