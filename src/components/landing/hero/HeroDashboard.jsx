import HeroStats from "./HeroStats";
import HeroActivity from "./HeroActivity";
import { TrendingUp } from "lucide-react";

export default function HeroDashboard() {
  return (
    <div className="relative w-full">

      <div className="absolute inset-0 rounded-[32px] bg-purple-600/10 blur-3xl" />

      <div className="relative rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">

        <HeroStats />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_.9fr]">

          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-5">

            <div className="flex items-center justify-between">

              <h3 className="font-bold text-white">
                Business Performance
              </h3>

              <TrendingUp
                size={18}
                className="text-purple-400"
              />

            </div>

            <div className="mt-8 flex h-44 items-end gap-3">

              {[35,58,42,76,62,90,72].map((h,index)=>(
                <div
                  key={index}
                  className="flex h-full flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-purple-600 to-fuchsia-400 transition duration-300 hover:opacity-80"
                    style={{height:`${h}%`}}
                  />
                </div>
              ))}

            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-500">

              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>

            </div>

          </div>

          <HeroActivity />

        </div>

      </div>

    </div>
  );
}
