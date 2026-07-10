import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectBrief() {

const navigate = useNavigate();

  const [formData, setFormData] = useState({

    package_type: "",

    business_name: "",
    owner_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",

    tagline: "",
    primary_color: "",
    secondary_color: "",
    preferred_font: "",
    website_style: "",

    about_business: "",
    services: "",

    instagram: "",
    facebook: "",
    youtube: "",
    google_business: "",

    domain_name: "",
    hosting_provider: "",
    launch_date: "",
    reference_website: "",

    additional_notes: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
navigate("/project-submitted");

  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl"
      >

        <h1 className="text-center text-4xl font-bold">
          Website Project Brief
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Please complete this form before purchasing your website package.
        </p>
        {/* Package */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Select Package
          </h2>

          <select
            name="package_type"
            value={formData.package_type}
            onChange={handleChange}
            className="mt-4 w-full rounded-xl border p-4"
          >
            <option value="">Choose a Package</option>
            <option value="Template Only">
              Template Only ($49 / ₹2,999)
            </option>
            <option value="Template + Setup">
              Template + Setup ($99 / ₹4,999)
            </option>
            <option value="Business Launch">
              Business Launch ($199 / ₹9,999)
            </option>
          </select>

        </div>

        {/* Business Information */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Business Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <input
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Business Name"
            />

            <input
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Owner Name"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Email Address"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Phone Number"
            />

            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="WhatsApp Number"
            />

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Business Address"
            />

          </div>

        </div>

        {/* Branding */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Branding
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <input
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Business Tagline"
            />

            <input
              name="primary_color"
              value={formData.primary_color}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Primary Brand Color"
            />

            <input
              name="secondary_color"
              value={formData.secondary_color}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Secondary Brand Color"
            />

            <input
              name="preferred_font"
              value={formData.preferred_font}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Preferred Font"
            />

            <input
              name="website_style"
              value={formData.website_style}
              onChange={handleChange}
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Website Style (Luxury, Modern, Elegant...)"
            />

          </div>

        </div>
        {/* About Business */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            About Your Business
          </h2>

          <textarea
            name="about_business"
            value={formData.about_business}
            onChange={handleChange}
            rows="6"
            className="mt-6 w-full rounded-xl border p-4"
            placeholder="Tell us about your business, target audience, unique selling points and brand story."
          />

        </div>

        {/* Services */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Services & Pricing
          </h2>

          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            rows="8"
            className="mt-6 w-full rounded-xl border p-4"
            placeholder={`Example:

Haircut - ₹500

Hair Spa - ₹1500

Keratin Treatment - ₹4500

Bridal Makeup - ₹12000

Nail Extensions - ₹2500`}
          />

        </div>

        {/* Social Media */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Social Media
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Instagram URL"
            />

            <input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Facebook URL"
            />

            <input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="YouTube URL"
            />

            <input
              name="google_business"
              value={formData.google_business}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Google Business Profile URL"
            />

          </div>

        </div>

        {/* Domain & Hosting */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Domain & Hosting
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <input
              name="domain_name"
              value={formData.domain_name}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Domain Name"
            />

            <input
              name="hosting_provider"
              value={formData.hosting_provider}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Hosting Provider"
            />

            <input
              name="launch_date"
              value={formData.launch_date}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Preferred Launch Date"
            />

            <input
              name="reference_website"
              value={formData.reference_website}
              onChange={handleChange}
              className="rounded-xl border p-4"
              placeholder="Reference Website (Optional)"
            />

          </div>

        </div>
        {/* Logo & Gallery */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Logo & Media
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Business Logo
              </label>

              <input
                type="file"
                className="w-full rounded-xl border p-4"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Gallery Images
              </label>

              <input
                type="file"
                multiple
                className="w-full rounded-xl border p-4"
              />
            </div>

          </div>

        </div>

        {/* Team */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Team Information
          </h2>

          <textarea
            rows="5"
            className="mt-6 w-full rounded-xl border p-4"
            placeholder={`Example:

Rahul - Hair Stylist - 8 Years

Priya - Makeup Artist - 6 Years

Neha - Nail Technician - 5 Years`}
          />

        </div>

        {/* Testimonials */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Testimonials
          </h2>

          <textarea
            rows="5"
            className="mt-6 w-full rounded-xl border p-4"
            placeholder="Paste customer testimonials here (Optional)"
          />

        </div>

        {/* Additional Notes */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold">
            Additional Requirements
          </h2>

          <textarea
            name="additional_notes"
            value={formData.additional_notes}
            onChange={handleChange}
            rows="6"
            className="mt-6 w-full rounded-xl border p-4"
            placeholder="Tell us anything else you'd like us to know..."
          />

        </div>

        {/* Submit */}

        <div className="mt-12">

          <button
            type="submit"
            className="w-full rounded-2xl bg-purple-700 py-5 text-lg font-bold text-white transition hover:bg-purple-800"
          >
            Continue to Payment →
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            After submitting this form, you'll be redirected to complete your purchase.
          </p>

        </div>

      </form>
    </div>
  );
}
