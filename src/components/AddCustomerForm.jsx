import React, { useState } from "react";

function AddCustomerForm({ customers, setCustomers }) {
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  const updateVisit = () => {
    const existingCustomer = customers.find(
      (c) => c.phone === phone
    );

    if (existingCustomer) {
      const updatedCustomers = customers.map((c) => {
        if (c.phone === phone) {
          const newVisits = c.visits + 1;
          const newSpend =
            c.totalSpend + Number(amount);

          return {
            ...c,
            service,
            visits: newVisits,
            totalSpend: newSpend,
            lastVisit: "Today",
            loyalty:
              newVisits >= 10
                ? "VIP"
                : newVisits >= 5
                ? "Gold"
                : "Silver",
          };
        }
        return c;
      });

      setCustomers(updatedCustomers);
    } else {
      const newCustomer = {
        name: "New Customer",
        phone,
        service,
        lastVisit: "Today",
        nextDue: "30 Days",
        visits: 1,
        totalSpend: Number(amount),
        loyalty: "Silver",
        status: "Active",
      };

      setCustomers([...customers, newCustomer]);
    }

    setPhone("");
    setService("");
    setAmount("");
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        Visit Entry System
      </h2>

      <input
        type="text"
        placeholder="Customer Mobile"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        placeholder="Service Taken"
        value={service}
        onChange={(e) =>
          setService(e.target.value)
        }
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        placeholder="Bill Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={updateVisit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update Visit
      </button>
    </div>
  );
}

export default AddCustomerForm;
