import React from "react";
import { supabase } from "../lib/supabase";
import {
  ExternalLink,
  Package,
  CheckCircle2,
} from "lucide-react";

const products = [
  {
    id: "retivio",
    name: "Retivio",
    type: "Salon CRM & Growth Platform",
    status: "Active",
    price: "Free Beta",
    demo: "https://retivio.com",
  },
  {
    id: "aurelia",
    name: "AURELIA",
    type: "Luxury Salon Website",
    status: "Selling",
    price: "₹2,999",
    demo: "https://aurelia-cyan.vercel.app",
  },
];

function PraviProducts() {
  const [leads, setLeads] = React.useState([]);

  React.useEffect(() => {
    const loadLeads = async () => {
      const { data, error } = await supabase
        .from("pravi_leads")
        .select("*")
        .eq("archived", false);

      if (error) {
        console.error("Products leads error:", error);
        setLeads([]);
        return;
      }

      setLeads(data || []);
    };

    loadLeads();

    window.addEventListener(
      "pravi-leads-updated",
      loadLeads
    );

    return () =>
      window.removeEventListener(
        "pravi-leads-updated",
        loadLeads
      );
  }, []);

  const getProductStats = (productName) => {
    const productLeads = leads.filter(
      (lead) =>
        (lead.product || "").toLowerCase() ===
        productName.toLowerCase()
    );

    return {
      total: productLeads.length,
      interested: productLeads.filter(
        (lead) => lead.status === "Interested"
      ).length,
      converted: productLeads.filter(
        (lead) => lead.status === "Converted"
      ).length,
    };
  };

  return (
    <div>
      <p className="text-sm text-purple-400">
        PRAVI PRODUCTS
      </p>

      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Products Center
      </h2>

      <p className="text-gray-400 mt-2">
        Track product performance and sales readiness.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {products.map((product) => {
          const stats = getProductStats(product.name);

          return (
            <div
              key={product.id}
              className="bg-gray-900 border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 bg-gray-950 border border-white/10 rounded-xl flex items-center justify-center">
                  <Package
                    size={21}
                    className="text-purple-400"
                  />
                </div>

                <span className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-950 border border-white/10 rounded-full px-3 py-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-purple-400"
                  />
                  {product.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold mt-5">
                {product.name}
              </h3>

              <p className="text-gray-400 mt-1">
                {product.type}
              </p>

              <div className="grid grid-cols-3 gap-2 mt-5">
                <div className="bg-gray-950 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-gray-500">
                    Leads
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {stats.total}
                  </p>
                </div>

                <div className="bg-gray-950 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-gray-500">
                    Interested
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {stats.interested}
                  </p>
                </div>

                <div className="bg-gray-950 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-gray-500">
                    Converted
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {stats.converted}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 mt-5 pt-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Selling Price
                </p>

                <p className="text-xl font-bold mt-2">
                  {product.price}
                </p>
              </div>

              <a
                href={product.demo}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-5 py-3 font-semibold transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Open Product
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PraviProducts;
