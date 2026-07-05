export default function Newsletter() {
  return (
    <section className="bg-white py-16">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Stay Ahead in the Salon Industry
        </h2>

        <p className="mt-4 text-gray-600">
          Get weekly salon growth tips, AI insights,
          marketing ideas and product updates.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-xl px-5 py-4 w-full md:w-96"
          />

          <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}
