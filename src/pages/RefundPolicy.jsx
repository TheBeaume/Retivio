import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Refund Policy
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          Thank you for choosing Retivio.
        </p>

        <p className="text-gray-700 leading-8 mb-6">
          Retivio is currently offered as a free Beta product. During this
          period, no subscription fees are charged and therefore no refunds
          apply.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Future Paid Plans
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          If paid subscriptions are introduced in the future, this Refund
          Policy will be updated with clear eligibility, refund timelines,
          cancellation terms, and applicable conditions.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Contact Us
        </h2>

        <p className="text-gray-700 leading-8">
          If you have any questions regarding this policy, please contact us:
          <br />
          <strong>retivio.support@gmail.com</strong>
        </p>

      </div>
    </div>
  );
}
