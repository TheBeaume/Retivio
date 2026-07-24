from pathlib import Path

path = Path("src/pages/Dashboard.jsx")

text = path.read_text(encoding="utf-8")

# Remove import if present
text = text.replace(
    'import AppointmentCalendar from "../components/AppointmentCalendar";\n',
    ""
)

# Remove component usage
text = text.replace(
    "                <AppointmentCalendar appointments={todayAppointments} />\n",
    ""
)

path.write_text(text, encoding="utf-8")

print("✅ AppointmentCalendar removed from Dashboard.jsx")
