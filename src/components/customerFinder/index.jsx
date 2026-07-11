import React, { useEffect, useState } from "react";
import { City } from "country-state-city";

import SearchPanel from "./SearchPanel";
import StatsCards from "./StatsCards";
import ResultsList from "./ResultsList";
import Pagination from "./Pagination";

import { searchBusinesses } from "../../services/customerFinderService";
import { supabase } from "../../lib/supabase";

function CustomerFinder() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("IN");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("Salon");
  const [resultFilter, setResultFilter] = useState("all");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    let active = true;

    const loadCountries = async () => {
      try {
        const { Country } = await import("country-state-city");

        if (active) {
          setCountries(Country.getAllCountries());
        }
      } catch (error) {
        console.error("Country list load failed:", error);
      }
    };

    loadCountries();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const countryCities = City.getCitiesOfCountry(country) || [];
    setCities(countryCities);
    setCity("");
    setResults([]);
    setCurrentPage(1);
  }, [country]);

  const handleSearch = async () => {
    if (!city) {
      alert("Please select a city.");
      return;
    }

    setLoading(true);

    try {
      const data = await searchBusinesses({
        keyword,
        location: city,
        country,
        category,
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

  const filteredResults = results.filter((business) => {
    if (resultFilter === "phone") return Boolean(business.phone);
    if (resultFilter === "no-phone") return !business.phone;
    if (resultFilter === "website") return Boolean(business.website);
    if (resultFilter === "no-website") return !business.website;
    if (resultFilter === "email") return Boolean(business.email);
    if (resultFilter === "no-email") return !business.email;
    return true;
  });

  const totalPages = Math.ceil(filteredResults.length / pageSize);

  const handleSaveLead = async (business) => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        alert("Please login before saving leads.");
        return;
      }

      const { error } = await supabase
        .from("pravi_leads")
        .insert({
          owner_id: userData.user.id,
          source_id: String(business.id),
          name: business.name,
          category: business.category || null,
          phone: business.phone || null,
          email: business.email || null,
          website: business.website || null,
          address: business.address || null,
          latitude: business.latitude || null,
          longitude: business.longitude || null,
          status: "New",
          product: "Unassigned",
        });

      if (error) {
        if (error.code === "23505") {
          alert(
            "Duplicate lead. This business or phone number is already saved."
          );
          return;
        }

        console.error("Save lead error:", error);
        alert(error.message || "Unable to save lead.");
        return;
      }

      window.dispatchEvent(
        new Event("pravi-leads-updated")
      );

      alert("Lead saved to Sales Pipeline.");
    } catch (error) {
      console.error("Save lead failed:", error);
      alert("Unable to save lead.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Lead Finder
        </h1>

        <p className="text-gray-400 mt-2">
          Discover businesses, identify opportunities and build your sales pipeline.
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
        cities={cities}
        category={category}
        setCategory={setCategory}
        loading={loading}
        onSearch={handleSearch}
      />

      {results.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">
              Results
            </p>
            <p className="text-sm text-gray-400">
              Showing {filteredResults.length} of {results.length} businesses
            </p>
          </div>

          <select
            value={resultFilter}
            onChange={(e) => {
              setResultFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          >
            <option value="all">All Businesses</option>
            <option value="phone">Phone Number Available</option>
            <option value="no-phone">No Phone Number</option>
            <option value="website">Website Available</option>
            <option value="no-website">No Website</option>
            <option value="email">Email Available</option>
            <option value="no-email">No Email</option>
          </select>
        </div>
      )}

      <StatsCards
        total={filteredResults.length}
        phoneCount={phoneCount}
        websiteCount={websiteCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <ResultsList
        results={filteredResults}
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
