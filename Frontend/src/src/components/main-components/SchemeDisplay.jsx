"use client";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DialogCloseButton } from "./DialogCloseButton";
import { useDashboardContext } from "app/dashboard/layout";
import { Info, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

//Type safety check
const safeString = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

const SchemeDisplay = ({ scheme }) => {
  const { inputValue, sidebarFilters } = useDashboardContext();
  const currentScheme = scheme;

  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const schemesToDisplay = useMemo(() => {
    const filteredInput = inputValue || "";
    console.log(sidebarFilters);
    let filteredSchemes = currentScheme.filter((scheme) => {
      const name =
        typeof scheme.name === "string"
          ? scheme.name
          : scheme.name?.[currentLang] || scheme.name?.en || "";

      return safeString(name).includes(safeString(filteredInput));
    });

    const isSidebarFiltersEmptyOrDefault =
      !sidebarFilters ||
      Object.values(sidebarFilters).every(
        (value) =>
          value === null ||
          value === undefined ||
          value === "" ||
          value === "All" ||
          (Array.isArray(value) && value.length === 0) ||
          (value instanceof Set && value.size === 0)
      );

    if (isSidebarFiltersEmptyOrDefault) return filteredSchemes;

    // Age Group filter
    if (
      sidebarFilters.ageGroup &&
      sidebarFilters.ageGroup !== (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      const filterAgeMin = parseInt(sidebarFilters.ageGroup.split("-")[0]);
      const filterAgeMax = sidebarFilters.ageGroup.includes("-")
        ? parseInt(sidebarFilters.ageGroup.split("-")[1])
        : Infinity;

      filteredSchemes = filteredSchemes.filter((scheme) => {
        const ageGroup =
          typeof scheme.ageGroup === "string"
            ? scheme.ageGroup
            : scheme.ageGroup?.[currentLang] || scheme.ageGroup?.en || "";

        if (ageGroup === (currentLang === "en" ? "All" : "എല്ലാവരും"))
          return true;
        if (!ageGroup) return false;

        if (ageGroup.includes("-")) {
          const [min, max] = ageGroup.split("-").map(Number);
          return filterAgeMin <= max && filterAgeMax >= min;
        }

        if (ageGroup.includes("+")) {
          const min = parseInt(ageGroup.split("+")[0]);
          return filterAgeMax >= min;
        }

        return false;
      });
    }

    // Gender filter
    if (
      sidebarFilters.gender &&
      sidebarFilters.gender !== (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const gender =
          typeof scheme.gender === "string"
            ? scheme.gender
            : scheme.gender?.[currentLang] || scheme.gender?.en || "";
        return (
          gender === (currentLang === "en" ? "All" : "എല്ലാവരും") ||
          gender === sidebarFilters.gender
        );
      });
    }

    // Income Level filter
    if (
      sidebarFilters.incomeLevel &&
      sidebarFilters.incomeLevel !==
        (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const income =
          typeof scheme.incomeLevel === "string"
            ? scheme.incomeLevel
            : scheme.incomeLevel?.[currentLang] || scheme.incomeLevel?.en || "";
        return (
          income === (currentLang === "en" ? "All" : "എല്ലാവരും") ||
          income === sidebarFilters.incomeLevel
        );
      });
    }

    // Profession filter
    if (
      sidebarFilters.profession &&
      sidebarFilters.profession !== (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const profession =
          typeof scheme.profession === "string"
            ? scheme.profession
            : scheme.profession?.[currentLang] || scheme.profession?.en || "";
        return (
          profession === (currentLang === "en" ? "All" : "എല്ലാവരും") ||
          safeString(profession).includes(safeString(sidebarFilters.profession))
        );
      });
    }

    // Location filter
    if (
      sidebarFilters.location &&
      sidebarFilters.location !== (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const location =
          typeof scheme.location === "string"
            ? scheme.location
            : scheme.location?.[currentLang] || scheme.location?.en || "";
        const sidebarLocation = sidebarFilters.location.includes("/")
          ? sidebarFilters.location.split("/")
          : sidebarFilters.location;
        return (
          location === (currentLang === "en" ? "All" : "എല്ലാവരും") ||
          safeString(location).includes(safeString(sidebarLocation))
        );
      });
    }

    // ImplementedBy filter
    if (
      sidebarFilters.implementedBy &&
      sidebarFilters.implementedBy !==
        (currentLang === "en" ? "All" : "എല്ലാവരും")
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        //Used for schemes using key property with "implementingAgency"
        const agency =
          typeof scheme.implementingAgency === "string"
            ? scheme.implementingAgency
            : scheme.implementingAgency?.[currentLang] ||
              scheme.implementingAgency?.en ||
              "";

        //Used for schemes using key property with "implementedBy"
        const implementedBy =
          typeof scheme.implementedBy === "string"
            ? scheme.implementedBy
            : scheme.implementedBy?.[currentLang] ||
              scheme.implementedBy?.en ||
              [];

        return (
          safeString(agency).includes(
            safeString(sidebarFilters.implementedBy)
          ) || implementedBy.includes(sidebarFilters.implementedBy)
        );
      });
    }

    // Category / Social Category filter
    if (sidebarFilters.category && sidebarFilters.category.length > 0) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const categories = Array.isArray(scheme.socialCategory)
          ? scheme.socialCategory
          : scheme.socialCategory?.[currentLang] ||
            scheme.socialCategory?.en ||
            [];
        return categories.some((cat) => sidebarFilters.category.includes(cat));
      });
    }

    if (sidebarFilters.keywords && sidebarFilters.keywords.length > 0) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        // This correctly creates a Set of the scheme's keyword strings for fast lookups
        const schemeKeywords = new Set(
          scheme.keywords?.[currentLang] || scheme.keywords?.en || []
        );

        // Use .some() to check if any keyword from the filter exists in the scheme's keywords.
        // .some() stops and returns true as soon as it finds a match.
        return sidebarFilters.keywords.some((filterObject) => {
          // For each object in the filter array, check if its 'key' is in the scheme's keywords
          return schemeKeywords.has(filterObject.label?.[currentLang]);
        });
      });
    }

    return filteredSchemes;
  }, [inputValue, sidebarFilters, currentScheme, currentLang]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {schemesToDisplay.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Info className="h-5 w-5" />
            <p className="text-lg font-medium">No schemes to display</p>
          </div>
        </div>
      ) : (
        <ul className="grid auto-rows-min gap-4 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemesToDisplay.map((eachScheme) => (
            <li
              className="bg-muted/50 aspect-video rounded-xl p-5 gap-2.5 max-sm-w-[100vw]"
              key={eachScheme.id}
            >
              <h1 className="text-xl mb-3">
                {typeof eachScheme.name === "string"
                  ? eachScheme.name
                  : eachScheme.name?.[currentLang]}
              </h1>

              {eachScheme.location && (
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600 mt-3.5"
                >
                  <span>
                    {typeof eachScheme.location === "string"
                      ? eachScheme.location
                      : eachScheme.location?.[currentLang]}
                  </span>
                </Badge>
              )}

              {eachScheme.description && (
                <p className="text-md pt-6 pb-6">
                  {typeof eachScheme.description === "string"
                    ? eachScheme.description
                    : eachScheme.description?.[currentLang]}
                </p>
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

              <DialogCloseButton
                scheme={eachScheme}
                currentLang={currentLang}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchemeDisplay;
