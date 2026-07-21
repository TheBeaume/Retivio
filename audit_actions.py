from pathlib import Path
import re

root = Path("src")

button_pattern = re.compile(r"<(button|Button)\b[^>]*>", re.IGNORECASE)
onclick_pattern = re.compile(r"onClick\s*=\s*{([^}]+)}")
function_pattern = re.compile(
    r"(?:const|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:=\s*(?:async\s*)?\([^)]*\)\s*=>|\()"
)

all_functions = {}
used_functions = set()

print("=" * 80)
print("RETIVIO ACTION AUDIT")
print("=" * 80)

for file in root.rglob("*"):
    if file.suffix not in [".js", ".jsx", ".ts", ".tsx"]:
        continue

    try:
        text = file.read_text(errors="ignore")
    except:
        continue

    lines = text.splitlines()

    # collect declared functions
    for i, line in enumerate(lines, 1):
        m = function_pattern.search(line)
        if m:
            all_functions.setdefault(m.group(1), []).append((file, i))

    # audit buttons
    for i, line in enumerate(lines, 1):
        if "<button" in line or "<Button" in line:
            if "onClick" not in line:
                print(f"\n[BUTTON WITHOUT onClick]")
                print(f"{file}:{i}")
                print(line.strip())

        m = onclick_pattern.search(line)
        if m:
            handler = m.group(1).strip().replace("()", "")
            used_functions.add(handler)

print("\n" + "=" * 80)
print("UNUSED FUNCTIONS")
print("=" * 80)

ignore = {
    "App","Home","Dashboard","Products","Hero","Navbar","Footer"
}

count = 0

for fn, locs in sorted(all_functions.items()):
    if fn in ignore:
        continue
    if fn not in used_functions:
        for f, line in locs:
            print(f"{f}:{line} -> {fn}")
            count += 1

print("\n" + "=" * 80)
print(f"Potential unused functions: {count}")
print("=" * 80)
