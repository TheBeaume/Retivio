from pathlib import Path

path = Path("src/components/landing/TemplatesPreview.jsx")
text = path.read_text()

if '<section id="templates"' in text:
    print("Already patched.")
elif "<section" in text:
    text = text.replace("<section", '<section id="templates"', 1)
    path.write_text(text)
    print("Templates section anchor added.")
else:
    print("Section tag not found.")
