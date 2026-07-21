import React, { useState } from "react";
import { supabase } from "../lib/supabase";

function NewCustomerForm({ customers, setCustomers }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const saveCustomer = async () => {
    if (!name || !phone) {
      alert("Name and Mobile are required");
      return;
    }

    const { data: exists } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", phone);

    if (exists && exists.length > 0) {
      alert("Customer already exists");
      return;
    }
const {
  data: { user },
} = await supabase.auth.getUser();

const { error } = await supabase
  .from("customers")
  .insert([

        {
          name,
          phone,
          service: "-",
          last_visit: "-",
          next_due: "-",
          visits: 0,
          total_spend: 0,
          loyalty: "Silver",
          status: "New",
user_id: user.id,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    const newCustomer = {
      name,
      phone,
      service: "-",
      lastVisit: "-",
      nextDue: "-",
      visits: 0,
      totalSpend: 0,
      loyalty: "Silver",
      status: "New",
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");

    alert("Customer Added Successfully");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        New Customer Registration
      </h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        onClick={saveCustomer}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Register Customer
      </button>
    </div>
  );
}

export default NewCustomerForm;
