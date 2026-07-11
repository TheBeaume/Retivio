import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackCard() {
const [showModal, setShowModal] = useState(false);
const [hideCard, setHideCard] = useState(false);

if (hideCard) return null;
return (
  <>
    <div className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold">
        Enjoying Retivio Beta?
      </h2>

      <p className="mt-2 text-purple-100">
        Your feedback helps us improve Retivio for salon owners.
      </p>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-purple-700 font-semibold px-5 py-3 rounded-xl hover:bg-purple-100 transition"
        >
           Give Feedback
        </button>

        <button
          onClick={() => setHideCard(true)}
          className="bg-white/20 px-5 py-3 rounded-xl hover:bg-white/30 transition"
        >
           Maybe Later
        </button>
      </div>
    </div>

    {showModal && (
      <FeedbackModal
        onClose={() => setShowModal(false)}
      />
    )}
  </>
);

}
