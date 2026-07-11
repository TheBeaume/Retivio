import React from "react";
import { supabase } from "../lib/supabase";
import PraviOutreach from "../components/PraviOutreach";
import PraviSalesPipeline from "../components/PraviSalesPipeline";
import PraviProducts from "../components/PraviProducts";
import {
  LayoutDashboard,
  BarChart3,
  Search,
  MessageSquare,
  Target,
  Package,
  Settings,
Menu,
X,
} from "lucide-react";

const CustomerFinder = React.lazy(() =>
  import("../components/customerFinder")
);

const PraviSettings = React.lazy(() =>
  import("../components/PraviSettings")
);

const menuItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Lead Finder", icon: Search },
  { label: "Outreach", icon: MessageSquare },
  { label: "Sales Pipeline", icon: Target },
  { label: "Products", icon: Package },
  { label: "Settings", icon: Settings },
];

function CommandCenter() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
const [activePage, setActivePage] = React.useState("Overview");  
const [analyticsData, setAnalyticsData] = React.useState(null);
const [analyticsLoading, setAnalyticsLoading] = React.useState(false);
const [analyticsError, setAnalyticsError] = React.useState("");
const [analyticsRange, setAnalyticsRange] = React.useState("30");
const [commandLeads, setCommandLeads] = React.useState([]);
React.useEffect(() => {
  const loadCommandLeads = async () => {
    const { data, error } = await supabase
      .from("pravi_leads")
      .select("*")
      .eq("archived", false);

    if (error) {
      console.error("Overview leads error:", error);
      setCommandLeads([]);
      return;
    }

    setCommandLeads(data || []);
  };

  loadCommandLeads();

  window.addEventListener(
    "pravi-leads-updated",
    loadCommandLeads
  );

  return () =>
    window.removeEventListener(
      "pravi-leads-updated",
      loadCommandLeads
    );
}, []);

const totalCommandLeads = commandLeads.length;

const contactedCommandLeads = commandLeads.filter(
  (lead) => lead.status === "Contacted"
).length;

const interestedCommandLeads = commandLeads.filter(
  (lead) => lead.status === "Interested"
).length;

const convertedCommandLeads = commandLeads.filter(
  (lead) => lead.status === "Converted"
).length;

const getCommandFollowUpStatus = (dateValue) => {
  if (!dateValue) return "none";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(`${dateValue}T00:00:00`);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) return "today";
  if (date < today) return "overdue";

  return "upcoming";
};

const todayCommandFollowUps = commandLeads.filter(
  (lead) =>
    getCommandFollowUpStatus(lead.follow_up_date) === "today"
).length;

const overdueCommandFollowUps = commandLeads.filter(
  (lead) =>
    getCommandFollowUpStatus(lead.follow_up_date) === "overdue"
).length;

async function loadAnalytics(range = analyticsRange) {
  setAnalyticsLoading(true);
  setAnalyticsError("");
  setAnalyticsData(null);

  let result = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    result = await supabase.functions.invoke(
      "ga4-analytics-trend",
      {
        body: {
          days: Number(range),
        },
      }
    );

    if (!result.error) {
      break;
    }

    console.warn(`GA4 attempt ${attempt} failed`, result.error);

    if (attempt < 3) {
      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 1500)
      );
    }
  }

  if (result?.error) {
    console.error("GA4 Analytics Error:", result.error);
    setAnalyticsData(null);
    setAnalyticsError(
      result.error.message || "Failed to load analytics."
    );
    setAnalyticsLoading(false);
    return;
  }

  setAnalyticsData(result.data);
  setAnalyticsError("");
  setAnalyticsLoading(false);
}

const overviewMetrics =
  analyticsData?.overview?.rows?.[0]?.metricValues || [];

const activeUsers = overviewMetrics[0]?.value || "0";
const newUsers = overviewMetrics[1]?.value || "0";
const sessions = overviewMetrics[2]?.value || "0";
const pageViews = overviewMetrics[3]?.value || "0";

const topPages = analyticsData?.topPages?.rows || [];
const trafficSources = analyticsData?.trafficSources?.rows || [];
const dailyTrend = analyticsData?.dailyTrend?.rows || [];

