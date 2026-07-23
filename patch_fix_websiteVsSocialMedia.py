from pathlib import Path
import shutil

file = Path("src/data/blogs/websiteVsSocialMedia.js")

if not file.exists():
    print("❌ File not found")
    raise SystemExit(1)

backup = file.with_suffix(".js.bak")
shutil.copy(file, backup)

text = file.read_text(encoding="utf-8")

# Replace opening quote
old = 'const websiteVsSocialMedia = "'
new = 'const websiteVsSocialMedia = `'

if old not in text:
    print("❌ Opening string not found")
    raise SystemExit(1)

text = text.replace(old, new, 1)

# Replace first closing ";
closing = '";'

idx = text.find(closing)
if idx == -1:
    print("❌ Closing quote not found")
    raise SystemExit(1)

text = text[:idx] + text[idx:].replace(closing, "", 1)

# Ensure ending
if "export default websiteVsSocialMedia;" in text:
    text = text.replace(
        "export default websiteVsSocialMedia;",
        "`\n\nexport default websiteVsSocialMedia;"
    )
else:
    text += "\n`\n\nexport default websiteVsSocialMedia;\n"

file.write_text(text, encoding="utf-8")

print("✅ Blog fixed successfully.")
