"use client";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogCloseButton } from "./DialogCloseButton";
import { useDashboardContext } from "app/dashboard/layout";
import { Info, Star, MapPin, Users, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useAppContext } from "app/layout";

//Type safety check
const safeString = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

const SchemeDisplay = ({ scheme }) => {
  const pathname = usePathname();
  const { inputValue, sidebarFilters } = useDashboardContext();
  const { tags, setTags } = useAppContext();

  const currentScheme = scheme;

  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const schemesToDisplay = useMemo(() => {
    const filteredInput = inputValue || "";

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

    if (pathname === "/dashboard/allScheme" && tags !== undefined) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const schemeKeywords =
          scheme.keywords?.[currentLang] || scheme.keywords?.en || [];

        return schemeKeywords.some((keyword) => tags.includes(keyword));
      });
    }

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
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      {schemesToDisplay.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
              <Info className="h-8 w-8" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">No schemes found</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Try adjusting your filters or search terms to find relevant schemes.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid auto-rows-min gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemesToDisplay.map((eachScheme) => (
            <Card 
              key={eachScheme.id} 
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {typeof eachScheme.name === "string"
                      ? eachScheme.name
                      : eachScheme.name?.[currentLang]}
                  </CardTitle>
                </div>
                
                {eachScheme.location && (
                  <Badge
                    variant="secondary"
                    className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-800 font-medium"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {typeof eachScheme.location === "string"
                      ? eachScheme.location
                      : eachScheme.location?.[currentLang]}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {eachScheme.description && (
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {typeof eachScheme.description === "string"
                      ? eachScheme.description
                      : eachScheme.description?.[currentLang]}
                  </CardDescription>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-sm font-semibold">
                        {eachScheme.ratings?.avgRating?.toFixed(1) || "0.0"}
                      </span>
                      <Star className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>({eachScheme.ratings?.count || 0})</span>
                    </div>
                  </div>
                </div>

                <DialogCloseButton
                  scheme={eachScheme}
                  currentLang={currentLang}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemeDisplay;