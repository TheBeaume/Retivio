import React from "react";

function CustomerTable({ customers }) {

  const sendWhatsApp = (customer) => {
    const message = `Hi ${customer.name}! 🌸

It's been a while since your last ${customer.service}.

Book your next appointment and enjoy our special offer!

- Team Retivio`;

    const url = `https://wa.me/91${customer.phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Customer List
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-[1100px] border-collapse">

          <thead>
            <tr className="bg-purple-100">

              <th className="border p-2">Name</th>

              <th className="border p-2">Phone</th>

              <th className="border p-2">Service</th>

              <th className="border p-2">Last Visit</th>

              <th className="border p-2">Next Due</th>

              <th className="border p-2">Visits</th>

              <th className="border p-2">Total Spend</th>

              <th className="border p-2">Loyalty</th>

              <th className="border p-2">Status</th>

              <th className="border p-2">Offer</th>

              <th className="border p-2">
                WhatsApp
              </th>

            </tr>
          </thead>

          <tbody>

            {customers.map((c, i) => (

              <tr
                key={i}
                className="hover:bg-gray-50"
              >

                <td className="border p-2">
                  {c.name}
                </td>

                <td className="border p-2">
                  {c.phone}
                </td>

                <td className="border p-2">
                  {c.service}
                </td>

                <td className="border p-2">
                  {c.lastVisit}
                </td>

                <td className="border p-2">
                  {c.nextDue}
                </td>

                <td className="border p-2">
                  {c.visits}
                </td>

                <td className="border p-2">
                  ₹{c.totalSpend}
                </td>

                <td className="border p-2">
                  {c.loyalty === "VIP"
                    ? "👑 VIP"
                    : c.loyalty === "Gold"
                    ? "🟡 Gold"
                    : "⚪ Silver"}
                </td>

                <td className="border p-2">
                  {c.status}
                </td>

                <td className="border p-2">

                  {c.visits >= 10 ? (

                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      VIP 20%
                    </span>

                  ) : c.visits >= 5 ? (

                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      Gold 10%
                    </span>

                  ) : (

                    "-"

                  )}

                </td>

                <td className="border p-2 text-center">

                  <button
                    onClick={() => sendWhatsApp(c)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    💬 Send
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerTable;

