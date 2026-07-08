import React from "react";

function SearchPanel({
  keyword,
  setKeyword,
  country,
  setCountry,
  countries,
  city,
  setCity,
  pincode,
  setPincode,
  category,
  setCategory,
  radius,
  setRadius,
  loading,
  onSearch,
  onCurrentLocation,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-5">
        Search Nearby Businesses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          {countries.map((item) => (
            <option
              key={item.isoCode}
              value={item.isoCode}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Pincode (Optional)"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option>Salon</option>
          <option>Spa</option>
          <option>Barber</option>
          <option>Beauty Parlour</option>
          <option>Hair Studio</option>
          <option>Nail Studio</option>
          <option>Gym</option>
          <option>Yoga Studio</option>
          <option>Hotel</option>
          <option>Cafe</option>
          <option>Restaurant</option>
          <option>Boutique</option>
        </select>

        <select
          value={radius}
          onChange={(e) =>
            setRadius(Number(e.target.value))
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value={500}>500 m</option>
          <option value={1000}>1 km</option>
          <option value={2000}>2 km</option>
          <option value={5000}>5 km</option>
          <option value={10000}>10 km</option>
        </select>

      </div>

      <div className="flex flex-wrap gap-3 mt-5">

        <button
          onClick={onCurrentLocation}
          className="bg-blue-600 hover:bg-blue-700
 text-white px-5 py-3 rounded-xl"
>
  📍 Current Location
</button>

<button
  onClick={onSearch}
  disabled={loading}
  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl"
>
  {loading ? "Searching..." : "🔍 Search"}
</button>

      </div>

    </div>
  );
}

export default SearchPanel;
