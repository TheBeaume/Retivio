import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Lightbulb,
  Scissors,
  Target,
  Layers3,
} from "lucide-react";
import SEO from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function About() {
  return (
    <>
      <SEO
        title="About Retivio | Building Digital Products for Salons"
        description="Learn about Retivio, founder Sandeep Rana and the journey to build salon management, growth and digital products for modern beauty businesses."
        canonical="/about"
      />

      <Navbar />

      <main className="bg-white">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
                About Retivio
              </p>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Technology built around the
                <span className="text-purple-400"> real business of salons.</span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                Retivio began with a simple belief: salon owners deserve
                technology that understands their customers, daily work and
                need to grow — not another complicated generic business tool.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="sticky top-28">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                  <Lightbulb size={27} />
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                  The journey
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  It started with a question.
                </h2>
              </div>
            </div>

            <div className="space-y-7 text-lg leading-9 text-slate-600">
              <p>
                Why should a salon owner have to manage customer details,
                appointments, follow-ups, billing and business growth across
                different places?
              </p>

              <p>
                That question shaped Retivio. What started as an idea around
                better customer management gradually became a broader salon
                CRM and business growth platform.
              </p>

              <p>
                As the product developed, the vision became clearer. Salons
                do not only need software to store records. They need simple
                digital products that help them operate professionally,
                understand customer activity and find new opportunities to
                grow.
              </p>

              <p className="font-semibold text-slate-950">
                Retivio is being built around that vision — one practical
                salon problem at a time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-3xl bg-purple-700 p-8 text-white shadow-xl shadow-purple-700/15 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-200">
                  Founder
                </p>

                <h2 className="mt-5 text-4xl font-extrabold">
                  Sandeep Rana
                </h2>

                <p className="mt-5 text-lg leading-8 text-purple-100">
                  Founder and product builder behind Retivio.
                </p>

                <div className="mt-8 border-t border-white/20 pt-8">
                  <p className="leading-8 text-purple-100">
                    Focused on using technology and AI to build practical
                    digital products for salons and small businesses.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                  Founder story
                </p>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  Building before everything is perfect.
                </h2>

                <div className="mt-6 space-y-5 leading-8 text-slate-600">
                  <p>
                    Retivio is founded by Sandeep Rana, with a hands-on
                    approach to product building — studying business
                    problems, shaping ideas and turning them into working
                    digital tools.
                  </p>

                  <p>
                    The goal is not to build technology simply because it is
                    possible. The goal is to make useful products that solve
                    clear business problems and remain simple enough for real
                    people to use.
                  </p>

                  <p>
                    Retivio continues to evolve as salon workflows, customer
                    needs and growth opportunities become better understood.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                The bigger vision
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                A growing ecosystem of digital products for salons.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Scissors,
                  title: "Salon-first",
                  text: "Products shaped around the workflows and business challenges of beauty businesses.",
                },
                {
                  icon: Target,
                  title: "Practical by design",
                  text: "Technology should make important work clearer, not add another layer of complexity.",
                },
                {
                  icon: Layers3,
                  title: "Built to expand",
                  text: "Retivio is growing beyond one product into a wider collection of salon digital tools.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-200 bg-white p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
            <div className="max-w-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                <Building2 size={23} />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
                Pravi Technologies
              </p>

              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                The product vision behind Retivio.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                Pravi Technologies is the digital product initiative behind
                Retivio — focused on building useful technology, software and
                digital experiences around real business needs.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold transition hover:bg-purple-500"
            >
              Contact us
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
