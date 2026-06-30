import React, { useState } from "react";
import BetaModal from "./BetaModal";

export default function BetaCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        id="beta"
        className="py-24 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-600 text-white"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
            🚀 Early Access
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold mt-6">
            Join the Retivio Beta
          </h2>

          <p className="mt-6 text-lg text-purple-100 max-w-2xl mx-auto">
            Be among the first salon owners to experience Retivio.
            Your feedback will directly shape the future of the product.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
            >
              🚀 Join Free Beta
            </button>

            <a
              href="/login"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-700 transition"
            >
              Login
            </a>

          </div>

        </div>
      </section>

      {showModal && (
        <BetaModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
