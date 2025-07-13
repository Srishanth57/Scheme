"use client";

import React, { useState, useEffect } from "react";
import SchemeDisplay from "@/components/main-components/SchemeDisplay";

const Page = ({ inputValue, sidebarFilters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAgricultureSchemes() {
      const url = "/api/dashboard/all-schemes";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const fetchedData = await response.json();
        setData(fetchedData);
        handleGeminiSort(fetchedData);
        console.log("Successfully fetched agriculture schemes:", fetchedData);
      } catch (err) {
        console.error("Error fetching agriculture schemes:", err);
        setError(`Failed to load schemes: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    getAgricultureSchemes();
  }, []);

  async function handleGeminiSort(fetchedData) {
    console.log(
      `fetched DAta from the handleGeminiSort funcion: ${fetchedData}`
    );
    try {
      const res = await fetch("/api/gemini-sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemes: fetchedData }),
      });
      const result = await res.json();
      console.log(result);
      setData(result);
    } catch (err) {
      console.log(err);
    }
  }
  if (loading) {
    return <div className="text-center p-4">Loading schemes...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <SchemeDisplay
      scheme={data}
      inputValue={inputValue}
      sidebarFilters={sidebarFilters}
    />
  );
};

export default Page;
