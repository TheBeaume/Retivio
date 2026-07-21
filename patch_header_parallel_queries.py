from pathlib import Path

p = Path("src/components/Header.jsx")
t = p.read_text()

old = '''    const { data: todayFollowups } = await supabase
      .from("follow_ups")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .eq("followup_date", today);

    if (todayFollowups?.length) count++;

    const { data: overdue } = await supabase
      .from("follow_ups")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .lt("followup_date", today);

    if (overdue?.length) count++;

    const { data: appointments } = await supabase
      .from("appointments")
      .select("id")
      .eq("user_id", user.id)
      .eq("appointment_date", today);

    if (appointments?.length) count++;
'''

new = '''    const [
      { data: todayFollowups },
      { data: overdue },
      { data: appointments },
    ] = await Promise.all([

      supabase
        .from("follow_ups")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "Pending")
        .eq("followup_date", today),

      supabase
        .from("follow_ups")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "Pending")
        .lt("followup_date", today),

      supabase
        .from("appointments")
        .select("id")
        .eq("user_id", user.id)
        .eq("appointment_date", today),

    ]);

    if (todayFollowups?.length) count++;
    if (overdue?.length) count++;
    if (appointments?.length) count++;
'''

if old not in t:
    print("❌ Pattern not found.")
else:
    t = t.replace(old, new)
    p.write_text(t)
    print("✅ Header optimized with Promise.all().")
