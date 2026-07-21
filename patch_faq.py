from pathlib import Path

content = r'''export default function FAQ() {

  const faqs = [
    {
      question: "What is Retivio?",
      answer:
        "Retivio is a business growth platform that combines professional website solutions, business management and marketing tools into one integrated platform."
    },
    {
      question: "Who is Retivio built for?",
      answer:
        "Retivio is designed for salons, clinics, restaurants, fashion brands, consultants and other service-based businesses looking to establish and grow their online presence."
    },
    {
      question: "Can I build my own website?",
      answer:
        "Yes. You can create your own website using the Retivio Website Builder or choose our custom website design and development service."
    },
    {
      question: "Does Retivio include a Salon CRM?",
      answer:
        "Yes. The Salon CRM helps manage customers, appointments, billing, reports, follow-ups and daily business operations from one organised workspace."
    },
    {
      question: "What marketing tools are included?",
      answer:
        "Retivio includes marketing features such as WhatsApp campaigns, email campaigns, SEO content, Google Reviews and promotional tools."
    },
    {
      question: "Can I use only one product?",
      answer:
        "Yes. You can choose individual solutions such as Website Builder, Custom Website Development or Salon CRM, or combine them as your business grows."
    }
  ];

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
            Frequently Asked Questions
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            Everything you need to know.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Answers to some of the most common questions about Retivio.
          </p>

        </div>

        <div className="mt-16 space-y-6">

          {faqs.map((faq) => (

            <div
              key={faq.question}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >

              <h3 className="text-xl font-semibold text-slate-950">
                {faq.question}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {faq.answer}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
'''

Path("src/components/landing/FAQ.jsx").write_text(content)

print("FAQ.jsx updated successfully.")
