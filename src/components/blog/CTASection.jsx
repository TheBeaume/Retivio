export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready to Grow Your Salon?
        </h2>

        <p className="mt-6 text-xl text-purple-100">
          Join salons using Retivio to manage appointments,
          customers, payments and marketing from one place.
        </p>

        <div className="mt-10">

          <a
            href="/signup"
            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Start Free Today
          </a>

        </div>

      </div>

    </section>
  );
}
