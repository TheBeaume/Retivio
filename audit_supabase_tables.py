from pathlib import Path
import re
from collections import defaultdict

root = Path("src")

pattern = re.compile(r'\.from\(\s*[\'"]([^\'"]+)[\'"]\s*\)')

tables = defaultdict(list)

for f in root.rglob("*"):
    if f.suffix not in [".js", ".jsx", ".ts", ".tsx"]:
        continue

    try:
        txt = f.read_text(errors="ignore")
    except:
        continue

    for i, line in enumerate(txt.splitlines(), 1):
        m = pattern.search(line)
        if m:
            tables[m.group(1)].append((str(f), i))

print("=" * 80)
print("RETIVIO SUPABASE TABLE MAP")
print("=" * 80)

for table in sorted(tables):
    print(f"\n📦 TABLE: {table}")
    for file, line in tables[table]:
        print(f"  └── {file}:{line}")

print("\n" + "=" * 80)
print(f"Total tables referenced: {len(tables)}")
print("=" * 80)
