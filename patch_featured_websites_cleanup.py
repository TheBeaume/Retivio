from pathlib import Path

path = Path("src/components/landing/TemplatesPreview.jsx")
text = path.read_text()

old = '''          {["Your Business Could Be Here","Your Business Could Be Here","Your Business Could Be Here"].map((item,index)=>(
            <div
              key={index}
              className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 flex items-center justify-center text-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-700">
                  {item}
                </h3>

                <p className="mt-3 text-slate-500">
                  Showcase your business with a professional website built
                  using Retivio.
                </p>
              </div>
            </div>
          ))}'''

new = '''
          <div className="rounded-3xl border border-dashed border-purple-300 bg-purple-50 p-10 text-center">

            <h3 className="text-2xl font-semibold text-slate-950">
              Ready to showcase your business?
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              Your business could be the next featured website built with
              Retivio.
            </p>

            <a
              href="/website-builder"
              className="mt-8 inline-flex rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white hover:bg-purple-800"
            >
              Build Your Website
            </a>

          </div>
'''

text = text.replace(old, new)

path.write_text(text)

print("Featured Websites cleaned successfully.")