const trendData = dailyTrend.map((row) => ({
  date: row.dimensionValues?.[0]?.value || "",
  users: Number(row.metricValues?.[0]?.value) || 0,
  sessions: Number(row.metricValues?.[1]?.value) || 0,
}));

const maxTrendSessions = Math.max(
  ...trendData.map((item) => item.sessions),
  1
);

const totalPageViews = Number(pageViews) || 0;

const homePageViews =
  Number(topPages?.[0]?.metricValues?.[0]?.value) || 0;

const homePageShare = totalPageViews
  ? ((homePageViews / totalPageViews) * 100).toFixed(1)
  : "0";

const organicSessions =
  Number(
    trafficSources.find(
      (row) =>
        row.dimensionValues?.[0]?.value === "Organic Search"
    )?.metricValues?.[0]?.value
  ) || 0;

const organicShare = Number(sessions)
  ? ((organicSessions / Number(sessions)) * 100).toFixed(1)
  : "0";

return (
    <div className="min-h-screen bg-gray-950 text-white flex">
<aside
  className={`fixed md:static inset-y-0 left-0 z-50 w-72 min-h-screen bg-gray-950 border-r border-white/10 p-6 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  }`}
>
<button
  onClick={() => setSidebarOpen(false)}
  className="md:hidden absolute top-5 right-5 text-gray-400 hover:text-white"
>
  <X size={24} />
</button> 
       <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400">
            Pravi Technology
          </p>

          <h1 className="text-2xl font-bold mt-2">
            Command Center
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
onClick={() => {
  setActivePage(item.label);
  setSidebarOpen(false);

  if (item.label === "Analytics") {
    loadAnalytics();
  }
}}
className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
activePage === item.label
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

<main className="flex-1 min-w-0 p-5 md:p-8">
<React.Suspense
  fallback={
    <p className="text-gray-400">
      Loading Command Center...
    </p>
  }
>
<div className="md:hidden flex items-center justify-between mb-8">
  <div>
    <p className="text-xs uppercase tracking-[0.25em] text-purple-400">
      Pravi Technology
    </p>

    <h1 className="text-lg font-bold mt-1">
      Command Center
    </h1>
  </div>

  <button
    onClick={() => setSidebarOpen(true)}
    className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-gray-900"
  >
    <Menu size={22} />
  </button>
</div>
{activePage === "Settings" && (
  <PraviSettings />
)}

{activePage === "Products" && (
  <PraviProducts />
)}

{activePage === "Sales Pipeline" && (
  <PraviSalesPipeline />
)}

{activePage === "Outreach" && (
  <PraviOutreach />
)}

{activePage === "Lead Finder" && (
  <div>
    <p className="text-sm text-purple-400 mb-2">
      PRAVI LEAD FINDER
    </p>

    <CustomerFinder />
  </div>
)}

{activePage === "Analytics" && (
  <div>
    <p className="text-sm text-purple-400">
      PRAVI ANALYTICS
    </p>

    <h2 className="text-3xl md:text-4xl font-bold mt-2">
      Analytics Center
    </h2>

    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2">
      <p className="text-gray-400">
        Retivio website performance for the last {analyticsRange} days.
      </p>

      <div className="flex gap-2">
        {["7", "30", "90"].map((range) => (
          <button
            key={range}
            onClick={() => {
              setAnalyticsRange(range);
              setTimeout(() => loadAnalytics(range), 0);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              analyticsRange === range
                ? "bg-purple-600 text-white"
                : "bg-gray-900 border border-white/10 text-gray-400"
            }`}
          >
            {range}D
          </button>
        ))}
      </div>
    </div>

    {analyticsLoading && (
      <p className="text-gray-400 mt-6">
        Loading GA4 analytics...
      </p>
    )}

    {analyticsError && (
      <div className="mt-6 bg-red-950 border border-red-500/30 rounded-2xl p-5 text-red-300">
        {analyticsError}
      </div>
    )}

    {analyticsData && (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            ["Active Users", activeUsers],
            ["New Users", newUsers],
            ["Sessions", sessions],
            ["Page Views", pageViews],
          ].map(([label, value]) => (
            <div key={label} className="bg-gray-900 border border-white/10 rounded-2xl p-5">
              <p className="text-sm text-gray-400">{label}</p>
              <h3 className="text-3xl font-bold mt-3">{value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 mt-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold">Traffic Trend</h3>
            <p className="text-sm text-gray-400 mt-1">
              Daily sessions for the last {analyticsRange} days
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <div
              className="h-72 flex items-end gap-2"
              style={{
                minWidth:
                  analyticsRange === "90"
                    ? "1400px"
                    : analyticsRange === "30"
                    ? "700px"
                    : "100%",
              }}
            >
              {trendData.map((item, index) => {
                const formattedDate = item.date
                  ? `${item.date.slice(6, 8)}/${item.date.slice(4, 6)}`
                  : "";

                const showDate =
                  analyticsRange === "7" ||
                  (analyticsRange === "30" && index % 3 === 0) ||
                  (analyticsRange === "90" && index % 7 === 0);

                return (
                  <div
                    key={index}
                    className="flex-1 h-full flex flex-col justify-end items-center group relative min-w-[8px]"
                  >
                    <div className="text-[10px] text-gray-400 mb-1 opacity-0 group-hover:opacity-100">
                      {item.sessions}
                    </div>

                    <div
                      className="w-full bg-purple-600 rounded-t-md min-h-[3px] transition hover:bg-purple-500"
                      style={{
                        height: `${(item.sessions / maxTrendSessions) * 85}%`,
                      }}
                    />

                    <div className="h-6 mt-2 text-[10px] text-gray-500 whitespace-nowrap">
                      {showDate ? formattedDate : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            Growth Insights
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-5">
              <p className="text-purple-300 text-sm">
                TOP PERFORMANCE
              </p>

              <h3 className="text-xl font-bold mt-3">
                Homepage drives {homePageShare}% of page views
              </h3>

              <p className="text-gray-400 mt-2">
                Your homepage is currently the strongest traffic page.
              </p>
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
              <p className="text-purple-300 text-sm">
                ORGANIC DISCOVERY
              </p>

              <h3 className="text-xl font-bold mt-3">
                {organicShare}% of sessions come from Google
              </h3>

              <p className="text-gray-400 mt-2">
                Organic Search generated {organicSessions} sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
            <h3 className="text-xl font-bold mb-5">Top Pages</h3>

            <div className="space-y-4">
              {topPages.slice(0, 7).map((row, index) => (
                <div key={index} className="flex justify-between gap-4">
                  <p className="text-gray-300 truncate">
                    {row.dimensionValues?.[0]?.value}
                  </p>
                  <span className="font-semibold">
                    {row.metricValues?.[0]?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
            <h3 className="text-xl font-bold mb-5">Traffic Sources</h3>

            <div className="space-y-4">
              {trafficSources.map((row, index) => {
                const sourceSessions =
                  Number(row.metricValues?.[0]?.value) || 0;

                const sourceShare = Number(sessions)
                  ? ((sourceSessions / Number(sessions)) * 100).toFixed(1)
                  : "0";

                return (
                  <div key={index}>
                    <div className="flex justify-between gap-4 mb-2">
                      <p className="text-gray-300">
                        {row.dimensionValues?.[0]?.value}
                      </p>

                      <span className="font-semibold">
                        {sourceSessions} · {sourceShare}%
                      </span>
                    </div>

                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${sourceShare}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )}
  </div>
)}

{activePage === "Overview" && (
      <div>
        <p className="text-sm text-purple-400">
          PRAVI COMMAND CENTER
        </p>

        <h2 className="text-4xl font-bold mt-2">
          Business Overview
        </h2>

        <p className="text-gray-400 mt-2">
          Monitor products, growth, leads and sales from one place.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-10">
          {[
            ["Total Leads", totalCommandLeads],
            ["Contacted", contactedCommandLeads],
            ["Interested", interestedCommandLeads],
            ["Conversions", convertedCommandLeads],
            ["Follow Up Today", todayCommandFollowUps],
            ["Overdue", overdueCommandFollowUps],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-400">{label}</p>
              <h3 className="text-4xl font-bold mt-3">{value}</h3>
            </div>
          ))}
        </div>
      </div>
)}
</React.Suspense>
      </main>
    </div>
  );
}

export default CommandCenter;
