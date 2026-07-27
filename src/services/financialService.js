import { supabase } from "../lib/supabase";

/**
 * Financial Service
 * Single Source of Truth for all financial calculations.
 */

async function getPaidTransactions(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("id,amount,payment_status,created_at,customer_id")
    .eq("user_id", userId)
    .eq("payment_status", "Paid");

  if (error) throw error;

  return data || [];
}

export async function getTodayRevenue(userId) {
  const today = new Date().toISOString().slice(0, 10);

  const transactions = await getPaidTransactions(userId);

  return transactions
    .filter(
      (t) => t.created_at?.slice(0, 10) === today
    )
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
}

export async function getMonthlyRevenue(userId) {
  const now = new Date();

  const month = now.getMonth();
  const year = now.getFullYear();

  const transactions = await getPaidTransactions(userId);

  return transactions
    .filter((t) => {
      const d = new Date(t.created_at);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    })
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
}

export async function getTotalRevenue(userId) {
  const transactions = await getPaidTransactions(userId);

  return transactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );
}

export async function getCustomerLifetimeSpend(userId, customerId) {
  const transactions = await getPaidTransactions(userId);

  return transactions
    .filter((t) => t.customer_id === customerId)
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
}

export async function getRevenueTrend(userId) {
  return await getPaidTransactions(userId);
}

export async function getTopCustomers(userId) {
  const transactions = await getPaidTransactions(userId);

  const totals = {};

  for (const row of transactions) {
    totals[row.customer_id] =
      (totals[row.customer_id] || 0) +
      Number(row.amount || 0);
  }

  return totals;
}

export async function getDashboardFinancialStats(userId) {
  const transactions = await getPaidTransactions(userId);

  const today = new Date().toISOString().slice(0, 10);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const todayRevenue = transactions
    .filter(
      (t) => t.created_at?.slice(0, 10) === today
    )
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const monthlyRevenue = transactions
    .filter((t) => {
      const d = new Date(t.created_at);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    })
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const totalRevenue = transactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  return {
    todayRevenue,
    monthlyRevenue,
    totalRevenue,
    totalTransactions: transactions.length,
    paidTransactions: transactions.length,
  };
}
