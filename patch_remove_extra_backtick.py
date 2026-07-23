from pathlib import Path

path = Path("src/data/blogs/websiteVsSocialMedia.js")
text = path.read_text(encoding="utf-8")

text = text.replace(
    "`\n\n`\n\nexport default websiteVsSocialMedia;",
    "`\n\nexport default websiteVsSocialMedia;"
)

path.write_text(text, encoding="utf-8")

print("✅ Extra backtick removed.")
