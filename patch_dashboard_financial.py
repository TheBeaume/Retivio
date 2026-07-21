from pathlib import Path

p = Path("src/hooks/useDashboardStats.js")
t = p.read_text()

# Add import
if 'getDashboardFinancialStats' not in t:
    t = t.replace(
        'import { supabase } from "../lib/supabase";',
        'import { supabase } from "../lib/supabase";\nimport { getDashboardFinancialStats } from "../services/financialService";'
    )

# Remove old todayRevenue calculation
old = """    const todayRevenue = todayAppointments.reduce(
      (sum, a) => sum + Number(a.price || 0),
      0
    );
"""

new = """    const financialStats =
      await getDashboardFinancialStats(user.id);

    const todayRevenue =
      financialStats.todayRevenue;
"""

if old in t:
    t = t.replace(old, new)
else:
    print("Old revenue block not found.")

p.write_text(t)

print("✅ Dashboard migrated to Financial Service.")
