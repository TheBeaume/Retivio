import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useTodayAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadTodayAppointments();
  }, []);

  async function loadTodayAppointments() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .eq("appointment_date", today)
      .order("appointment_time");

    setAppointments(data || []);
  }

  return appointments;
}
