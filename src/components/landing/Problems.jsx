import {
  UserRoundX,
  BellOff,
  Receipt,
  ChartNoAxesColumnIncreasing,
  ArrowDown,
} from "lucide-react";

const problems = [
  {
    icon: UserRoundX,
    title: "Customer history gets lost",
    text: "Important visit details and customer activity become difficult to track.",
  },
  {
    icon: BellOff,
    title: "Follow-ups are forgotten",
    text: "Customers who could return often disappear from the daily workflow.",
  },
  {
    icon: Receipt,
    title: "Billing stays disconnected",
    text: "Services, transactions and customer records live in separate places.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Decisions rely on guesswork",
    text: "Without clear business visibility, knowing what to improve gets harder.",
  },
];

export default function Problems() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            The daily challenge
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Salon growth gets harder when everything lives in different places.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Managing a growing salon should not mean switching between
            notebooks, chats, spreadsheets and disconnected tools.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                <Icon size={21} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
            <ArrowDown size={18} />
          </div>
          <p className="mt-4 text-xl font-bold text-slate-950">
            Retivio brings it together.
          </p>
        </div>
      </div>
    </section>
  );
}
