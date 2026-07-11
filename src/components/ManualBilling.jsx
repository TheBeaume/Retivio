import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const emptyItem = {
  name: "",
  quantity: 1,
  price: "",
};

export default function ManualBilling({ onInvoiceCreated }) {
  const settings = useBusinessSettings();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("name");

    setServices(data || []);
  }

  async function findCustomer() {
    if (!phone.trim()) {
      setCustomer(null);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", user.id)
      .eq("phone", phone.trim())
      .maybeSingle();

    if (error) {
      alert(error.message);
      return;
    }

    if (data) {
      setCustomer(data);
      setCustomerName(data.name || "");
    } else {
      setCustomer(null);
    }
  }

  function updateItem(index, field, value) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  }

  function selectService(index, serviceName) {
    const selected = services.find(
      (service) => service.name === serviceName
    );

    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              name: serviceName,
              price: selected?.price ?? item.price,
            }
          : item
      )
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { ...emptyItem },
    ]);
  }

  function removeItem(index) {
    setItems((current) =>
      current.length === 1
        ? current
        : current.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.quantity || 0) *
            Number(item.price || 0),
        0
      ),
    [items]
  );

  const discountAmount = Math.max(
    0,
    Number(discount || 0)
  );

  const afterDiscount = Math.max(
    0,
    subtotal - discountAmount
  );

  const taxPercentage = Number(
    settings?.tax_percentage || 0
  );

  const taxInclusive = Boolean(settings?.tax_inclusive);

  const taxAmount =
    taxPercentage <= 0
      ? 0
      : taxInclusive
      ? afterDiscount -
        afterDiscount / (1 + taxPercentage / 100)
      : afterDiscount * (taxPercentage / 100);

  const totalAmount = taxInclusive
    ? afterDiscount
    : afterDiscount + taxAmount;

  function money(value) {
    const decimals = Number(
      settings?.decimal_places ?? 2
    );

    const amount = Number(value || 0).toFixed(decimals);
    const symbol =
      settings?.currency_symbol ||
      settings?.currency ||
      "";

    return settings?.currency_position === "after"
      ? `${amount}${symbol}`
      : `${symbol}${amount}`;
  }

  async function getInvoiceNumber(userId) {
    const prefix = settings?.invoice_prefix || "INV";

    const { data, error } = await supabase
      .from("invoices")
      .select("invoice_number")
      .eq("user_id", userId);

    if (error) throw error;

    const numbers = (data || [])
      .map((invoice) => invoice.invoice_number)
      .filter((number) =>
        String(number || "").startsWith(`${prefix}-`)
      )
      .map((number) =>
        Number(String(number).split("-").pop())
      )
      .filter(Number.isFinite);

    const next =
      (numbers.length ? Math.max(...numbers) : 0) + 1;

    return `${prefix}-${String(next).padStart(5, "0")}`;
  }

  function downloadPDF(invoice, invoiceItems) {
    const doc = new jsPDF();

    const businessName =
      settings?.legal_business_name ||
      settings?.business_name ||
      invoice.business_name ||
      "Your Business";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.text(String(businessName), 14, 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const address = [
      settings?.billing_address || settings?.address,
      settings?.billing_city,
      settings?.billing_state,
      settings?.billing_postal_code,
      settings?.country,
    ].filter(Boolean);

    let headerY = 26;

    address.forEach((part) => {
      doc.text(String(part), 14, headerY);
      headerY += 5;
    });

    if (settings?.tax_registration_number) {
      doc.text(
        `${settings?.tax_name || "Tax"} Registration: ${
          settings.tax_registration_number
        }`,
        14,
        headerY
      );
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("INVOICE", 196, 19, {
      align: "right",
    });

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

    const lineY = Math.max(headerY + 8, 48);

    doc.line(14, lineY, 196, lineY);

    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", 14, lineY + 10);

    doc.setFont("helvetica", "normal");
    doc.text(
      String(invoice.customer_name || "Walk-in Customer"),
      14,
      lineY + 17
    );

    if (invoice.customer_phone) {
      doc.text(
        `Phone: ${invoice.customer_phone}`,
        14,
        lineY + 23
      );
    }

    autoTable(doc, {
      startY: lineY + 32,
      head: [[
        "Description",
        "Qty",
        "Unit Price",
        `${invoice.tax_name || "Tax"} %`,
        "Total",
      ]],
      body: invoiceItems.map((item) => [
        item.item_name,
        String(item.quantity),
        money(item.unit_price),
        `${Number(item.tax_percentage || 0)}%`,
        money(item.line_total),
      ]),
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

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text(
      `Subtotal: ${money(invoice.subtotal)}`,
      196,
      finalY,
      { align: "right" }
    );

    if (Number(invoice.discount_amount || 0) > 0) {
      doc.text(
        `Discount: ${money(invoice.discount_amount)}`,
        196,
        finalY + 7,
        { align: "right" }
      );
    }

    if (Number(invoice.tax_amount || 0) > 0) {
      doc.text(
        `${invoice.tax_name || "Tax"}: ${money(
          invoice.tax_amount
        )}`,
        196,
        finalY + 14,
        { align: "right" }
      );
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);

    doc.text(
      `Total: ${money(invoice.total_amount)}`,
      196,
      finalY + 23,
      { align: "right" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text(
      `Payment Status: ${invoice.payment_status}`,
      14,
      finalY + 8
    );

    doc.text(
      `Payment Method: ${invoice.payment_method}`,
      14,
      finalY + 14
    );

    if (invoice.notes) {
      doc.text(
        `Notes: ${invoice.notes}`,
        14,
        finalY + 23
      );
    }

    const footerY = 265;

    doc.text(
      invoice.footer_text ||
        "Thank you for your business.",
      14,
      footerY
    );

    doc.setFont("helvetica", "bold");

    doc.text(
      "Authorized Signature",
      196,
      footerY,
      { align: "right" }
    );

    doc.setFont("helvetica", "normal");

    doc.text(
      String(
        invoice.signature ||
          settings?.signature ||
          businessName
      ),
      196,
      footerY + 7,
      { align: "right" }
    );

    doc.setFontSize(8);

    doc.text(
      "Generated through Retivio",
      105,
      290,
      { align: "center" }
    );

    doc.save(`${invoice.invoice_number}.pdf`);
  }

  async function createBill() {
    const validItems = items.filter(
      (item) =>
        item.name.trim() &&
        Number(item.quantity) > 0 &&
        Number(item.price) >= 0
    );

    if (!customerName.trim()) {
      alert("Enter customer name.");
      return;
    }

    if (!phone.trim()) {
      alert("Enter customer mobile number.");
      return;
    }

    if (!validItems.length) {
      alert("Add at least one valid billing item.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      let billingCustomer = customer;

      if (!billingCustomer) {
        const { data, error } = await supabase
          .from("customers")
          .insert({
            user_id: user.id,
            name: customerName.trim(),
            phone: phone.trim(),
            service: validItems[0].name,
            visits: 0,
            total_spend: 0,
            loyalty: "Silver",
            status: "Active",
          })
          .select("*")
          .single();

        if (error) throw error;

        billingCustomer = data;
        setCustomer(data);
      }

      const invoiceNumber = await getInvoiceNumber(user.id);

      const invoicePayload = {
        user_id: user.id,
        customer_id: billingCustomer.id,
        appointment_id: null,
        transaction_id: null,
        invoice_number: invoiceNumber,

        customer_name: customerName.trim(),
        customer_phone: phone.trim(),
        customer_email: billingCustomer.email || null,
        billing_address: billingCustomer.address || null,

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

        subtotal: Number(subtotal.toFixed(2)),
        discount_amount: Number(
          discountAmount.toFixed(2)
        ),
        tax_percentage: taxPercentage,
        tax_amount: Number(taxAmount.toFixed(2)),
        total_amount: Number(totalAmount.toFixed(2)),

        payment_method: paymentMethod,
        payment_status: paymentStatus,

        invoice_date:
          new Date().toLocaleDateString("en-CA"),

        notes: notes || null,

        footer_text:
          settings?.invoice_footer ||
          "Thank you for your business.",

        signature: settings?.signature || null,
      };

      const { data: invoice, error: invoiceError } =
        await supabase
          .from("invoices")
          .insert(invoicePayload)
          .select()
          .single();

      if (invoiceError) throw invoiceError;

      const itemPayload = validItems.map((item) => {
        const lineSubtotal =
          Number(item.quantity) * Number(item.price);

        const lineTax = taxInclusive
          ? lineSubtotal -
            lineSubtotal / (1 + taxPercentage / 100)
          : lineSubtotal * (taxPercentage / 100);

        return {
          invoice_id: invoice.id,
          user_id: user.id,
          item_name: item.name,
          item_description: "Manual billing service",
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          tax_percentage: taxPercentage,
          tax_amount: Number(lineTax.toFixed(2)),
          line_total: taxInclusive
            ? Number(lineSubtotal.toFixed(2))
            : Number(
                (lineSubtotal + lineTax).toFixed(2)
              ),
        };
      });

      const { error: itemError } = await supabase
        .from("invoice_items")
        .insert(itemPayload);

      if (itemError) throw itemError;

      const { data: transaction, error: transactionError } =
        await supabase
          .from("transactions")
          .insert({
            user_id: user.id,
            customer_id: billingCustomer.id,
            appointment_id: null,
            invoice_id: invoice.id,
            source: "Manual Billing",
            service_name: validItems
              .map((item) => item.name)
              .join(", "),
            amount: Number(totalAmount.toFixed(2)),
            subtotal: Number(subtotal.toFixed(2)),
            tax_amount: Number(taxAmount.toFixed(2)),
            total_amount: Number(totalAmount.toFixed(2)),
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            notes: notes || null,
          })
          .select()
          .single();

      if (transactionError) throw transactionError;

      await supabase
        .from("invoices")
        .update({
          transaction_id: transaction.id,
        })
        .eq("id", invoice.id)
        .eq("user_id", user.id);

      if (paymentStatus === "Paid") {
        await supabase
          .from("customers")
          .update({
            total_spend:
              Number(billingCustomer.total_spend || 0) +
              Number(totalAmount),
            visits:
              Number(billingCustomer.visits || 0) + 1,
            service: validItems[0].name,
            last_visit:
              new Date().toLocaleDateString("en-CA"),
            status: "Active",
          })
          .eq("id", billingCustomer.id)
          .eq("user_id", user.id);
      }

      downloadPDF(invoice, itemPayload);

      alert("Invoice created successfully.");

      setItems([{ ...emptyItem }]);
      setDiscount(0);
      setNotes("");

      if (onInvoiceCreated) {
        onInvoiceCreated();
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to create bill.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
          Point of Sale
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-2">
          Create Manual Bill
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Create invoices for walk-in, phone, referral or other customers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>

          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setCustomer(null);
            }}
            onBlur={findCustomer}
            placeholder="Customer mobile number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Customer Name
          </label>

          <input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Customer name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {customer && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
          <p className="font-semibold text-green-800">
            Existing customer found
          </p>

          <p className="text-sm text-green-700 mt-1">
            {customer.name} · {customer.phone}
          </p>
        </div>
      )}

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Billing Items
          </h3>

          <button
            onClick={addItem}
            className="text-purple-600 font-semibold text-sm"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-3 mt-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 border border-gray-200 rounded-xl p-4"
            >
              <select
                value={item.name}
                onChange={(e) =>
                  selectService(index, e.target.value)
                }
                className="md:col-span-5 border border-gray-200 rounded-lg px-3 py-2.5"
              >
                <option value="">Select service</option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.name}
                  >
                    {service.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                placeholder="Qty"
                className="md:col-span-2 border border-gray-200 rounded-lg px-3 py-2.5"
              />

              <input
                type="number"
                min="0"
                value={item.price}
                onChange={(e) =>
                  updateItem(
                    index,
                    "price",
                    e.target.value
                  )
                }
                placeholder="Price"
                className="md:col-span-3 border border-gray-200 rounded-lg px-3 py-2.5"
              />

              <button
                onClick={() => removeItem(index)}
                className="md:col-span-2 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Discount Amount
          </label>

          <input
            type="number"
            min="0"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Payment Status
          </label>

          <select
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2"
          >
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        placeholder="Billing notes"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-4"
      />

      <div className="bg-gray-50 rounded-xl p-5 mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm mt-3">
          <span className="text-gray-500">Discount</span>
          <span>- {money(discountAmount)}</span>
        </div>

        <div className="flex justify-between text-sm mt-3">
          <span className="text-gray-500">
            {settings?.tax_name || "Tax"} ({taxPercentage}%)
          </span>
          <span>{money(taxAmount)}</span>
        </div>

        <div className="flex justify-between border-t border-gray-200 mt-4 pt-4">
          <span className="font-bold text-gray-900">
            Total
          </span>

          <span className="text-xl font-bold text-gray-900">
            {money(totalAmount)}
          </span>
        </div>
      </div>

      <button
        onClick={createBill}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl py-3.5 font-semibold mt-6"
      >
        {loading ? "Creating Invoice..." : "Create Invoice & PDF"}
      </button>
    </div>
  );
}
