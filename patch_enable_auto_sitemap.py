from pathlib import Path
import json

package = Path("package.json")

data = json.loads(package.read_text(encoding="utf-8"))

scripts = data.setdefault("scripts", {})

# Add prebuild only if missing
if "prebuild" not in scripts:
    scripts["prebuild"] = "node scripts/generate-sitemap.js"

package.write_text(
    json.dumps(data, indent=2) + "\n",
    encoding="utf-8"
)

print("✅ prebuild script added successfully.")
