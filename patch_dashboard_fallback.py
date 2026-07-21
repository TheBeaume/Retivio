from pathlib import Path

p = Path("src/hooks/useDashboardStats.js")
t = p.read_text()

old = """    const financialStats =
      await getDashboardFinancialStats(user.id);

    const todayRevenue =
      financialStats.todayRevenue;
"""

new = """    let todayRevenue = 0;

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
"""

if old not in t:
    print("❌ Expected block not found.")
else:
    t = t.replace(old, new)
    p.write_text(t)
    print("✅ Dashboard fallback added.")
