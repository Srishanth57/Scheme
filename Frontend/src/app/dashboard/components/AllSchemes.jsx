import React from "react";
import SchemeDisplay from "app/components/SchemeDisplay";
import { allSchemes } from "app/data/schemes";
const Page = ({ inputValue, sidebarFilters }) => {
  return (
    <SchemeDisplay
      scheme={allSchemes}
      inputValue={inputValue}
      sidebarFilters={sidebarFilters}
    />
  );
};

export default Page;
