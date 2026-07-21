from pathlib import Path
import shutil

root = Path("src")
archive = Path("archive")
archive.mkdir(exist_ok=True)

keywords = ("backup", "before-", "broken")

count = 0

for f in root.rglob("*"):
    if f.is_file() and any(k in f.name.lower() for k in keywords):
        dest = archive / f.relative_to(root)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(f), str(dest))
        count += 1

print(f"Moved {count} backup files to archive/")
