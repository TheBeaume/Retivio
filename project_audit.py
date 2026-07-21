from pathlib import Path
import re

root = Path("src")

jsx_files = list(root.rglob("*.jsx"))
js_files = list(root.rglob("*.js"))

files = jsx_files + js_files

print("=" * 60)
print("RETIVIO PROJECT HEALTH REPORT")
print("=" * 60)

print(f"\nTotal Source Files : {len(files)}")

backup = [f for f in files if ".before-" in f.name]

print(f"Backup Files       : {len(backup)}")

large = []

for f in files:
    try:
        lines = len(f.read_text(encoding="utf-8").splitlines())
        if lines > 500:
            large.append((lines, f))
    except:
        pass

print(f"Large Components   : {len(large)}")

todo = []

for f in files:
    try:
        txt = f.read_text(encoding="utf-8")
        if "TODO" in txt or "FIXME" in txt:
            todo.append(f)
    except:
        pass

print(f"TODO/FIXME         : {len(todo)}")

console = []

for f in files:
    try:
        txt = f.read_text(encoding="utf-8")
        if "console.log(" in txt:
            console.append(f)
    except:
        pass

print(f"console.log()      : {len(console)}")

print("\n")

if backup:
    print("BACKUP FILES")
    print("-" * 40)
    for f in backup:
        print(f)

if large:
    print("\nLARGE COMPONENTS")
    print("-" * 40)
    for lines, f in sorted(large, reverse=True):
        print(f"{lines:5} lines  {f}")

if console:
    print("\nCONSOLE LOGS")
    print("-" * 40)
    for f in console:
        print(f)

if todo:
    print("\nTODO / FIXME")
    print("-" * 40)
    for f in todo:
        print(f)

print("\nAudit Complete.")
