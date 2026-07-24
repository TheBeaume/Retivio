import {
  Bell,
  CalendarCheck,
  MessageCircle,
  IndianRupee,
  Star,
} from "lucide-react";

const activities = [
  {
    time: "09:31",
    text: "Website Lead Captured",
    icon: Bell,
    color: "text-cyan-400",
  },
  {
    time: "09:32",
    text: "Appointment Booked",
    icon: CalendarCheck,
    color: "text-purple-400",
  },
  {
    time: "09:33",
    text: "WhatsApp Reminder Sent",
    icon: MessageCircle,
    color: "text-emerald-400",
  },
  {
    time: "09:34",
    text: "+₹3,250 Revenue",
    icon: IndianRupee,
    color: "text-yellow-400",
  },
  {
    time: "09:35",
    text: "5★ Review Received",
    icon: Star,
    color: "text-orange-400",
  },
];

export default function HeroActivity() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/90 p-5">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="font-bold text-white">
          Live Business Activity
        </h3>

        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          LIVE
        </span>

      </div>

      <div className="space-y-4">

        {activities.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.time}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0B1120] p-3"
            >

              <div
                className={`rounded-lg bg-white/5 p-2 ${item.color}`}
              >
                <Icon size={16} />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-white">
                  {item.text}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {item.time}
                </p>

              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
}
