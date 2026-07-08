import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";

import SearchPanel from "./SearchPanel";
import StatsCards from "./StatsCards";
import ResultsList from "./ResultsList";
import Pagination from "./Pagination";

import { searchBusinesses } from "../../services/customerFinderService";
function CustomerFinder() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("IN");
  const [countries, setCountries] = useState([]);

  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [category, setCategory] = useState("Salon");
  const [radius, setRadius] = useState(2000);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    try {
const data = await searchBusinesses({
  keyword,
  location: pincode || city,
  country,
  category,
  radius,
});
      setResults(data.businesses || []);
      setCurrentPage(1);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const phoneCount = results.filter((b) => b.phone).length;
  const websiteCount = results.filter((b) => b.website).length;
  const totalPages = Math.ceil(results.length / pageSize);

const handleCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        setCountry(
          data.address?.country_code?.toUpperCase() || "IN"
        );

        setCity(
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          ""
        );

        setPincode(
          data.address?.postcode || ""
        );

      } catch (err) {
        alert("Unable to detect location.");
      }
    },
    () => {
      alert("Location permission denied.");
    }
  );
};
  const handleSaveLead = (business) => {
    console.log("Save Lead:", business);
  };

  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">

        <h1 className="text-3xl font-bold">
          🚀 Customer Finder
        </h1>

        <p className="mt-3 text-purple-100 max-w-2xl">
          Discover nearby businesses and grow your salon with smart lead generation.
        </p>

      </div>

<SearchPanel
  keyword={keyword}
  setKeyword={setKeyword}
  country={country}
  setCountry={setCountry}
  countries={countries}
  city={city}
  setCity={setCity}
  pincode={pincode}
  setPincode={setPincode}
  category={category}
  setCategory={setCategory}
  radius={radius}
  setRadius={setRadius}
  loading={loading}
  onSearch={handleSearch}
  onCurrentLocation={handleCurrentLocation}
/>

<StatsCards
  total={results.length}
  phoneCount={phoneCount}
  websiteCount={websiteCount}
  currentPage={currentPage}
  totalPages={totalPages}
/>
<ResultsList
  results={results}
  currentPage={currentPage}
  pageSize={pageSize}
  onSave={handleSaveLead}
/>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPrevious={() => setCurrentPage((p) => p - 1)}
  onNext={() => setCurrentPage((p) => p + 1)}
/>

    </div>
  );
}

export default CustomerFinder;
