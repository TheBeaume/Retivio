from pathlib import Path
import re

path = Path("src/components/landing/TemplatesPreview.jsx")
text = path.read_text()

# object-cover -> object-contain
text = text.replace("object-cover object-top", "object-contain bg-white p-4")

# ensure image wrapper keeps proper height
text = re.sub(
    r'className="aspect-\[4/3\] overflow-hidden rounded-xl"',
    'className="aspect-[4/3] overflow-hidden rounded-xl bg-white flex items-center justify-center"',
    text
)

path.write_text(text)

print("✅ Aurelia image crop fixed.")
