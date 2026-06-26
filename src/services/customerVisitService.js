import { supabase } from "../lib/supabase";

export async function getCustomerVisits(customerId) {
  const { data, error } = await supabase
    .from("customer_visits")
    .select("*")
    .eq("customer_id", customerId)
    .order("visit_date", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function addCustomerVisit(visit) {
  const { data, error } = await supabase
    .from("customer_visits")
    .insert(visit)
    .select()
    .single();

  if (error) throw error;

  return data;
}
