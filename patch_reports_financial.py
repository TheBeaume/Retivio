from pathlib import Path

p = Path("src/components/Reports.jsx")
t = p.read_text()

# Add import
if 'getMonthlyRevenue' not in t:
    t = t.replace(
        'import { supabase } from "../lib/supabase";',
        'import { supabase } from "../lib/supabase";\nimport { getMonthlyRevenue } from "../services/financialService";'
    )

# Make loadReports async use financial service
old = """  const totalRevenue = customers.reduce(
    (sum, customer) =>
      sum + (Number(customer.total_spend) || 0),
    0
  );
"""

new = """  const [totalRevenue, setTotalRevenue] = useState(0);
"""

if old in t:
    t = t.replace(old, new)

# Replace setLoading(false) block
marker = """      setLoading(false);
    }
  }
"""

replacement = """      const revenue = await getMonthlyRevenue(user.id);
      setTotalRevenue(revenue);

      setLoading(false);
    }
  }
"""

if marker in t:
    t = t.replace(marker, replacement)

p.write_text(t)
print("✅ Reports migrated to Financial Service.")
