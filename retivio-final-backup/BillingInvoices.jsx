import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const PAGE_SIZE = 6;

export default function BillingInvoices() {
  const settings = useBusinessSettings();

  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [servicePage, setServicePage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);

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
      console.error("Invoice appointment parse failed:", error);
    }

    localStorage.removeItem("retivio_invoice_appointment");
  }, []);

  const invoiceByAppointment = useMemo(() => {
    return new Map(
      invoices
        .filter((invoice) => invoice.appointment_id)
        .map((invoice) => [
          String(invoice.appointment_id),
          invoice,
        ])
    );
  }, [invoices]);

  const servicePages = Math.max(
    1,
    Math.ceil(appointments.length / PAGE_SIZE)
  );

  const invoicePages = Math.max(
    1,
    Math.ceil(invoices.length / PAGE_SIZE)
  );

  const visibleAppointments = appointments.slice(
    (servicePage - 1) * PAGE_SIZE,
    servicePage * PAGE_SIZE
  );

  const visibleInvoices = invoices.slice(
    (invoicePage - 1) * PAGE_SIZE,
    invoicePage * PAGE_SIZE
  );

  async function searchCustomer(searchPhone = phone) {
    const cleanPhone = String(searchPhone || "").trim();

    if (!cleanPhone) {
      alert("Enter customer mobile number.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: customerData, error } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", user.id)
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (error) throw error;

      if (!customerData) {
        setCustomer(null);
        setAppointments([]);
        setInvoices([]);
        setTransactions([]);
        alert("Customer not found.");
        return;
      }

      const [
        appointmentResult,
        invoiceResult,
        transactionResult,
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select("*")
          .eq("user_id", user.id)
          .eq("customer_id", customerData.id)
          .order("appointment_date", { ascending: false })
          .order("appointment_time", { ascending: false }),

        supabase
          .from("invoices")
          .select("*")
          .eq("user_id", user.id)
          .eq("customer_id", customerData.id)
          .order("invoice_date", { ascending: false })
          .order("created_at", { ascending: false }),

        supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false }),
      ]);

      if (appointmentResult.error) {
        throw appointmentResult.error;
      }

      if (invoiceResult.error) {
        throw invoiceResult.error;
      }

      if (transactionResult.error) {
        throw transactionResult.error;
      }

      setCustomer(customerData);
      setAppointments(appointmentResult.data || []);
      setInvoices(invoiceResult.data || []);
      setTransactions(transactionResult.data || []);
      setServicePage(1);
      setInvoicePage(1);
    } catch (error) {
      console.error(error);
      alert(error.message || "Customer search failed.");
    } finally {
      setLoading(false);
    }
  }

  function getTransaction(appointmentId) {
    return transactions.find(
      (transaction) =>
        String(transaction.appointment_id) ===
        String(appointmentId)
    );
  }

  function getNextInvoiceNumber(existingNumbers, attempt = 0) {
    const prefix = settings?.invoice_prefix || "INV";

    const numbers = existingNumbers
      .map((invoice) => invoice.invoice_number)
      .filter((number) =>
        String(number || "").startsWith(`${prefix}-`)
      )
      .map((number) =>
        Number(String(number).split("-").pop())
      )
      .filter(Number.isFinite);

    const nextNumber =
      (numbers.length ? Math.max(...numbers) : 0) +
      1 +
      attempt;

    return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
  }

  async function generateInvoice(appointment) {
    if (!customer) return;

    const savedInvoice = invoiceByAppointment.get(
      String(appointment.id)
    );

    if (savedInvoice) {
      downloadInvoicePDF(savedInvoice, appointment);
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: duplicateInvoice, error: duplicateError } =
        await supabase
          .from("invoices")
          .select("*")
          .eq("user_id", user.id)
          .eq("appointment_id", appointment.id)
          .maybeSingle();

      if (duplicateError) throw duplicateError;

      if (duplicateInvoice) {
        await searchCustomer(customer.phone);
        downloadInvoicePDF(duplicateInvoice, appointment);
        return;
      }

      const transaction = getTransaction(appointment.id);

      const subtotal = Number(
        transaction?.subtotal ||
        transaction?.amount ||
        appointment.price ||
        0
      );

      const taxPercentage = Number(
        settings?.tax_percentage || 0
      );

      const taxInclusive = Boolean(settings?.tax_inclusive);

      let taxableSubtotal = subtotal;
      let taxAmount = 0;
      let totalAmount = subtotal;

      if (taxPercentage > 0) {
        if (taxInclusive) {
          taxableSubtotal =
            subtotal / (1 + taxPercentage / 100);

          taxAmount = subtotal - taxableSubtotal;
          totalAmount = subtotal;
        } else {
          taxAmount =
            taxableSubtotal * taxPercentage / 100;

          totalAmount = taxableSubtotal + taxAmount;
        }
      }

      taxableSubtotal = Number(taxableSubtotal.toFixed(2));
      taxAmount = Number(taxAmount.toFixed(2));
      totalAmount = Number(totalAmount.toFixed(2));

      const { data: allInvoices, error: numberError } =
        await supabase
          .from("invoices")
          .select("invoice_number")
          .eq("user_id", user.id);

      if (numberError) throw numberError;

      let invoice = null;
      let lastError = null;

      for (let attempt = 0; attempt < 5; attempt += 1) {
        const invoiceNumber = getNextInvoiceNumber(
          allInvoices || [],
          attempt
        );

        const invoicePayload = {
          user_id: user.id,
          customer_id: customer.id,
          appointment_id: appointment.id,
          transaction_id: transaction?.id || null,
          invoice_number: invoiceNumber,

          customer_name: customer.name,
          customer_phone: customer.phone,
          customer_email: customer.email || null,

          billing_address: customer.address || null,

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
          currency_symbol: settings?.currency_symbol || "",

          subtotal: taxableSubtotal,
          tax_percentage: taxPercentage,
          tax_amount: taxAmount,
          discount_amount: 0,
          total_amount: totalAmount,

          payment_method:
            transaction?.payment_method || null,

          payment_status:
            transaction?.payment_status ||
            appointment.payment_status ||
            "Paid",

          invoice_date:
            new Date().toLocaleDateString("en-CA"),

          notes: appointment.notes || null,

          footer_text:
            settings?.invoice_footer ||
            "Thank you for your business.",

          signature: settings?.signature || null,
        };

        const result = await supabase
          .from("invoices")
          .insert(invoicePayload)
          .select()
          .single();

        if (!result.error) {
          invoice = result.data;
          break;
        }

        lastError = result.error;

        if (result.error.code !== "23505") {
          throw result.error;
        }
      }

      if (!invoice) {
        throw lastError || new Error(
          "Unable to allocate invoice number."
        );
      }

      const { error: itemError } = await supabase
        .from("invoice_items")
        .insert({
          invoice_id: invoice.id,
          user_id: user.id,
          item_name: appointment.service || "Service",
          item_description:
            appointment.notes || "Professional service",
          quantity: 1,
          unit_price: taxableSubtotal,
          tax_percentage: taxPercentage,
          tax_amount: taxAmount,
          line_total: totalAmount,
        });

      if (itemError) {
        await supabase
          .from("invoices")
          .delete()
          .eq("id", invoice.id);

        throw itemError;
      }

      if (transaction?.id) {
        await supabase
          .from("transactions")
          .update({
            invoice_id: invoice.id,
            subtotal: taxableSubtotal,
            tax_amount: taxAmount,
            total_amount: totalAmount,
          })
          .eq("id", transaction.id)
          .eq("user_id", user.id);
      }

      await searchCustomer(customer.phone);

      downloadInvoicePDF(invoice, appointment);
    } catch (error) {
      console.error(error);
      alert(error.message || "Invoice generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function money(value, invoice) {
    const amount = Number(value || 0).toFixed(
      Number(settings?.decimal_places ?? 2)
    );

    const currency =
      invoice?.currency_symbol ||
      invoice?.currency ||
      settings?.currency_symbol ||
      settings?.currency ||
      "";

    return `${currency} ${amount}`.trim();
  }

  function downloadInvoicePDF(invoice, appointment) {
    const doc = new jsPDF();

    const businessName =
      settings?.legal_business_name ||
      invoice.business_name ||
      settings?.business_name ||
      "Your Business";

    const addressParts = [
      invoice.business_address ||
        settings?.billing_address ||
        settings?.address,
      settings?.billing_city,
      settings?.billing_state,
      settings?.billing_postal_code,
      settings?.country,
    ].filter(Boolean);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.text(String(businessName), 14, 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    let headerY = 26;

    addressParts.forEach((part) => {
      const lines = doc.splitTextToSize(String(part), 105);

      doc.text(lines, 14, headerY);
      headerY += lines.length * 4;
    });

    if (invoice.tax_registration_number) {
      doc.text(
        `${invoice.tax_name || "Tax"} Registration: ${
          invoice.tax_registration_number
        }`,
        14,
        headerY + 1
      );
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("INVOICE", 196, 19, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text(
      `Invoice No: ${invoice.invoice_number}`,
      196,
      28,
      { align: "right" }
    );

    doc.text(
      `Invoice Date: ${invoice.invoice_date}`,
      196,
      34,
      { align: "right" }
    );

    doc.line(14, Math.max(headerY + 8, 47), 196, Math.max(headerY + 8, 47));

    const billY = Math.max(headerY + 18, 57);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("BILL TO", 14, billY);

    doc.setFont("helvetica", "normal");
    doc.text(
      String(invoice.customer_name || ""),
      14,
      billY + 7
    );

    let customerY = billY + 13;

    if (invoice.customer_phone) {
      doc.text(
        `Phone: ${invoice.customer_phone}`,
        14,
        customerY
      );
      customerY += 6;
    }

    if (invoice.customer_email) {
      doc.text(
        `Email: ${invoice.customer_email}`,
        14,
        customerY
      );
      customerY += 6;
    }

    autoTable(doc, {
      startY: customerY + 7,
      head: [[
        "Description",
        "Qty",
        "Unit Price",
        `${invoice.tax_name || "Tax"} %`,
        "Total",
      ]],
      body: [[
        appointment?.service || "Service",
        "1",
        money(invoice.subtotal, invoice),
        `${Number(invoice.tax_percentage || 0)}%`,
        money(invoice.total_amount, invoice),
      ]],
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [88, 28, 135],
      },
    });

    const finalY = doc.lastAutoTable.finalY + 11;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Subtotal: ${money(invoice.subtotal, invoice)}`,
      196,
      finalY,
      { align: "right" }
    );

    if (Number(invoice.tax_percentage || 0) > 0) {
      doc.text(
        `${invoice.tax_name || "Tax"} (${
          invoice.tax_percentage
        }%): ${money(invoice.tax_amount, invoice)}`,
        196,
        finalY + 7,
        { align: "right" }
      );
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);

    doc.text(
      `Total: ${money(invoice.total_amount, invoice)}`,
      196,
      finalY + 17,
      { align: "right" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text(
      `Payment Status: ${invoice.payment_status || "Paid"}`,
      14,
      finalY + 8
    );

    if (invoice.payment_method) {
      doc.text(
        `Payment Method: ${invoice.payment_method}`,
        14,
        finalY + 14
      );
    }

    if (invoice.notes) {
      doc.setFont("helvetica", "bold");
      doc.text("Notes", 14, finalY + 27);

      doc.setFont("helvetica", "normal");

      const noteLines = doc.splitTextToSize(
        String(invoice.notes),
        90
      );

      doc.text(noteLines, 14, finalY + 33);
    }

    const footerY = 265;

    if (invoice.footer_text) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      const footerLines = doc.splitTextToSize(
        String(invoice.footer_text),
        100
      );

      doc.text(footerLines, 14, footerY);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Authorized Signature", 196, footerY, {
      align: "right",
    });

    doc.setFont("helvetica", "normal");

    const signature =
      invoice.signature ||
      settings?.signature ||
      businessName;

    const signatureLines = doc.splitTextToSize(
      String(signature),
      65
    );

    doc.text(signatureLines, 196, footerY + 7, {
      align: "right",
    });

    doc.setFontSize(8);
    doc.text(
      "Generated through Retivio",
      105,
      290,
      { align: "center" }
    );

    doc.save(`${invoice.invoice_number}.pdf`);
  }

  function Pagination({
    page,
    pages,
    onPrevious,
    onNext,
  }) {
    if (pages <= 1) return null;

    return (
      <div className="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-gray-100">
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {pages}
        </span>

        <button
          onClick={onNext}
          disabled={page === pages}
          className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
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
          Search customers, review service history and manage invoices.
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
            {loading ? "Please wait..." : "Find Customer"}
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
            <h2 className="text-xl font-bold text-gray-900">
              Service History
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-5">
              Generate or download invoices for completed paid services.
            </p>

            {appointments.length === 0 ? (
              <p className="text-gray-500">
                No appointment history found.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {visibleAppointments.map((appointment) => {
                    const savedInvoice =
                      invoiceByAppointment.get(
                        String(appointment.id)
                      );

                    return (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {appointment.service}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          {appointment.appointment_date}
                        </p>

                        <p className="text-sm text-gray-500">
                          {appointment.appointment_time}
                        </p>

                        <p className="font-semibold text-gray-900 mt-3">
                          {formatCurrency(
                            appointment.price || 0,
                            settings?.currency_symbol,
                            settings?.currency_position,
                            settings?.decimal_places
                          )}
                        </p>

                        <button
                          onClick={() =>
                            generateInvoice(appointment)
                          }
                          disabled={
                            loading ||
                            appointment.status !== "Completed" ||
                            appointment.payment_status !== "Paid"
                          }
                          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                        >
                          {savedInvoice
                            ? "Download Invoice"
                            : "Generate Invoice"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <Pagination
                  page={servicePage}
                  pages={servicePages}
                  onPrevious={() =>
                    setServicePage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  onNext={() =>
                    setServicePage((page) =>
                      Math.min(servicePages, page + 1)
                    )
                  }
                />
              </>
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
              <>
                <div className="space-y-3 mt-4">
                  {visibleInvoices.map((invoice) => {
                    const appointment = appointments.find(
                      (item) =>
                        String(item.id) ===
                        String(invoice.appointment_id)
                    );

                    return (
                      <div
                        key={invoice.id}
                        className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {invoice.invoice_number}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {invoice.invoice_date}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {invoice.payment_method ||
                              "Payment method unavailable"}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(
                              invoice.total_amount || 0,
                              invoice.currency_symbol ||
                                settings?.currency_symbol,
                              settings?.currency_position,
                              settings?.decimal_places
                            )}
                          </p>

                          <button
                            onClick={() => {
                              if (!appointment) {
                                alert(
                                  "Appointment history not found."
                                );
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
                    );
                  })}
                </div>

                <Pagination
                  page={invoicePage}
                  pages={invoicePages}
                  onPrevious={() =>
                    setInvoicePage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  onNext={() =>
                    setInvoicePage((page) =>
                      Math.min(invoicePages, page + 1)
                    )
                  }
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
