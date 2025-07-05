"use client";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DialogCloseButton } from "./DialogCloseButton";
import { useDashboardContext } from "app/dashboard/layout";
import { Star } from "lucide-react";

//Type safety check  
const safeString = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

const SchemeDisplay = ({ scheme }) => {
  const { inputValue, sidebarFilters } = useDashboardContext();
  const currentScheme = scheme;

  const schemesToDisplay = useMemo(() => {
    const filteredInput = inputValue || "";

    let filteredSchemes = currentScheme.filter(
      (scheme) =>
        typeof scheme.name === "string" &&
        safeString(scheme.name).includes(safeString(filteredInput))
    );

    const isSidebarFiltersEmptyOrDefault =
      !sidebarFilters ||
      Object.values(sidebarFilters).every(
        (value) =>
          value === null ||
          value === undefined ||
          value === "" ||
          value === "All" ||
          (Array.isArray(value) && value.length === 0)
      );

    if (isSidebarFiltersEmptyOrDefault) return filteredSchemes;

    // Age Group filter
    if (sidebarFilters.ageGroup && sidebarFilters.ageGroup !== "All") {
      const filterAgeMin = parseInt(sidebarFilters.ageGroup.split("-")[0]);
      const filterAgeMax = sidebarFilters.ageGroup.includes("-")
        ? parseInt(sidebarFilters.ageGroup.split("-")[1])
        : Infinity;

      filteredSchemes = filteredSchemes.filter((scheme) => {
        if (scheme.ageGroup === "All") return true;
        if (!scheme.ageGroup) return false;

        if (scheme.ageGroup.includes("-")) {
          const [schemeAgeMin, schemeAgeMax] = scheme.ageGroup
            .split("-")
            .map(Number);
          return filterAgeMin <= schemeAgeMax && filterAgeMax >= schemeAgeMin;
        }

        if (scheme.ageGroup.includes("+")) {
          const schemeAgeMin = parseInt(scheme.ageGroup.split("+")[0]);
          return filterAgeMax >= schemeAgeMin;
        }

        return false;
      });
    }

    // Gender filter
    if (sidebarFilters.gender && sidebarFilters.gender !== "All") {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const gender = scheme.gender;
        return (
          gender === "All" ||
          (Array.isArray(gender) &&
            gender.includes(sidebarFilters.gender)) ||
          gender === sidebarFilters.gender
        );
      });
    }

    // Income Level filter
    if (sidebarFilters.incomeLevel && sidebarFilters.incomeLevel !== "All") {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const income = scheme.incomeLevel;
        return (
          income === "All" ||
          (Array.isArray(income) &&
            income.includes(sidebarFilters.incomeLevel)) ||
          income === sidebarFilters.incomeLevel
        );
      });
    }

    // Profession filter
    if (sidebarFilters.profession && sidebarFilters.profession !== "All") {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const profession = scheme.profession;
        return (
          safeString(profession).includes(safeString(sidebarFilters.profession)) ||
          profession === "All"
        );
      });
    }

    // Location filter
    if (sidebarFilters.location && sidebarFilters.location !== "All") {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const location = scheme.location;
        return (
          safeString(location).includes(safeString(sidebarFilters.location)) ||
          location === "All"
        );
      });
    }

    // ImplementedBy filter
    if (
      sidebarFilters.implementedBy &&
      sidebarFilters.implementedBy !== "All"
    ) {
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          Array.isArray(scheme.implementedBy) &&
          scheme.implementedBy.includes(sidebarFilters.implementedBy)
      );
    }

    // Category filter
    if (sidebarFilters.category && sidebarFilters.category.length > 0) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const socialCategory = scheme.socialCategory || [];
        return socialCategory.some((element) =>
          sidebarFilters.category.includes(element)
        );
      });
    }

    return filteredSchemes;
  }, [inputValue, sidebarFilters, currentScheme]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {schemesToDisplay.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <h1>No schemes to display</h1>
        </div>
      ) : (
        <ul className="grid auto-rows-min gap-4 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemesToDisplay.map((eachScheme) => (
            <li
              className="bg-muted/50 aspect-video rounded-xl p-5 gap-2.5 max-sm-w-[100vw]"
              key={eachScheme.id}
            >
              <h1 className="text-xl mb-3">{eachScheme.name}</h1>

              {eachScheme.location && (
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600 mt-3.5"
                >
                  <span>{eachScheme.location}</span>
                </Badge>
              )}

              {eachScheme.description && (
                <p className="text-md pt-6 pb-6">{eachScheme.description}</p>
              )}

              <div className="flex text-center gap-3 item-center mb-4">
                <div className="bg-green-600 w-fit p-2 pt-1 pb-1 rounded-2xl flex gap-2">
                  <p className="text-white">
                    {eachScheme.ratings?.avgRating?.toFixed(1) || "0.0"}
                  </p>
                  <Star color="#ffffff" strokeWidth={1.75} fill="white" />
                </div>
                <p className="flex items-center">
                  ( {eachScheme.ratings?.count || 0} )
                </p>
              </div>

              <DialogCloseButton scheme={eachScheme} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchemeDisplay;
