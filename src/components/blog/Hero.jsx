import { BookOpen, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
          <Sparkles size={18} />
          <span className="text-sm font-medium">
            Salon Growth Academy
          </span>
        </div>

        <h1 className="text-5xl font-extrabold leading-tight">
          Grow Your Salon
          <br />
          With Proven Strategies
        </h1>

        <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto">
          Discover expert insights on salon marketing, customer retention,
          AI, WhatsApp campaigns, appointment management, and business growth.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            <BookOpen className="inline mr-2" size={18} />
            Read Articles
          </button>

          <a
            href="/signup"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-700 transition"
          >
            Start Free
          </a>

        </div>

      </div>
    </section>
  );
}
