import React from "react";
import { Search, CalendarClock, Archive, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";

const stages = [
  "New",
  "Contacted",
  "Interested",
  "Converted",
  "Lost",
];

const products = [
  "Unassigned",
  "AURELIA",
  "Retivio",
];

function PraviSalesPipeline() {
  const [leads, setLeads] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [productFilter, setProductFilter] = React.useState("All");
  const [stageFilter, setStageFilter] = React.useState("All");
  const [followUpFilter, setFollowUpFilter] = React.useState("All");

  const loadLeads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("pravi_leads")
      .select("*")
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load leads error:", error);
      setLeads([]);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    loadLeads();
  }, []);

  const updateLead = async (id, changes) => {
    const databaseChanges = {};

    if ("product" in changes) {
      databaseChanges.product = changes.product;
    }

    if ("status" in changes) {
      databaseChanges.status = changes.status;
    }

    if ("followUpDate" in changes) {
      databaseChanges.follow_up_date =
        changes.followUpDate || null;
    }

    const { error } = await supabase
      .from("pravi_leads")
      .update(databaseChanges)
      .eq("id", id);

    if (error) {
      console.error("Update lead error:", error);
      alert("Unable to update lead.");
      return;
    }

    await loadLeads();

    window.dispatchEvent(
      new Event("pravi-leads-updated")
    );
  };

  const archiveLead = async (id) => {
    const { error } = await supabase
      .from("pravi_leads")
      .update({ archived: true })
      .eq("id", id);

    if (error) {
      alert("Unable to archive lead.");
      return;
    }

    await loadLeads();
    window.dispatchEvent(new Event("pravi-leads-updated"));
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Permanently delete this lead?")) {
      return;
    }

    const { error } = await supabase
      .from("pravi_leads")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Unable to delete lead.");
      return;
    }

    await loadLeads();
    window.dispatchEvent(new Event("pravi-leads-updated"));
  };

  const getDateStatus = (followUpDate) => {
    if (!followUpDate) return "none";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(`${followUpDate}T00:00:00`);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return "today";
    if (date < today) return "overdue";

    return "upcoming";
  };

  const filteredLeads = leads.filter((lead) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      (lead.name || "").toLowerCase().includes(query) ||
      (lead.phone || "").includes(search) ||
      (lead.email || "").toLowerCase().includes(query) ||
      (lead.product || "").toLowerCase().includes(query);

    const matchesProduct =
      productFilter === "All" ||
      (lead.product || "Unassigned") === productFilter;

    const matchesStage =
      stageFilter === "All" ||
      (lead.status || "New") === stageFilter;

    const dateStatus = getDateStatus(
      lead.follow_up_date
    );

    const matchesFollowUp =
      followUpFilter === "All" ||
      dateStatus === followUpFilter;

    return (
      matchesSearch &&
      matchesProduct &&
      matchesStage &&
      matchesFollowUp
    );
  });

  const todayFollowUps = leads.filter(
    (lead) =>
      getDateStatus(lead.follow_up_date) === "today"
  ).length;

  const overdueFollowUps = leads.filter(
    (lead) =>
      getDateStatus(lead.follow_up_date) === "overdue"
  ).length;

  return (
    <div>
      <p className="text-sm text-purple-400">
        PRAVI SALES
      </p>

      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Sales Pipeline
      </h2>

      <p className="text-gray-400 mt-2">
        Track leads, products, stages and follow-ups.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
        {stages.map((stage) => (
          <div
            key={stage}
            className="bg-gray-900 border border-white/10 rounded-2xl p-4"
          >
            <p className="text-sm text-gray-400">
              {stage}
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {
                leads.filter(
                  (lead) =>
                    (lead.status || "New") === stage
                ).length
              }
            </h3>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <button
          onClick={() => setFollowUpFilter("today")}
          className="bg-gray-900 border border-white/10 rounded-2xl p-4 text-left"
        >
          <p className="text-sm text-gray-400">
            Follow Up Today
          </p>
          <p className="text-2xl font-bold mt-2">
            {todayFollowUps}
          </p>
        </button>

        <button
          onClick={() => setFollowUpFilter("overdue")}
          className="bg-gray-900 border border-white/10 rounded-2xl p-4 text-left"
        >
          <p className="text-sm text-gray-400">
            Overdue Follow-ups
          </p>
          <p className="text-2xl font-bold mt-2">
            {overdueFollowUps}
          </p>
        </button>
      </div>

      <div className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-xl px-4 mt-6 focus-within:border-purple-500">
        <Search size={18} className="text-gray-500" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search business, phone, email or product"
          className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3"
        >
          <option value="All">All Products</option>
          <option value="AURELIA">AURELIA</option>
          <option value="Retivio">Retivio</option>
          <option value="Unassigned">Unassigned</option>
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3"
        >
          <option value="All">All Stages</option>

          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>

        <select
          value={followUpFilter}
          onChange={(e) => setFollowUpFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3"
        >
          <option value="All">All Follow-ups</option>
          <option value="today">Today</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Upcoming</option>
          <option value="none">No Follow-up</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Showing {filteredLeads.length} of {leads.length} leads
      </p>

      {loading && (
        <p className="text-gray-400 mt-6">
          Loading leads...
        </p>
      )}

      <div className="space-y-3 mt-5">
        {!loading &&
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-gray-900 border border-white/10 rounded-2xl p-5"
            >
              <div className="grid lg:grid-cols-[1fr_auto] gap-5">
                <div>
                  <h3 className="font-bold text-lg">
                    {lead.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {lead.category || "Business"}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {lead.phone ||
                      lead.email ||
                      "No contact information"}
                  </p>

                  {lead.follow_up_date && (
                    <p className="text-sm text-purple-400 mt-3 flex items-center gap-2">
                      <CalendarClock size={16} />
                      Follow up: {lead.follow_up_date}
                    </p>
                  )}

                  {lead.last_contacted_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last contacted:{" "}
                      {new Date(
                        lead.last_contacted_at
                      ).toLocaleString()}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => archiveLead(lead.id)}
                      className="border border-white/10 text-gray-300 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                    >
                      <Archive size={15} />
                      Archive
                    </button>

                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="border border-white/10 text-gray-400 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <select
                    value={lead.product || "Unassigned"}
                    onChange={(e) =>
                      updateLead(lead.id, {
                        product: e.target.value,
                      })
                    }
                    className="bg-gray-950 border border-white/10 text-white rounded-xl px-4 py-3"
                  >
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>

                  <select
                    value={lead.status || "New"}
                    onChange={(e) =>
                      updateLead(lead.id, {
                        status: e.target.value,
                      })
                    }
                    className="bg-gray-950 border border-white/10 text-white rounded-xl px-4 py-3"
                  >
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    value={lead.follow_up_date || ""}
                    onChange={(e) =>
                      updateLead(lead.id, {
                        followUpDate: e.target.value,
                      })
                    }
                    className="bg-gray-950 border border-white/10 text-white rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>
          ))}

        {!loading && filteredLeads.length === 0 && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
            No leads found.
          </div>
        )}
      </div>
    </div>
  );
}

export default PraviSalesPipeline;
