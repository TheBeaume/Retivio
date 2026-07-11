import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import ServiceForm from "./services/ServiceForm";
import ServiceTable from "./services/ServiceTable";
import DeleteServiceModal from "./services/DeleteServiceModal";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";
export default function Services() {
const settings = useBusinessSettings();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingService, setEditingService] = useState(null);

  const [deleteService, setDeleteService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  }

  async function deleteCurrentService() {
    if (!deleteService) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", deleteService.id);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleteService(null);

    loadServices();
  }

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const keyword = search.toLowerCase();

      return (
        service.name?.toLowerCase().includes(keyword) ||
        service.category?.toLowerCase().includes(keyword)
      );
    });
  }, [services, search]);

  const totalServices = services.length;

  const activeServices = services.filter(
    (s) => s.is_active
  ).length;

  const averagePrice =
    totalServices === 0
      ? 0
      : Math.round(
          services.reduce(
            (sum, s) => sum + Number(s.price || 0),
            0
          ) / totalServices
        );

  const averageDuration =
    totalServices === 0
      ? 0
      : Math.round(
          services.reduce(
            (sum, s) => sum + Number(s.duration || 0),
            0
          ) / totalServices
        );

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl p-8 text-white">

        <h1 className="text-4xl font-bold">
          💇 Services
        </h1>

        <p className="mt-3 text-purple-100">
          Manage salon services, pricing and duration.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Services
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalServices}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {activeServices}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Average Price
          </p>

          <h2 className="text-3xl font-bold mt-2">
{formatCurrency(
  averagePrice,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Avg Duration
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {averageDuration} min
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between">

          <input
            className="border rounded-xl px-4 py-3 w-full md:w-80"
            placeholder="🔍 Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => {
              setEditingService(null);
              setShowForm(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
          >
            ➕ Add Service
          </button>

        </div>

      </div>

      <ServiceTable
        loading={loading}
        services={filteredServices}
        onEdit={(service) => {
          setEditingService(service);
          setShowForm(true);
        }}
        onDelete={(service) => {
          setDeleteService(service);
        }}
      />

      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setShowForm(false);
            setEditingService(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditingService(null);
            loadServices();
          }}
        />
      )}

      <DeleteServiceModal
        service={deleteService}
        onCancel={() => setDeleteService(null)}
        onConfirm={deleteCurrentService}
      />

    </div>
  );
}
