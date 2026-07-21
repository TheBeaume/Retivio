from pathlib import Path

path = Path("src/components/landing/WhyRetivio.jsx")
text = path.read_text()

if 'import SectionHeader' not in text:
    text = text.replace(
        'export default function WhyRetivio() {',
        'import SectionHeader from "./SectionHeader";\n\nexport default function WhyRetivio() {'
    )

old = '''
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Why Retivio
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Everything your business needs to grow.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Build your online presence, manage daily operations and
            grow your business from one integrated platform.
          </p>

        </div>
'''

new = '''
        <SectionHeader
          eyebrow="Why Retivio"
          title="Everything your business needs to grow."
          description="Build your online presence, manage daily operations and grow your business from one integrated platform."
        />
'''

text = text.replace(old, new)

path.write_text(text)

print("WhyRetivio updated.")
