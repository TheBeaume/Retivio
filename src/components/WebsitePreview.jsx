import React from "react";
 export default function WebsitePreview({
  onBack,
  businessName = "The Beaume",
  businessInfo = {},
}) {  

  return (
    <div className="min-h-screen bg-white">
<div className="p-6">
  <button
    onClick={onBack}
    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
  >
    ← Back to Templates
  </button>

<div className="mt-8 space-y-2 text-gray-300">

  {businessInfo.phone && (
    <p> {businessInfo.phone}</p>
  )}

  {businessInfo.email && (
    <p> {businessInfo.email}</p>
  )}

  {businessInfo.address && (
    <p> {businessInfo.address}</p>
  )}

</div>
</div>

      {/* Hero */}
      <section className="bg-black text-white py-16 px-6 text-center">

        <h1 className="text-5xl font-bold">
{businessName}
        </h1>

        <p className="text-yellow-400 mt-3 text-xl">
          Where Beauty Blooms
        </p>

        <p className="mt-6 max-w-xl mx-auto text-gray-300">
          Experience luxury salon services designed to make you look and feel your best.
        </p>

        <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-xl">
          Book Appointment
        </button>

      </section>

      {/* Services */}
      <section className="py-16 px-6">

        <h2 className="text-3xl font-bold text-center">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="border rounded-xl p-6 text-center shadow">
            
            <h3 className="font-bold text-xl mt-3">
              Hair Spa
            </h3>
          </div>

          <div className="border rounded-xl p-6 text-center shadow">
            
            <h3 className="font-bold text-xl mt-3">
              Facial
            </h3>
          </div>

          <div className="border rounded-xl p-6 text-center shadow">
            
            <h3 className="font-bold text-xl mt-3">
              Bridal Makeup
            </h3>
          </div>

        </div>

      </section>

      {/* About */}

      <section className="bg-gray-100 py-16 px-6 text-center">

        <h2 className="text-3xl font-bold">
          About Us
        </h2>

        <p className="max-w-2xl mx-auto mt-5 text-gray-600">
          We believe beauty is confidence. Our experienced professionals provide premium salon services with modern techniques and luxury care.
        </p>

      </section>

      {/* Contact */}

      <section className="py-16 px-6 text-center">

        <h2 className="text-3xl font-bold">
          Contact
        </h2>

        <p className="mt-4">
           +91 9876543210
        </p>

        <p>
           Chandigarh
        </p>

      </section>

    </div>
  );
}
