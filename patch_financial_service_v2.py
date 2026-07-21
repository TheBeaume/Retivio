from pathlib import Path

p = Path("src/services/financialService.js")
text = p.read_text()

if "getDashboardFinancialStats" in text:
    print("Already patched.")
    raise SystemExit

text += """

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
"""

p.write_text(text)

print("✅ Financial Service Patch 2 applied.")
