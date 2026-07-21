import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getDashboardFinancialStats } from "../services/financialService";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    todayRevenue: 0,
    pendingAppointments: 0,
    newCustomers: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { data: appointments } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id);

    const { data: customers } = await supabase
      .from("customers")
      .select("created_at")
      .eq("user_id", user.id);

    const newCustomers =
      customers?.filter(
        (c) => c.created_at?.slice(0, 10) === today
      ).length || 0;

    const todayAppointments =
      appointments?.filter(
        (a) => a.appointment_date === today
      ) || [];

    let todayRevenue = 0;

    try {
      const financialStats =
        await getDashboardFinancialStats(user.id);

      todayRevenue =
        Number(financialStats.todayRevenue || 0);

    } catch (error) {
      console.error("Financial service failed:", error);

      // Temporary fallback until migration completes
      todayRevenue = todayAppointments.reduce(
        (sum, a) => sum + Number(a.price || 0),
        0
      );
    }

    const pendingAppointments =
      appointments?.filter(
        (a) => a.status === "Pending"
      ).length || 0;

    setStats({
      todayAppointments: todayAppointments.length,
      todayRevenue,
      pendingAppointments,
      newCustomers,
    });
  }

  return stats;
}
