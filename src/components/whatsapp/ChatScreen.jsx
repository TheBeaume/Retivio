import React, { useState } from "react";

export default function ChatScreen({ selectedChat }) {
const [selectedDate, setSelectedDate] = useState("");
const [selectedService, setSelectedService] = useState("");
const [selectedTime, setSelectedTime] = useState("");
const [customService, setCustomService] = useState("");
const [customTime, setCustomTime] = useState("");
const [bookingConfirmed, setBookingConfirmed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#efeae2]">

      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">

        <div>
<h2 className="font-bold text-lg">
   {selectedChat?.name || "Customer"}
</h2>
          <p className="text-sm text-green-100">
{selectedChat ? "AI Assistant Online" : "Demo Conversation"}
          </p>
        </div>

        <button className="text-2xl">
          ℹ
        </button>

      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 max-w-[80%] shadow">
            Hi 
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-green-200 rounded-2xl px-4 py-3 max-w-[80%] shadow">
Welcome to Retivio AI Booking Assistant 
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 max-w-[80%] shadow">
I'd like to book an appointment.
{bookingConfirmed && (
  <div className="flex justify-end">
    <div className="bg-green-200 rounded-2xl px-4 py-3 max-w-[80%] shadow">
      <p> Your appointment has been confirmed.</p>
      <p> {selectedDate || "Today"}</p>
      <p> {selectedService === "Other" ? customService : selectedService}</p>
      <p> {selectedTime === "Custom" ? customTime : selectedTime}</p>
    </div>
  </div>
)}
          </div>
        </div>

      </div>

{/* Booking Assistant */}

<div className="bg-white border-t p-3 space-y-3">

  <p className="text-sm font-semibold">
 AI Booking Assistant
  </p>

  <div className="flex gap-2 overflow-x-auto">

<button
  onClick={() => setSelectedDate("Today")}
  className={`px-3 py-2 rounded-full whitespace-nowrap ${
    selectedDate === "Today"
      ? "bg-purple-600 text-white"
      : "bg-purple-100"
  }`}
>
   Today
</button>


<button
  onClick={() => setSelectedDate("Tomorrow")}
  className={`px-3 py-2 rounded-full whitespace-nowrap ${
    selectedDate === "Tomorrow"
      ? "bg-purple-600 text-white"
      : "bg-purple-100"
  }`}
>
   Tomorrow
</button>
<button
  onClick={() => setSelectedDate("Custom")}
  className={`px-3 py-2 rounded-full whitespace-nowrap ${
    selectedDate === "Custom"
      ? "bg-purple-600 text-white"
      : "bg-purple-100"
  }`}
>
   Choose Date
</button>
  </div>

  <div className="flex gap-2 overflow-x-auto">

<button
  onClick={() => setSelectedService("Hair Spa")}
  className={`px-3 py-2 rounded-full ${
    selectedService === "Hair Spa"
      ? "bg-green-600 text-white"
      : "bg-green-100"
  }`}
>
   Hair Spa
</button>
<button
  onClick={() => setSelectedService("Facial")}
  className={`px-3 py-2 rounded-full ${
    selectedService === "Facial"
      ? "bg-green-600 text-white"
      : "bg-green-100"
  }`}
>
   Facial
</button>
<button
  onClick={() => setSelectedService("Hair Cut")}
  className={`px-3 py-2 rounded-full ${
    selectedService === "Hair Cut"
      ? "bg-green-600 text-white"
      : "bg-green-100"
  }`}
>
   Hair Cut
</button>
<button
  onClick={() => setSelectedService("Other")}
  className={`px-3 py-2 rounded-full ${
    selectedService === "Other"
      ? "bg-green-600 text-white"
      : "bg-green-100"
  }`}
>
   Other Service
</button>

{selectedService === "Other" && (
  <input
    type="text"
    placeholder="Enter Service Name..."
    value={customService}
    onChange={(e) => setCustomService(e.target.value)}
    className="w-full border rounded-lg p-2 mt-3"
  />
)}
  </div>

  <div className="flex gap-2 overflow-x-auto">

<button
  onClick={() => setSelectedTime("10:00 AM")}
  className={`px-3 py-2 rounded-full ${
    selectedTime === "10:00 AM"
      ? "bg-blue-600 text-white"
      : "bg-blue-100"
  }`}
>
   10:00 AM
</button>

<button
  onClick={() => setSelectedTime("12:00 PM")}
  className={`px-3 py-2 rounded-full ${
    selectedTime === "12:00 PM"
      ? "bg-blue-600 text-white"
      : "bg-blue-100"
  }`}
>
   12:00 PM
</button>

<button
  onClick={() => setSelectedTime("2:00 PM")}
  className={`px-3 py-2 rounded-full ${
    selectedTime === "2:00 PM"
      ? "bg-blue-600 text-white"
      : "bg-blue-100"
  }`}
>
   2:00 PM
</button>

<button
  onClick={() => {
    document.getElementById("customTimePicker").showPicker();
  }}
  className="..."
>
   Custom Time
</button>

<input
  id="customTimePicker"
  type="time"
  value={customTime}
  onChange={(e) => {
    setCustomTime(e.target.value);
    setSelectedTime(e.target.value);
  }}
  style={{ display: "none" }}
/>
  </div>

<button
  disabled={
    bookingConfirmed ||
    !selectedDate ||
    !selectedService ||
    !selectedTime ||
    (selectedService === "Other" && !customService) ||
    (selectedTime === "Custom" && !customTime)
  }
  onClick={() => setBookingConfirmed(true)}
  className={`w-full py-3 rounded-xl font-semibold ${
    bookingConfirmed ||
    !selectedDate ||
    !selectedService ||
    !selectedTime ||
    (selectedService === "Other" && !customService) ||
    (selectedTime === "Custom" && !customTime)
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-green-600 text-white"
  }`}

>
  {bookingConfirmed
    ? " Demo Booking Confirmed"
    : " Confirm Demo Booking"}
</button>
</div>
<p className="text-xs text-center text-gray-500">
  Demo Mode • Real WhatsApp integration is coming soon.
</p>
      {/* Message Box */}
      <div className="bg-white border-t p-3 flex items-center gap-2">

        <button className="text-xl"></button>

        <input
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a message..."
        />

        <button className="bg-green-600 text-white rounded-full px-4 py-2">
          
        </button>

      </div>

    </div>
  );
}
