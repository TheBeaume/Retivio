import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Retivio?",
    answer:
      "Retivio is a salon CRM and business growth platform designed to help beauty businesses manage customers, appointments, follow-ups, billing, reports and growth workflows from one place.",
  },
  {
    question: "Who is Retivio built for?",
    answer:
      "Retivio is built for salons and beauty businesses that want a more organised way to manage daily operations, customer activity and business growth.",
  },
  {
    question: "Can I manage customer and visit history?",
    answer:
      "Yes. Retivio is designed to keep customer information and visit activity organised so you can understand customer relationships more clearly.",
  },
  {
    question: "Does Retivio support appointments?",
    answer:
      "Yes. Retivio includes appointment management to help salons organise upcoming bookings and daily schedules.",
  },
  {
    question: "Can I create bills and invoices?",
    answer:
      "Retivio includes billing and invoice workflows designed to keep salon transactions closer to customer and service activity.",
  },
  {
    question: "What are Retivio's growth tools?",
    answer:
      "Retivio includes growth-focused capabilities such as follow-up workflows, campaigns, reports and Customer Finder tools that help salons identify opportunities and act with more clarity.",
  },
  {
    question: "Is Retivio free to use?",
    answer:
      "Free access is currently available so salon owners can start exploring Retivio and organise their salon operations.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. Retivio is a web-based platform, so you can access it through a supported web browser without installing traditional desktop software.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            Frequently asked questions
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Questions before you get started?
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen
                    ? "border-purple-200 bg-purple-50/50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-950">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-purple-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-7 text-slate-600 sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
