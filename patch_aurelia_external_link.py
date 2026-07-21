from pathlib import Path

path = Path("src/components/landing/Products.jsx")
text = path.read_text()

text = text.replace(
    'cta: "View Websites",',
    'cta: "Explore AURELIA",'
)

text = text.replace(
    'href: "#templates",',
    'href: "https://aurelia-cyan.vercel.app/",'
)

old = """{solution.href.startsWith("#") ? (
                <a
                  href={solution.href}"""

new = """{solution.href.startsWith("http") ? (
                <a
                  href={solution.href}
                  target="_blank"
                  rel="noopener noreferrer\""""

text = text.replace(old, new)
text = text.replace(
    'solution.href.startsWith("#")',
    'solution.href.startsWith("http")'
)

path.write_text(text)

print("✅ Website Solutions now opens AURELIA website.")
