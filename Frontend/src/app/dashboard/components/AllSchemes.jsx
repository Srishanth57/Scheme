"use client";

import React, { useState, useEffect } from "react";
import SchemeDisplay from "@/components/main-components/SchemeDisplay";
import { useAppContext } from "app/layout";
import { ThreeDots } from "react-loader-spinner";
import { AlertTriangle } from "lucide-react";

const Page = ({ inputValue, sidebarFilters }) => {
  const { prompt } = useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Prompt fetched from the recommendation queries ${prompt}`);
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
    try {
      const res = await fetch("/api/gemini-sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemes: fetchedData, fetchPrompt: prompt }),
      });
      const result = await res.json();
      console.log(result);
      setData(result);
    } catch (err) {
      console.log(err);
    }
  }
  if (loading) {
    return (
      <div className="flex flex-col justify-center  h-[60vh] items-center p-4">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#007FFF"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return (
     <div className="flex justify-center items-center h-[70vh]">
  <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
    <AlertTriangle className="h-5 w-5" />
    <p className="text-lg font-medium">Failed to load schemes</p>
  </div>
</div>
    );
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
