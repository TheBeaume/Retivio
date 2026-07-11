import React, { useState } from "react";
import { supabase } from "../lib/supabase";
export default function FeedbackModal({ onClose }) {
const [rating, setRating] = useState(5);
const [bugReport, setBugReport] = useState("");
const [featureRequest, setFeatureRequest] = useState("");
const [loading, setLoading] = useState(false);

async function handleSubmit() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("feedback").insert({
    user_id: user.id,
    rating,
    bug_report: bugReport,
    feature_request: featureRequest,
  });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert(" Thank you for your feedback!");
  onClose();
} 

 return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-11/12 max-w-lg p-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
             Send Feedback
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            
          </button>
        </div>

        <p className="text-gray-500 mt-2">
          Help us improve Retivio Beta.
        </p>

<div className="mt-5">
  <label className="font-medium">⭐ Rating</label>

  <select
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
    className="w-full border rounded-xl p-3 mt-2"
  >
    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
    <option value={4}>⭐⭐⭐⭐ Good</option>
    <option value={3}>⭐⭐⭐ Average</option>
    <option value={2}>⭐⭐ Needs Improvement</option>
    <option value={1}>⭐ Poor</option>
  </select>
</div>

<textarea
  rows="4"
  placeholder=" Describe any bug you found..."
  value={bugReport}
  onChange={(e) => setBugReport(e.target.value)}
  className="w-full mt-4 border rounded-xl p-3"
/>

<textarea
  rows="4"
  placeholder=" Suggest a feature..."
  value={featureRequest}
  onChange={(e) => setFeatureRequest(e.target.value)}
  className="w-full mt-4 border rounded-xl p-3"
/>
<button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full mt-5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold"
>
  {loading ? "Submitting..." : " Submit Feedback"}
</button>
      </div>

    </div>
  );
}
