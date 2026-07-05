export default function FeaturedPost() {
  return (
    <section className="mb-16">

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-[300px] flex items-center justify-center">

          <div className="text-center text-white px-8">

            <p className="uppercase tracking-widest text-purple-200 text-sm">
              Featured Article
            </p>

            <h2 className="text-4xl font-bold mt-4">
              Grow Your Salon
              With AI
            </h2>

          </div>

        </div>

        <div className="p-10 flex flex-col justify-center">

          <span className="text-purple-600 font-semibold">
            AI • 6 min read
          </span>

          <h2 className="text-3xl font-bold mt-3">
            7 AI Strategies Every Salon Owner Should Know in 2026
          </h2>

          <p className="mt-5 text-gray-600 leading-7">
            Learn how artificial intelligence is helping salons
            automate appointments, increase repeat customers,
            improve marketing, and grow revenue without increasing
            workload.
          </p>

          <button className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition w-fit">
            Read Article →
          </button>

        </div>

      </div>

    </section>
  );
}
