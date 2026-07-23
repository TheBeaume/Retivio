from pathlib import Path
import re

path = Path("src/data/blogData.js")
text = path.read_text(encoding="utf-8")

# Replace any object ending followed immediately by another object
pattern = r'(\s+readTime:\s*"[^"]+"\s*\n\s*})\s*\n(\s*{\s*\n\s*id:\s*13,)'

new_text = re.sub(pattern, r'\1,\n\n\2', text, count=1)

if new_text == text:
    print("❌ Pattern not found. No changes made.")
    raise SystemExit(1)

path.write_text(new_text, encoding="utf-8")

print("✅ Missing comma added successfully.")
