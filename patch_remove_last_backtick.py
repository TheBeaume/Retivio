from pathlib import Path

path = Path("src/data/blogs/websiteVsSocialMedia.js")
text = path.read_text(encoding="utf-8")

lines = text.splitlines()

new_lines = []
removed = False

for line in lines:
    if not removed and line.strip() == "`":
        removed = True
        continue
    new_lines.append(line)

path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")

print("✅ Removed stray backtick.")
