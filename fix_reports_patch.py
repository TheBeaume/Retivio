from pathlib import Path

p = Path("src/components/Reports.jsx")
t = p.read_text()

old = """    } finally {
      const revenue = await getMonthlyRevenue(user.id);
      setTotalRevenue(revenue);

      setLoading(false);
    }"""

new = """      const revenue = await getMonthlyRevenue(user.id);
      setTotalRevenue(revenue);

    } finally {
      setLoading(false);
    }"""

if old in t:
    t = t.replace(old, new)
    p.write_text(t)
    print("✅ Reports revenue patch fixed.")
else:
    print("❌ Pattern not found.")
