from pathlib import Path

path = Path("src/data/blogData.js")
text = path.read_text(encoding="utf-8")

old = '''  readTime: "16 min read"
  }

  {
    id: 13,'''

new = '''  readTime: "16 min read"
  },

  {
    id: 13,'''

if old not in text:
    print("❌ Target block not found.")
    raise SystemExit(1)

text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")

print("✅ Missing comma fixed.")
