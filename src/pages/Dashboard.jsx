import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CustomerTable from "../components/CustomerTable";
import AnalyticsSummary from "../components/AnalyticsSummary";
import ActionButtons from "../components/ActionButtons";
import NewCustomerForm from "../components/NewCustomerForm";
import VisitEntry from "../components/VisitEntry";
import SearchBar from "../components/SearchBar";
import ActionRequired from "../components/ActionRequired";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import GrowthSnapshot from "../components/GrowthSnapshot";
import TopCustomers from "../components/TopCustomers";
import CampaignPerformance from "../components/CampaignPerformance";
import RevenueTrend from "../components/RevenueTrend";
import AIRecommendations from "../components/AIRecommendations";
import { supabase } from "../lib/supabase";
import CampaignBuilder from "../components/CampaignBuilder";
import Settings from "../components/Settings";
import RetivioSites from "../components/RetivioSites";

function Dashboard() {
const [customers, setCustomers] = useState([]);  
  const [search, setSearch] = useState("");
const [sidebarOpen, setSidebarOpen] = useState(false);
const [activePage, setActivePage] = useState("dashboard");
const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

const formatted = data.map((c) => ({
  id: c.id,
  name: c.name,
  phone: c.phone,
  service: c.service,
  lastVisit: c.last_visit,
  nextDue: c.next_due,
  visits: c.visits,
  totalSpend: c.total_spend,
  loyalty: c.loyalty,
  status: c.status,
}));
  setCustomers(formatted);
};
useEffect(() => {
  fetchCustomers();
}, []);
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

return (
  <>

<div className="min-h-screen flex bg-gray-100">

{sidebarOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setSidebarOpen(false)}
    />

    <Sidebar
      setSidebarOpen={setSidebarOpen}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  </>
)}

<div className="flex-1 overflow-x-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
<div className="p-3 md:p-6">
          <h1 className="text-2xl md:text-4xl font-bold">
  Dashboard
</h1>

<p className="text-gray-500 mt-1">
  Welcome back! Here's what's happening today.
</p>

          <p className="mt-4">
            Welcome back!
          </p>

{activePage === "dashboard" && (
  <>
    <AnalyticsSummary customers={customers} />

    <RevenueTrend />

<AIRecommendations customers={customers} />

    <ActionRequired />

    <QuickActions
      setActivePage={setActivePage}
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  <RecentActivity
    customers={customers}
  />

  <TopCustomers
    customers={customers}
  />

  <GrowthSnapshot
    customers={customers}
  />

  <CampaignPerformance />

</div>
  </>
)}
  
{activePage === "customers" && (
  <>
    <SearchBar
      search={search}
      setSearch={setSearch}
    />

    <CustomerTable
      customers={filteredCustomers}
    />
  </>
)}

{activePage === "visit" && (
  <>
    <NewCustomerForm
      customers={customers}
      setCustomers={setCustomers}
    />

    <VisitEntry
      customers={customers}
      setCustomers={setCustomers}
    />
  </>
)}

{activePage === "campaigns" && <CampaignBuilder customers={customers} />}
{activePage === "sites" && (
  <RetivioSites />
)}

{activePage === "reports" && (
  <div className="bg-white p-4 rounded shadow">
   
    <p>
      Reports module coming soon...
    </p>
  </div>
)}

{activePage === "settings" && (
  <Settings />
)}
        </div>
      </div>
    </div>

</>
);
}

export default Dashboard;
