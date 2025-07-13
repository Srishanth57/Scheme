"use client";

import React, { useState, useEffect } from "react";
import SchemeDisplay from "@/components/main-components/SchemeDisplay";

const Page = ({ inputValue, sidebarFilters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAgricultureSchemes() {
      const url = "/api/dashboard/agriculture";

      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const fetchedData = await response.json();
        console.log(fetchedData);
        setData(fetchedData);
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
