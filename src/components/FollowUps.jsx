import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  CalendarDays,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react";

const PAGE_SIZE = 6;

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadFollowUps();
  }, []);

  async function loadFollowUps() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("user_id", user.id)
      .order("followup_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setFollowUps(data || []);
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

  function getStatus(item) {
    if (item.status === "Done") {
      return {
        label: "Done",
        style: "bg-gray-100 text-gray-600",
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
        style: "bg-red-50 text-red-700",
      };
    }

    if (followDate.getTime() === today.getTime()) {
      return {
        label: "Due Today",
        style: "bg-amber-50 text-amber-700",
      };
    }

    return {
      label: "Upcoming",
      style: "bg-green-50 text-green-700",
    };
  }

  const totalPages = Math.max(
    1,
    Math.ceil(followUps.length / PAGE_SIZE)
  );

  const visibleFollowUps = followUps.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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
          Review due customers and manage follow-up activity.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Follow-up Queue
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {followUps.length} follow-ups
            </p>
          </div>

          <CalendarDays
            size={22}
            className="text-purple-600"
          />
        </div>

        {followUps.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-xl py-12 text-center">
            <p className="font-medium text-gray-700">
              No follow-ups available
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Customer follow-ups will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {visibleFollowUps.map((item) => {
                const status = getStatus(item);

                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.customer_name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.phone || "No phone number"}
                        </p>
                      </div>

                      <span
                        className={`${status.style} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Service
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {item.service || "Service not specified"}
                      </p>

                      <p className="text-sm text-gray-500 mt-3">
                        Follow-up date: {item.followup_date}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/91${String(
                              item.phone || ""
                            ).replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hi ${item.customer_name}

It's time for your next ${item.service}.

Book your appointment today.

- Team Retivio`
                            )}`,
                            "_blank"
                          )
                        }
                        className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 rounded-lg px-3 py-2.5 text-sm font-medium"
                      >
                        <MessageCircle size={16} />
                        Message
                      </button>

                      <button
                        onClick={() =>
                          window.open(`tel:${item.phone}`)
                        }
                        className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 rounded-lg px-3 py-2.5 text-sm font-medium"
                      >
                        <Phone size={16} />
                        Call
                      </button>

                      <button
                        onClick={() => markAsDone(item.id)}
                        disabled={item.status === "Done"}
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg px-3 py-2.5 text-sm font-medium"
                      >
                        <Check size={16} />
                        Done
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {followUps.length > PAGE_SIZE && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(
                    currentPage * PAGE_SIZE,
                    followUps.length
                  )}{" "}
                  of {followUps.length}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
