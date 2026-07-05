const categories = [
  "All",
  "AI",
  "Marketing",
  "Customer Retention",
  "WhatsApp",
  "Appointments",
  "Business Growth",
  "Product Updates",
];

export default function CategoryTabs() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          className="px-5 py-2 rounded-full border border-purple-200 bg-white hover:bg-purple-600 hover:text-white transition"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
