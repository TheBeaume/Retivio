import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  Sparkles,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

const templates = [
  {
    id: "luxury",
    name: "Luxury",
    description: "Elegant and premium salon presence",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and conversion-focused design",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, calm and professional",
  },
];

export default function WebsiteBuilder() {
  const [formData, setFormData] = useState({
    businessName: "Your Salon",
    tagline: "Beauty, care and confidence",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    city: "Your City",
    primaryColor: "#7e22ce",
    template: "luxury",
  });

  const [previewMode, setPreviewMode] = useState("desktop");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const selectedTemplate =
    templates.find((template) => template.id === formData.template) ||
    templates[0];

  return (
    <section
      id="website-builder"
      className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            <Sparkles size={16} />
            Retivio Website Builder
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Build your salon website in minutes.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Enter your business details and watch your website come to life
            instantly. No coding required.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
              Website details
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Tell us about your salon
            </h3>

            <div className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Business name
                </label>

                <input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  placeholder="Salon name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Tagline
                </label>

                <input
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  placeholder="Your business tagline"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    WhatsApp
                  </label>

                  <input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  City
                </label>

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Website style
                </label>

                <div className="grid gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          template: template.id,
                        }))
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        formData.template === template.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-slate-950 hover:border-white/20"
                      }`}
                    >
                      <p className="font-bold">{template.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {template.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Brand color
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 p-3">
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="h-10 w-12 cursor-pointer border-0 bg-transparent"
                  />

                  <span className="text-sm font-medium text-slate-300">
                    {formData.primaryColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white">
                  Live website preview
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedTemplate.name} template
                </p>
              </div>

              <div className="inline-flex w-fit rounded-xl border border-white/10 bg-slate-950 p-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={`rounded-lg p-2.5 transition ${
                    previewMode === "desktop"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400"
                  }`}
                  aria-label="Desktop preview"
                >
                  <Monitor size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={`rounded-lg p-2.5 transition ${
                    previewMode === "mobile"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400"
                  }`}
                  aria-label="Mobile preview"
                >
                  <Smartphone size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-auto rounded-2xl bg-slate-950 p-3 sm:p-5">
              <div
                className={`mx-auto overflow-hidden rounded-xl bg-white text-slate-950 shadow-2xl transition-all duration-300 ${
                  previewMode === "mobile"
                    ? "max-w-[360px]"
                    : "w-full"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: formData.primaryColor }}
                  >
                    {formData.businessName || "Your Salon"}
                  </p>

                  <span className="text-xs font-semibold text-slate-500">
                    BOOK NOW
                  </span>
                </div>

                <div
                  className={`px-6 py-16 text-center sm:px-10 ${
                    formData.template === "luxury"
                      ? "bg-slate-950 text-white"
                      : formData.template === "minimal"
                      ? "bg-stone-50 text-slate-950"
                      : "bg-white text-slate-950"
                  }`}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ color: formData.primaryColor }}
                  >
                    Welcome to
                  </p>

                  <h4 className="mt-5 text-4xl font-extrabold sm:text-5xl">
                    {formData.businessName || "Your Salon"}
                  </h4>

                  <p
                    className={`mx-auto mt-5 max-w-lg leading-7 ${
                      formData.template === "luxury"
                        ? "text-slate-300"
                        : "text-slate-600"
                    }`}
                  >
                    {formData.tagline || "Beauty, care and confidence"}
                  </p>

                  <button
                    type="button"
                    className="mt-8 rounded-full px-6 py-3 font-bold text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Book an appointment
                  </button>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <Phone
                      size={18}
                      style={{ color: formData.primaryColor }}
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">
                      CALL US
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formData.phone || "Phone number"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <MessageCircle
                      size={18}
                      style={{ color: formData.primaryColor }}
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">
                      WHATSAPP
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formData.whatsapp || "WhatsApp number"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <MapPin
                      size={18}
                      style={{ color: formData.primaryColor }}
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">
                      LOCATION
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formData.city || "Your city"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-5 py-4 text-center text-xs text-slate-400">
                  Website preview powered by Retivio
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
              <p className="text-sm font-semibold text-purple-200">
                This is a live preview. Your changes appear instantly.
                Publishing and advanced customization are coming next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
