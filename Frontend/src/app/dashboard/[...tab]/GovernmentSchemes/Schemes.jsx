"use client";

import React, { useState, useEffect } from "react";
import SchemeDisplay from "app/components/SchemeDisplay";

const Page = ({ inputValue, sidebarFilters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


