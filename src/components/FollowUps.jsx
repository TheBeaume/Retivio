import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Phone,
  Scissors,
  User,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const PAGE_SIZE = 6;

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("Pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFollowUps();
  }, []);

  async function loadFollowUps() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("user_id", user.id)
      .order("followup_date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setFollowUps(data || []);
    }

    setLoading(false);
  }

  async function markAsDone(id) {
    const { error } = await supabase
      .from("follow_ups")
      .update({ status: "Done" })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadFollowUps();
  }

  const filteredFollowUps = useMemo(() => {
    if (filter === "All") return followUps;

    return followUps.filter(
      (item) => item.status === filter
    );
  }, [followUps, filter]);

  const pages = Math.max(
    1,
    Math.ceil(filteredFollowUps.length / PAGE_SIZE)
  );

  const visibleFollowUps = filteredFollowUps.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function changeFilter(value) {
    setFilter(value);
    setPage(1);
  }

  function getStatus(item) {
    if (item.status === "Done") {
      return {
        label: "Done",
        className: "bg-gray-100 text-gray-700",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const followDate = new Date(
      `${item.followup_date}T00:00:00`
    );

    if (followDate < today) {
      return {
        label: "Overdue",
        className: "bg-red-100 text-red-700",
      };
    }

    if (followDate.getTime() === today.getTime()) {
      return {
        label: "Due Today",
        className: "bg-amber-100 text-amber-700",
      };
    }

    return {
      label: "Upcoming",
      className: "bg-green-100 text-green-700",
    };
  }

  function openWhatsApp(item) {
    const phone = String(item.phone || "").replace(/\D/g, "");

    const message = `Hi ${item.customer_name}

It's time for your next ${item.service}.

Book your appointment today.

- Team Retivio`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
          Customer Retention
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Follow-ups
        </h1>

        <p className="text-gray-500 mt-2">
          Review upcoming customer follow-ups and complete actions.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Follow-up Queue
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredFollowUps.length} records
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {["Pending", "Done", "All"].map((item) => (
              <button
                key={item}
                onClick={() => changeFilter(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 py-10 text-center">
            Loading follow-ups...
          </p>
        ) : visibleFollowUps.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-2xl py-12 text-center mt-5">
            <CheckCircle2
              size={30}
              className="mx-auto text-gray-400"
            />

            <p className="font-medium text-gray-700 mt-3">
              No follow-ups found
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Follow-up records will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
            {visibleFollowUps.map((item) => {
              const status = getStatus(item);

              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <User size={19} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.customer_name}
                        </h3>

                        <p className="text-sm text-gray-500 truncate">
                          {item.phone}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`${status.className} px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="space-y-2.5 mt-5">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Scissors
                        size={17}
                        className="text-gray-400"
                      />
                      <span className="truncate">
                        {item.service || "Service not specified"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CalendarDays
                        size={17}
                        className="text-gray-400"
                      />
                      <span>{item.followup_date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openWhatsApp(item)}
                      className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg py-2.5 text-xs font-medium text-gray-700"
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </button>

                    <button
                      onClick={() =>
                        window.open(`tel:${item.phone}`)
                      }
                      className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg py-2.5 text-xs font-medium text-gray-700"
                    >
                      <Phone size={15} />
                      Call
                    </button>

                    <button
                      onClick={() => markAsDone(item.id)}
                      disabled={item.status === "Done"}
                      className="flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg py-2.5 text-xs font-medium"
                    >
                      <CheckCircle2 size={15} />
                      {item.status === "Done" ? "Done" : "Complete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              disabled={page === 1}
              className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {page} of {pages}
            </span>

            <button
              onClick={() =>
                setPage((current) =>
                  Math.min(pages, current + 1)
                )
              }
              disabled={page === pages}
              className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
