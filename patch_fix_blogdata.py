from pathlib import Path

path = Path("src/data/blogData.js")
text = path.read_text(encoding="utf-8")

lines = text.splitlines()

for i in range(len(lines) - 2):
    line = lines[i].rstrip()

    # Find:
    # }
    #
    # {
    if line == "}":
        j = i + 1

        while j < len(lines) and lines[j].strip() == "":
            j += 1

        if j < len(lines) and lines[j].lstrip().startswith("{"):
            lines[i] = "  },"
            print(f"✅ Added comma after object ending at line {i+1}")
            break

path.write_text("\n".join(lines) + "\n", encoding="utf-8")

print("Done.")
