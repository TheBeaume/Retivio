import { supabase } from "../lib/supabase";

/**
 * Financial Service
 * Single source of truth for all revenue calculations.
 * Patch 1:
 * Safe to add. Existing code is untouched.
 */

export async function getTodayRevenue(userId) {
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount,payment_status,created_at")
    .eq("user_id", userId)
    .eq("payment_status", "Paid");

  if (error) throw error;

  return (data || [])
    .filter(
      (t) => t.created_at?.slice(0, 10) === today
    )
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
}

export async function getCustomerLifetimeSpend(userId, customerId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("amount,payment_status")
    .eq("user_id", userId)
    .eq("customer_id", customerId)
    .eq("payment_status", "Paid");

  if (error) throw error;

  return (data || []).reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );
}

export async function getMonthlyRevenue(userId) {
  const now = new Date();

  const month =
    String(now.getMonth() + 1).padStart(2, "0");

  const year = now.getFullYear();

  const { data, error } = await supabase
    .from("transactions")
    .select("amount,payment_status,created_at")
    .eq("user_id", userId)
    .eq("payment_status", "Paid");

  if (error) throw error;

  return (data || [])
    .filter((t) => {
      const d = new Date(t.created_at);
      return (
        d.getFullYear() === year &&
        String(d.getMonth() + 1).padStart(2, "0") === month
      );
    })
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
}

export async function getRevenueTrend(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("amount,created_at,payment_status")
    .eq("user_id", userId)
    .eq("payment_status", "Paid")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data || [];
}

export async function getTopCustomers(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      "customer_id,amount,payment_status"
    )
    .eq("user_id", userId)
    .eq("payment_status", "Paid");

  if (error) throw error;

  const totals = {};

  for (const row of data || []) {
    totals[row.customer_id] =
      (totals[row.customer_id] || 0) +
      Number(row.amount || 0);
  }

  return totals;
}


export async function getDashboardFinancialStats(userId) {

  const todayRevenue = await getTodayRevenue(userId);
  const monthlyRevenue = await getMonthlyRevenue(userId);

  const { data, error } = await supabase
    .from("transactions")
    .select("id,payment_status")
    .eq("user_id", userId);

  if (error) throw error;

  const paidTransactions =
    (data || []).filter(
      (t) => t.payment_status === "Paid"
    ).length;

  return {
    todayRevenue,
    monthlyRevenue,
    totalTransactions: (data || []).length,
    paidTransactions,
  };
}
