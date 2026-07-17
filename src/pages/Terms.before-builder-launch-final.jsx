import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          By accessing or using Retivio, you agree to these Terms &
          Conditions. If you do not agree with these terms, please do not use
          our services.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          User Accounts
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-8 mb-6">
          <li>You are responsible for maintaining your account security.</li>
          <li>You must provide accurate information.</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Acceptable Use
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-8 mb-6">
          <li>Do not misuse or attempt to disrupt the platform.</li>
          <li>Do not upload unlawful or harmful content.</li>
          <li>Use Retivio only for legitimate business purposes.</li>
        </ul>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Beta Service
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          Retivio is currently available as a Beta product. Features may be
          updated, modified or removed as we continue improving the platform.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Limitation of Liability
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          Retivio is provided "as is". While we strive for reliability, we
          cannot guarantee uninterrupted availability or be responsible for
          business losses resulting from service interruptions.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Contact
        </h2>

        <p className="text-gray-700 leading-8">
          Questions regarding these Terms can be sent to:
          <br />
          <strong>retivio.support@gmail.com</strong>
        </p>

      </div>
    </div>
  );
}
