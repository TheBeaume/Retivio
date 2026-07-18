from pathlib import Path

FILE = Path.home() / "my-app/src/components/PraviOutreach.before-manual-leads.jsx"

text = FILE.read_text(encoding="utf-8")

anchor = '  const [leadSearch, setLeadSearch] = React.useState("");'

insert = '''  const [leadSearch, setLeadSearch] = React.useState("");
  const [instagramBulk, setInstagramBulk] = React.useState("");

  const parseInstagramUsernames = () => {
    return [
      ...new Set(
        instagramBulk
          .split(/\\r?\\n|,/)
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) =>
            v
              .replace(/^https?:\\/\\/(www\\.)?instagram\\.com\\//i, "")
              .replace(/^@/, "")
              .replace(/\\/?$/, "")
          )
      ),
    ];
  };

'''

if "instagramBulk" in text:
    print("Patch 002 already applied.")
    raise SystemExit

if anchor not in text:
    raise SystemExit("Anchor not found. Stop.")

text = text.replace(anchor, insert, 1)

FILE.write_text(text, encoding="utf-8")

print("✅ Patch 002 applied successfully.")
