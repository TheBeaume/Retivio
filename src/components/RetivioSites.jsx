import { useState, useEffect } from "react";
import WebsitePreview from "./WebsitePreview";
import { supabase } from "../lib/supabase";

export default function RetivioSites() {
const [businessName, setBusinessName] = useState("Your Salon");
const [showPreview, setShowPreview] = useState(false);
const [businessInfo, setBusinessInfo] = useState({
  phone: "",
  email: "",
  address: "",
  instagram: "",
});
useEffect(() => {
  loadBusinessName();
}, []);

async function loadBusinessName() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("business_settings")
    .select("business_name")
    .eq("user_id", user.id)
    .single();

if (data) {
  setBusinessName(data.business_name || "Your Salon");

  setBusinessInfo({
    phone: data.whatsapp || "",
    email: data.email || "",
    address: data.address || "",
    instagram: data.instagram || "",
  });
}
  }

  const templates = [
    {
      id: 1,
      name: "Luxury",
      emoji: "💎",
      color: "from-black to-gray-800",
      description: "Premium salon experience",
    },
    {
      id: 2,
      name: "Elegant",
      emoji: "🌸",
      color: "from-pink-400 to-rose-500",
      description: "Soft & feminine design",
    },
    {
      id: 3,
      name: "Natural",
      emoji: "🌿",
      color: "from-green-400 to-emerald-600",
      description: "Organic & wellness theme",
    },
    {
      id: 4,
      name: "Modern",
      emoji: "✨",
      color: "from-purple-500 to-indigo-600",
      description: "Clean & minimal look",
    },
  ];
if (showPreview) {
return (

<WebsitePreview
  businessName={businessName}
  businessInfo={businessInfo}
  onBack={() => setShowPreview(false)}
/>
);

}
  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl text-white p-10">

        <h1 className="text-4xl font-bold">
          🌐 Retivio Sites
        </h1>

        <p className="mt-3 text-purple-100 text-lg">
          Create your salon website in under 5 minutes.
        </p>

        <button className="mt-8 bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:scale-105 transition">
          ✨ Create Website
        </button>

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-6">
          Choose Your Template
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {templates.map((template) => (

            <div
              key={template.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
            >

              <div
                className={`h-40 bg-gradient-to-br ${template.color} flex items-center justify-center text-6xl`}
              >
                {template.emoji}
              </div>

              <div className="p-5">

                <h3 className="font-bold text-xl">
                  {template.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {template.description}
                </p>

<button
  onClick={() => setShowPreview(true)}
  className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
>
  Preview
</button>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
