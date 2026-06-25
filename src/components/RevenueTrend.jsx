import React from "react";

function RevenueTrend() {
 
  return (
    <div className="bg-white rounded-2xl shadow p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          📈 Revenue Trend
        </h2>

        <select className="border rounded px-2 py-1 text-sm">
          <option>Monthly</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 600 250"
          className="w-full h-64"
        >
<polygon
  fill="rgba(147,51,234,0.12)"
  points="
    50,200
    150,170
    250,145
    350,110
    450,80
    550,40
    550,220
    50,220
  "
/>      
    <polyline
            fill="none"
            stroke="#9333ea"
            strokeWidth="4"
            points="
              50,200
              150,170
              250,145
              350,110
              450,80
              550,40
            "
          />
<text x="35" y="185" fontSize="12">₹12K</text>
<text x="135" y="155" fontSize="12">₹18K</text>
<text x="235" y="130" fontSize="12">₹22K</text>
<text x="335" y="95" fontSize="12">₹26K</text>
<text x="435" y="65" fontSize="12">₹32K</text>
<text x="535" y="25" fontSize="12">₹38K</text>
          <circle cx="50" cy="200" r="6" fill="#9333ea" />
          <circle cx="150" cy="170" r="6" fill="#9333ea" />
          <circle cx="250" cy="145" r="6" fill="#9333ea" />
          <circle cx="350" cy="110" r="6" fill="#9333ea" />
          <circle cx="450" cy="80" r="6" fill="#9333ea" />
          <circle cx="550" cy="40" r="6" fill="#9333ea" />

          <text x="40" y="225">Jan</text>
          <text x="140" y="225">Feb</text>
          <text x="240" y="225">Mar</text>
          <text x="340" y="225">Apr</text>
          <text x="440" y="225">May</text>
          <text x="540" y="225">Jun</text>
        </svg>
      </div>
    </div>
  );
}

export default RevenueTrend;
