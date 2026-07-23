from pathlib import Path
import json

package = Path("package.json")

data = json.loads(package.read_text(encoding="utf-8"))

scripts = data.setdefault("scripts", {})

# Existing prebuild (sitemap)
old_prebuild = scripts.get("prebuild", "").strip()

validator = "node scripts/validate-blog-seo.js"
sitemap = "node scripts/generate-sitemap.js"

if old_prebuild:
    if validator not in old_prebuild:
        parts = [validator]

        if sitemap in old_prebuild:
            parts.append(sitemap)
        else:
            parts.append(old_prebuild)

        scripts["prebuild"] = " && ".join(parts)
else:
    scripts["prebuild"] = validator + " && " + sitemap

package.write_text(
    json.dumps(data, indent=2) + "\n",
    encoding="utf-8"
)

print("✅ Blog SEO Validator linked with build.")
print("Current prebuild:")
print(scripts["prebuild"])
