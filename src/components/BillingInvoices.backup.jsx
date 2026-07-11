import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function BillingInvoices() {
  const settings = useBusinessSettings();

  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem(
      "retivio_invoice_appointment"
    );

    if (!pending) return;

    try {
      const appointment = JSON.parse(pending);

      if (appointment?.phone) {
        setPhone(appointment.phone);
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("retivio_invoice_appointment");
  }, []);

  async function searchCustomer(searchPhone = phone) {
    const cleanPhone = String(searchPhone || "").trim();

    if (!cleanPhone) {
      alert("Enter customer mobile number.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: customerData, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", user.id)
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!customerData) {
      setCustomer(null);
      setAppointments([]);
      setInvoices([]);
      alert("Customer not found.");
      setLoading(false);
      return;
    }

    setCustomer(customerData);

    const { data: appointmentData } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .eq("customer_id", customerData.id)
      .order("appointment_date", { ascending: false });

    const { data: invoiceData } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", user.id)
      .eq("customer_id", customerData.id)
      .order("invoice_date", { ascending: false });

    setAppointments(appointmentData || []);
    setInvoices(invoiceData || []);
    setLoading(false);
  }

  async function generateInvoice(appointment) {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !customer) return;

      const { data: existingInvoice } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id)
        .eq("appointment_id", appointment.id)
        .maybeSingle();

      if (existingInvoice) {
        downloadInvoicePDF(existingInvoice, appointment);
        return;
      }

      const { count } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      const prefix = settings?.invoice_prefix || "INV";

      const invoiceNumber =
        `${prefix}-${String((count || 0) + 1).padStart(5, "0")}`;

      const subtotal = Number(appointment.price || 0);
      const taxPercentage = Number(settings?.tax_percentage || 0);
      const taxAmount = subtotal * taxPercentage / 100;
      const totalAmount = subtotal + taxAmount;

      const invoicePayload = {
        user_id: user.id,
        customer_id: customer.id,
        appointment_id: appointment.id,
        invoice_number: invoiceNumber,

        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email || null,

        business_name:
          settings?.business_name || "Your Business",

        business_address:
          settings?.billing_address ||
          settings?.address ||
          null,

        tax_name: settings?.tax_name || null,

        tax_registration_number:
          settings?.tax_registration_number || null,

        currency: settings?.currency || "INR",
        currency_symbol: settings?.currency_symbol || "₹",

        subtotal,
        tax_percentage: taxPercentage,
        tax_amount: taxAmount,
        discount_amount: 0,
        total_amount: totalAmount,

        payment_method: "Paid",
        payment_status: "Paid",

        invoice_date: new Date()
          .toISOString()
          .split("T")[0],

        notes: appointment.notes || null,

        footer_text:
          settings?.invoice_footer ||
          "Thank you for your business.",

        signature: settings?.signature || null,
      };

      const { data: invoice, error } = await supabase
        .from("invoices")
        .insert(invoicePayload)
        .select()
        .single();

      if (error) throw error;

      const { error: itemError } = await supabase
        .from("invoice_items")
        .insert({
          invoice_id: invoice.id,
          user_id: user.id,
          item_name: appointment.service,
          item_description: "Salon service",
          quantity: 1,
          unit_price: subtotal,
          tax_percentage: taxPercentage,
          tax_amount: taxAmount,
          line_total: totalAmount,
        });

      if (itemError) throw itemError;

      await searchCustomer(customer.phone);

      downloadInvoicePDF(invoice, appointment);
    } catch (error) {
      console.error(error);
      alert(error.message || "Invoice generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function downloadInvoicePDF(invoice, appointment) {
    const doc = new jsPDF();

    const businessName =
      invoice.business_name ||
      settings?.business_name ||
      "Your Business";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(businessName, 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    let businessY = 27;

    if (invoice.business_address) {
      doc.text(String(invoice.business_address), 14, businessY);
      businessY += 5;
    }

    if (invoice.tax_registration_number) {
      doc.text(
        `${invoice.tax_name || "Tax"} No: ${
          invoice.tax_registration_number
        }`,
        14,
        businessY
      );
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("INVOICE", 196, 20, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Invoice No: ${invoice.invoice_number}`,
      196,
      29,
      { align: "right" }
    );

    doc.text(
      `Invoice Date: ${invoice.invoice_date}`,
      196,
      35,
      { align: "right" }
    );

    doc.setDrawColor(220);
    doc.line(14, 45, 196, 45);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("BILL TO", 14, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(String(invoice.customer_name || ""), 14, 63);

    if (invoice.customer_phone) {
      doc.text(String(invoice.customer_phone), 14, 69);
    }

    if (invoice.customer_email) {
      doc.text(String(invoice.customer_email), 14, 75);
    }

    autoTable(doc, {
      startY: 85,
      head: [
        [
          "Service",
          "Qty",
          "Unit Price",
          invoice.tax_name || "Tax",
          "Total",
        ],
      ],
      body: [
        [
          appointment.service || "Service",
          "1",
          Number(invoice.subtotal || 0).toFixed(2),
          `${Number(invoice.tax_percentage || 0)}%`,
          Number(invoice.total_amount || 0).toFixed(2),
        ],
      ],
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 9,
      },
      headStyles: {
        fillColor: [88, 28, 135],
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(10);
    doc.text(
      `Subtotal: ${invoice.currency || ""} ${Number(
        invoice.subtotal || 0
      ).toFixed(2)}`,
      196,
      finalY,
      { align: "right" }
    );

    doc.text(
      `${invoice.tax_name || "Tax"}: ${
        invoice.currency || ""
      } ${Number(invoice.tax_amount || 0).toFixed(2)}`,
      196,
      finalY + 7,
      { align: "right" }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);

    doc.text(
      `Total: ${invoice.currency || ""} ${Number(
        invoice.total_amount || 0
      ).toFixed(2)}`,
      196,
      finalY + 16,
      { align: "right" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Payment Status: ${invoice.payment_status || "Paid"}`,
      14,
      finalY + 16
    );

    if (invoice.footer_text) {
      doc.setFontSize(9);
      doc.text(
        String(invoice.footer_text),
        14,
        finalY + 35
      );
    }

    if (invoice.signature) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Authorized Signature", 196, finalY + 35, {
        align: "right",
      });

      doc.setFont("helvetica", "normal");
      doc.text(
        String(invoice.signature),
        196,
        finalY + 43,
        { align: "right" }
      );
    }

    doc.save(`${invoice.invoice_number}.pdf`);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
          Finance
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Billing & Invoices
        </h1>

        <p className="text-gray-500 mt-2">
          Find a customer, review service history and generate invoices.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <label className="text-sm font-medium text-gray-700">
          Customer Mobile Number
        </label>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchCustomer();
            }}
            placeholder="Enter mobile number"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          />

          <button
            onClick={() => searchCustomer()}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? "Searching..." : "Find Customer"}
          </button>
        </div>
      </div>

      {customer && (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Customer
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              {customer.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {customer.phone}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Service History
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Select a completed paid service to create an invoice.
                </p>
              </div>
            </div>

            {appointments.length === 0 ? (
              <p className="text-gray-500">
                No appointment history found.
              </p>
            ) : (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {appointment.service}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.appointment_date} ·{" "}
                        {appointment.appointment_time}
                      </p>

                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {formatCurrency(
                          appointment.price || 0,
                          settings?.currency_symbol,
                          settings?.currency_position,
                          settings?.decimal_places
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          appointment.payment_status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {appointment.payment_status || "Unpaid"}
                      </span>

                      <button
                        onClick={() => generateInvoice(appointment)}
                        disabled={
                          loading ||
                          appointment.status !== "Completed" ||
                          appointment.payment_status !== "Paid"
                        }
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Generate Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Invoice History
            </h2>

            {invoices.length === 0 ? (
              <p className="text-gray-500 mt-4">
                No invoices generated yet.
              </p>
            ) : (
              <div className="space-y-3 mt-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {invoice.invoice_number}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {invoice.invoice_date}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(
                          invoice.total_amount || 0,
                          settings?.currency_symbol,
                          settings?.currency_position,
                          settings?.decimal_places
                        )}
                      </p>

                      <button
                        onClick={() => {
                          const appointment = appointments.find(
                            (item) =>
                              item.id === invoice.appointment_id
                          );

                          if (!appointment) {
                            alert("Appointment history not found.");
                            return;
                          }

                          downloadInvoicePDF(
                            invoice,
                            appointment
                          );
                        }}
                        className="border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
