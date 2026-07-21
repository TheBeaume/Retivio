from pathlib import Path
import re

for f in Path("src").rglob("*.[jt]s*"):
    try:
        text = f.read_text(errors="ignore")
    except:
        continue

    for i,line in enumerate(text.splitlines(),1):
        if re.search(r'console\.(log|warn|error|debug)', line):
            print(f"{f}:{i}: {line.strip()}")
