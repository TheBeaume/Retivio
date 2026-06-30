import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          At Retivio, protecting your privacy is our priority. This Privacy
          Policy explains how we collect, use and protect your information when
          you use our platform.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Information We Collect
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-8 mb-6">
          <li>Account information (Name, Email).</li>
          <li>Salon information.</li>
          <li>Customer records added by salon owners.</li>
          <li>Appointments and follow-up data.</li>
          <li>Usage analytics to improve our services.</li>
        </ul>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          How We Use Your Information
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-8 mb-6">
          <li>To provide and improve Retivio services.</li>
          <li>To manage appointments and customer records.</li>
          <li>To provide customer support.</li>
          <li>To improve security and performance.</li>
        </ul>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Data Security
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          We use secure authentication and industry-standard security practices
          to protect your data. However, no online service can guarantee
          absolute security.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Contact
        </h2>

        <p className="text-gray-700 leading-8">
          For privacy-related questions, contact us at:
          <br />
          <strong>retivio.support@gmail.com</strong>
        </p>

      </div>
    </div>
  );
}
