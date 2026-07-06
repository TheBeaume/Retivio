import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

    const today = new Date().toLocaleDateString("en-CA");

    const { data: appointments } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id);

    const todayAppointments =
      appointments?.filter(
        (a) => a.appointment_date === today
      ) || [];

    const todayRevenue = todayAppointments.reduce(
      (sum, a) => sum + Number(a.price || 0),
      0
    );

    const pendingAppointments =
      appointments?.filter(
        (a) => a.status === "Pending"
      ).length || 0;

    setStats({
      todayAppointments: todayAppointments.length,
      todayRevenue,
      pendingAppointments,
      newCustomers: 0,
    });
  }

  return stats;
}
