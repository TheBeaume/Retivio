from pathlib import Path

p = Path("src/components/ManualBilling.jsx")
text = p.read_text()

old = """      if (paymentStatus === "Paid") {
        await supabase
          .from("customers")
"""

new = """      if (paymentStatus === "Paid") {

        if (selectedAppointment?.id) {
          await supabase
            .from("appointments")
            .update({
              status: "Completed",
              payment_status: "Paid",
            })
            .eq("id", selectedAppointment.id)
            .eq("user_id", user.id);
        }

        await supabase
          .from("customers")
"""

if old in text:
    text = text.replace(old, new)
    p.write_text(text)
    print("✅ Appointment completion patch applied.")
else:
    print("❌ Pattern not found.")
