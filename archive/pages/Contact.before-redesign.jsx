import React from "react";
import SEO from "../components/SEO";
export default function Contact() {
return (
  <>
    <SEO
      title="Contact Retivio | AI-Powered Salon CRM"
      description="Contact Retivio for product demos, support, partnerships, or any questions about our AI-powered Salon CRM."
      canonical="/contact"
    />

    <div className="min-h-screen bg-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Contact Us
        </h1>

        <p className="text-gray-700 leading-8 mb-8">
          We'd love to hear from you. Whether you have questions, feedback,
          feature requests, or need support, feel free to reach out.
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              📧 Support Email
            </h2>
            <p className="text-gray-700">
              retivio.support@gmail.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              🌐 Website
            </h2>
            <p className="text-gray-700">
              https://retivio.in
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              🚀 Product Status
            </h2>
            <p className="text-gray-700">
              Retivio is currently in Beta. We welcome your feedback to help us improve.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              💜 Our Promise
            </h2>
            <p className="text-gray-700">
              We're committed to helping salon owners grow their business with
              simple, reliable and intelligent software.
            </p>
          </div>

        </div>

      </div>
    </div>
</>
  );
}
