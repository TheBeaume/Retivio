from pathlib import Path
import re

ROOT = Path("src")

KEYWORDS = [
    "billing",
    "invoice",
    "payment",
    "report",
    "revenue",
    "appointment",
    "visit",
    "customer",
]

SUPABASE = [
    ".from(",
    ".insert(",
    ".update(",
    ".delete(",
    ".select(",
    ".rpc(",
]

print("=" * 80)
print("RETIVIO BILLING & REPORTS AUDIT")
print("=" * 80)

for file in ROOT.rglob("*"):
    if file.suffix not in (".js", ".jsx", ".ts", ".tsx"):
        continue

    try:
        text = file.read_text(errors="ignore")
    except Exception:
        continue

    lower = text.lower()

    if not any(k in lower for k in KEYWORDS):
        continue

    print(f"\n📄 {file}")

    found = False

    for op in SUPABASE:
        count = text.count(op)
        if count:
            print(f"   {op:<12} {count}")
            found = True

    handlers = re.findall(
        r'const\s+([A-Za-z0-9_]+)\s*=\s*(?:async\s*)?\(',
        text
    )

    if handlers:
        print("   Handlers:")
        for h in handlers[:12]:
            print("    -", h)

    if not found:
        print("   ⚠ No Supabase operation detected.")

print("\n" + "=" * 80)
print("Audit Complete")
print("=" * 80)
