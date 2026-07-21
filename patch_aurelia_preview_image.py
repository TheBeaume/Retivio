from pathlib import Path

path = Path("src/components/landing/TemplatesPreview.jsx")
text = path.read_text()

# Add image import
if 'aurelia-showcase.png' not in text:
    imports = text.splitlines()
    last_import = 0
    for i, line in enumerate(imports):
        if line.startswith("import "):
            last_import = i

    imports.insert(
        last_import + 1,
        'import aureliaShowcase from "../../assets/images/aurelia-showcase.png";'
    )
    text = "\n".join(imports)

# Replace placeholder
text = text.replace(
'''            <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-400">
              AURELIA Preview
            </div>''',
'''            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={aureliaShowcase}
                alt="AURELIA Luxury Salon Website"
                className="w-full h-full object-cover object-top transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>'''
)

path.write_text(text)
print("AURELIA showcase updated.")
