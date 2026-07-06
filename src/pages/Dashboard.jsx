import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CustomerTable from "../components/CustomerTable";
import AnalyticsSummary from "../components/AnalyticsSummary";
import NewCustomerForm from "../components/NewCustomerForm";
import VisitEntry from "../components/VisitEntry";
import SearchBar from "../components/SearchBar";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import GrowthSnapshot from "../components/GrowthSnapshot";
import TopCustomers from "../components/TopCustomers";
import CampaignBuilder from "../components/CampaignBuilder";
import FollowUps from "../components/FollowUps";
import Settings from "../components/Settings";
import RetivioSites from "../components/RetivioSites";
import Reports from "../components/Reports";
import WhatsAppDashboard from "../components/whatsapp/WhatsAppDashboard";
import Appointments from "../components/Appointments";
import Services from "../components/Services";
import FeedbackCard from "../components/FeedbackCard";
import ProfileSetupCard from "../components/ProfileSetupCard";
import { supabase } from "../lib/supabase";
import useDashboardStats from "../hooks/useDashboardStats";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
const stats = useDashboardStats();
const settings = useBusinessSettings();

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const fetchCustomers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", user.id);

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
    fetchProfile();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";

    return "Good Night";
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
            {activePage === "dashboard" && (
              <>

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 rounded-3xl text-white p-5 md:p-7 shadow-xl">

                  <p className="text-purple-100 text-sm">
                    {today}
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold mt-2">
                    {greeting()}
                    {profile?.owner_name
                      ? `, ${profile.owner_name}`
                      : ""} 👋
                  </h1>

                  <p className="text-purple-100 mt-2">
                    Welcome back to{" "}
                    <span className="font-semibold">
                      {profile?.salon_name || "Your Salon"}
                    </span>
                  </p>

                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-5 mt-6">

                  <div className="flex items-center justify-between mb-5">

                    <h2 className="text-xl font-bold">
                      Today's Business
                    </h2>

                    <span className="text-sm text-purple-600 font-medium">
Today's Snapshot
                    </span>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-blue-50 rounded-xl border p-4">
                      <p className="text-sm text-gray-500">
                        Appointments
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
{stats.todayAppointments}
                      </h3>
                    </div>

                    <div className="bg-green-50 rounded-xl border p-4">
                      <p className="text-sm text-gray-500">
                        Revenue
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
{formatCurrency(
  stats.todayRevenue,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
                      </h3>
                    </div>

                    <div className="bg-yellow-50 rounded-xl border p-4">
                      <p className="text-sm text-gray-500">
                        Follow-ups
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
{stats.pendingAppointments}
                      </h3>
                    </div>

                    <div className="bg-purple-50 rounded-xl border p-4">
                      <p className="text-sm text-gray-500">
                        New Customers
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
                        --
                      </h3>
                    </div>

                  </div>

                </div>

                <ProfileSetupCard
                  profile={profile}
                  setActivePage={setActivePage}
                />

                <AnalyticsSummary customers={customers} />

                <FeedbackCard />

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

            {activePage === "followups" && (
              <FollowUps />
            )}

            {activePage === "campaigns" && (
              <CampaignBuilder
                customers={customers}
              />
            )}

            {activePage === "sites" && (
              <RetivioSites />
            )}

            {activePage === "reports" && (
              <Reports />
            )}

            {activePage === "appointments" && (
              <Appointments />
            )}

            {activePage === "services" && (
              <Services />
            )}

            {activePage === "whatsapp" && (
              <WhatsAppDashboard />
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
