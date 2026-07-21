from pathlib import Path

path = Path("src/components/landing/DashboardPreview.jsx")
text = path.read_text()

# remove unused import if exists
text = text.replace(
    'import dashboardShowcase from "../../assets/images/retivio-dashboard-showcase.png";\n',
    ''
)

# add import after Link import
if 'dashboardShowcase' not in text:
    text = text.replace(
        'import { Link } from "react-router-dom";',
        'import { Link } from "react-router-dom";\nimport dashboardShowcase from "../../assets/images/retivio-dashboard-showcase.png";'
    )

start = text.find('<div className="order-2 lg:order-1">')
end = text.find('</div>', start)

# find matching closing div of first column
count = 0
i = start
while i < len(text):
    if text.startswith("<div", i):
        count += 1
    elif text.startswith("</div>", i):
        count -= 1
        if count == 0:
            end = i + 6
            break
    i += 1

new_block = '''
<div className="order-2 lg:order-1">

  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

    <img
      src={dashboardShowcase}
      alt="Retivio Business Command Center"
      className="w-full h-auto object-cover"
      loading="lazy"
    />

  </div>

</div>
'''

text = text[:start] + new_block + text[end:]

path.write_text(text)

print("Dashboard showcase image updated successfully.")
