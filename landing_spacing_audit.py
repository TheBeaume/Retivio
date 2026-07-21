from pathlib import Path
import re

folder = Path("src/components/landing")

patterns = [
    r"py-\d+",
    r"pt-\d+",
    r"pb-\d+",
    r"mt-\d+",
    r"mb-\d+",
    r"gap-\d+",
]

print("=" * 60)
print("LANDING PAGE SPACING AUDIT")
print("=" * 60)

for file in sorted(folder.glob("*.jsx")):
    text = file.read_text(errors="ignore")

    found = set()

    for p in patterns:
        found.update(re.findall(p, text))

    print(f"\n{file.name}")

    if found:
        print(" ", ", ".join(sorted(found)))
    else:
        print("  No spacing utilities found")

print("\nAudit Complete.")
