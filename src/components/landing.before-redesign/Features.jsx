import React from "react";

const features = [
  {
    icon: "👥",
    title: "Customer Management",
    desc: "Manage customer profiles, visit history and spending in one place.",
  },
  {
    icon: "📅",
    title: "Smart Appointments",
    desc: "Schedule appointments with an easy-to-use calendar.",
  },
  {
    icon: "💬",
    title: "WhatsApp Booking",
    desc: "Allow customers to request appointments through WhatsApp.",
  },
  {
    icon: "🔔",
    title: "Automatic Follow-ups",
    desc: "Reconnect inactive customers with reminders and campaigns.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    desc: "Track revenue, customer growth and business performance.",
  },
  {
    icon: "🎁",
    title: "Loyalty Program",
    desc: "Reward your best customers and increase repeat visits.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-purple-600 font-semibold uppercase tracking-widest">
            Features
          </span>

          <h2 className="text-4xl font-extrabold mt-3">
            Everything Your Salon Needs
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Retivio brings customer management, appointments,
            WhatsApp booking, follow-ups and business insights
            into one powerful platform.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
