import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const features = [
  {
    icon: "👥",
    title: "Customer Management",
    description:
      "Manage customer profiles, visit history, contact details, loyalty status and spending history from one place.",
  },
  {
    icon: "📅",
    title: "Appointment Management",
    description:
      "Book appointments, manage daily schedules, track appointment status and keep service notes.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    description:
      "Track revenue, customer growth, appointments and business performance with easy-to-read reports.",
  },
  {
    icon: "❤️",
    title: "Customer Follow-ups",
    description:
      "Identify inactive and due customers to improve repeat visits and customer retention.",
  },
  {
    icon: "📈",
    title: "Business Dashboard",
    description:
      "View important business metrics like customers, appointments and revenue at a glance.",
  },
  {
    icon: "🔒",
    title: "Secure Cloud Access",
    description:
      "Your salon data stays secure and is accessible anytime, anywhere.",
  },
];

const comingSoon = [
  "WhatsApp Integration",
  "AI Assistant",
  "Marketing Automation",
  "Loyalty Program",
  "Digital Consent Forms",
  "Online Booking",
];

export default function Features() {
  return (
<>
<SEO
  title="Salon CRM Features | Retivio"
  description="Explore Retivio's AI-powered Salon CRM features including appointment booking, customer management, WhatsApp follow-ups, loyalty, analytics, billing and salon business growth."
  canonical="/features"
/>
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center text-purple-700">
          Powerful Features for Modern Salons
        </h1>

        <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
          Everything you need to manage your salon in one place. Retivio helps
          you manage customers, appointments, reports and follow-ups while
          growing repeat business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h2 className="text-2xl font-bold mt-4">
                {feature.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            🚀 Coming Soon
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {comingSoon.map((item, index) => (
              <div
                key={index}
                className="bg-purple-100 rounded-xl p-4 font-semibold"
              >
                🟣 {item}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-4xl font-bold">
            Ready to Grow Your Salon?
          </h2>

          <p className="text-gray-600 mt-4">
            Join the Retivio Free Beta and experience a smarter way to manage your salon.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-800"
          >
            Start Free Beta
          </Link>
        </div>

      </div>
    </div>
</>  
);
}
