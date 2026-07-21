import React from "react";
import SEO from "../components/SEO";
export default function About() {
return (
  <>
    <SEO
      title="About Retivio | AI-Powered Salon CRM"
      description="Learn about Retivio, the AI-powered Salon CRM built to help salons and spas manage customers, appointments, WhatsApp follow-ups and business growth."
      canonical="/about"
    />

    <div className="min-h-screen bg-purple-50 py-12 px-6">     
 <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          About Retivio
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          Retivio is an AI-powered Salon CRM built to help salons and spas
          simplify daily operations, strengthen customer relationships, and
          grow their business through smarter customer management.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Our Mission
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          To empower every salon owner with simple, intelligent technology
          that turns visitors into loyal, repeat customers.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Why Retivio?
        </h2>

        <p className="text-gray-700 leading-8 mb-6">
          Managing appointments, customer history, follow-ups and business
          growth should be simple. Retivio brings everything together in one
          easy-to-use platform so salon owners can spend less time managing
          records and more time serving customers.
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-3">
          Our Vision
        </h2>

        <p className="text-gray-700 leading-8">
          To become India's most trusted AI-powered Salon CRM platform and
          help beauty businesses build stronger customer relationships through
          innovation.
        </p>

      </div>
    </div>
</>
  );
}
