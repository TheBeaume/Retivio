import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

export default function Reports() {
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = useBusinessSettings();

  useEffect(() => {
    loadReportData();
  }, []);

  async function loadReportData() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const [customerResult, appointmentResult] =
        await Promise.all([
          supabase
            .from("customers")
            .select("*")
            .eq("user_id", user.id),

          supabase
            .from("appointments")
            .select("*")
            .eq("user_id", user.id)
            .order("appointment_date", {
              ascending: false,
            }),
        ]);

      if (customerResult.error) {
        throw customerResult.error;
      }

      if (appointmentResult.error) {
        throw appointmentResult.error;
      }

      setCustomers(customerResult.data || []);
      setAppointments(appointmentResult.data || []);
    } catch (error) {
      console.error("Report load error:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = customers.reduce(
    (sum, customer) =>
      sum + (Number(customer.total_spend) || 0),
    0
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Cancelled"
  );

  const today = new Date().toLocaleDateString("en-CA");

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.appointment_date === today
  );

  const currency = (value) =>
    formatCurrency(
      value,
      settings?.currency_symbol,
      settings?.currency_position,
      settings?.decimal_places
    );

  const pdfCurrency = (value) => {
    const amount = Number(value || 0).toFixed(
      Number(settings?.decimal_places ?? 2)
    );

    return `${settings?.currency || "INR"} ${amount}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const businessName =
      settings?.business_name || "Your Salon";

    const generatedDate = new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(businessName, 14, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    let contactY = 25;

    if (settings?.address) {
      doc.text(String(settings.address), 14, contactY);
      contactY += 5;
    }

    if (settings?.email) {
      doc.text(`Email: ${settings.email}`, 14, contactY);
      contactY += 5;
    }

    if (settings?.whatsapp) {
      doc.text(
        `Contact: ${settings.whatsapp}`,
        14,
        contactY
      );
    }

    doc.setDrawColor(210);
    doc.line(14, 43, 196, 43);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Business Performance Report", 14, 54);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Generated: ${generatedDate}`, 14, 61);

    autoTable(doc, {
      startY: 69,
      head: [["Business Metric", "Value"]],
      body: [
        ["Total Revenue", pdfCurrency(totalRevenue)],
        ["Total Customers", String(customers.length)],
        [
          "Total Appointments",
          String(appointments.length),
        ],
        [
          "Completed Appointments",
          String(completedAppointments.length),
        ],
        [
          "Cancelled Appointments",
          String(cancelledAppointments.length),
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [91, 33, 182],
      },
    });

    const summaryY = doc.lastAutoTable.finalY;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Appointment Details", 14, summaryY + 12);

    autoTable(doc, {
      startY: summaryY + 17,
      head: [
        [
          "Date",
          "Customer",
          "Service",
          "Status",
          "Amount",
        ],
      ],
      body: appointments.map((appointment) => [
        appointment.appointment_date || "-",
        appointment.customer_name || "-",
        appointment.service || "-",
        appointment.status || "-",
        pdfCurrency(appointment.price),
      ]),
      theme: "striped",
      headStyles: {
        fillColor: [55, 65, 81],
      },
      styles: {
        fontSize: 8,
      },
    });

    let finalY = doc.lastAutoTable.finalY + 18;

    if (finalY > 250) {
      doc.addPage();
      finalY = 30;
    }

    const signature =
      settings?.signature || "Authorized Signatory";

    const signatureLines = doc.splitTextToSize(
      signature,
      60
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(signatureLines, 135, finalY);

    const signatureBottom =
      finalY + signatureLines.length * 5 + 3;

    doc.line(135, signatureBottom, 195, signatureBottom);

    doc.setFontSize(8);
    doc.text(
      "Authorized Signature",
      135,
      signatureBottom + 6
    );

    const pageCount = doc.getNumberOfPages();

    for (let page = 1; page <= pageCount; page += 1) {
      doc.setPage(page);
      doc.setFontSize(8);
      doc.setTextColor(120);

      doc.text("Generated by Retivio", 14, 290);

      doc.text(
        `Page ${page} of ${pageCount}`,
        175,
        290
      );
    }

    doc.save(
      `${businessName
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase()}-business-report.pdf`
    );
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading business report...
      </div>
    );
  }

  const cards = [
    ["Total Revenue", currency(totalRevenue)],
    ["Total Customers", customers.length],
    ["Total Appointments", appointments.length],
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-purple-600">
            BUSINESS ANALYTICS
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Business Reports
          </h1>

          <p className="text-gray-500 mt-2">
            Review performance and export your branded
            business report.
          </p>
        </div>

        <button
          onClick={generatePDF}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Download PDF Report
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <p className="text-sm text-gray-500">
              {label}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              {value}
            </h2>
          </div>
        ))}
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Appointment Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Current appointment performance overview.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            [
              "Today's Appointments",
              todayAppointments.length,
            ],
            ["Completed", completedAppointments.length],
            ["Cancelled", cancelledAppointments.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border border-gray-200 rounded-xl p-5"
            >
              <p className="text-sm text-gray-500">
                {label}
              </p>

              <p className="text-2xl font-bold text-gray-900 mt-2">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Appointment Report
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Detailed appointment activity included in the
            PDF report.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                {[
                  "Date",
                  "Customer",
                  "Service",
                  "Status",
                  "Amount",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 font-medium"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {appointment.appointment_date}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {appointment.customer_name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {appointment.service}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {appointment.status}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-900">
                    {currency(appointment.price)}
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No appointment data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
