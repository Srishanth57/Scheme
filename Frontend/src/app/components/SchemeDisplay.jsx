"use client";
import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DialogCloseButton } from "./DialogCloseButton";
import { useDashboardContext } from "app/dashboard/layout";
import StarRating from "./StarRating";
const SchemeDisplay = ({ scheme }) => {
  const { inputValue, sidebarFilters } = useDashboardContext();
  const currentScheme = scheme;

  const schemesToDisplay = useMemo(() => {
    console.log(inputValue);
    const filteredInput = inputValue || "";

    let filteredSchemes = currentScheme.filter(
      (scheme) =>
        typeof scheme.name === "string" &&
        scheme.name.toLowerCase().includes(filteredInput.toLowerCase())
    );
    if (
      !sidebarFilters ||
      Object.values(sidebarFilters).every(
        (value) =>
          value === null ||
          value === undefined ||
          value === "" ||
          value === "All" ||
          (Array.isArray(value) && value.length === 0)
      )
    ) {
      return filteredSchemes;
    }

    // Age Group filter
    if (sidebarFilters.ageGroup && sidebarFilters.ageGroup !== "All") {
      const filterAgeMin = parseInt(sidebarFilters.ageGroup.split("-")[0]);
      const filterAgeMax = sidebarFilters.ageGroup.includes("-")
        ? parseInt(sidebarFilters.ageGroup.split("-")[1])
        : Infinity;

      filteredSchemes = filteredSchemes.filter((scheme) => {
        if (scheme.ageGroup === "All") return true;

        if (scheme.ageGroup.includes("-")) {
          const schemeAgeMin = parseInt(scheme.ageGroup.split("-")[0]);
          const schemeAgeMax = parseInt(scheme.ageGroup.split("-")[1]);

          // Check if the filter range overlaps with scheme range
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
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          (Array.isArray(scheme.gender)
            ? scheme.gender.includes(sidebarFilters.gender)
            : scheme.gender === sidebarFilters.gender) ||
          scheme.gender === "All"
      );
    }

    // Income Level filter
    if (sidebarFilters.incomeLevel && sidebarFilters.incomeLevel !== "All") {
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          (Array.isArray(scheme.incomeLevel)
            ? scheme.incomeLevel.includes(sidebarFilters.incomeLevel)
            : scheme.incomeLevel === sidebarFilters.incomeLevel) ||
          scheme.incomeLevel === "All"
      );
    }

    // Profession filter
    if (sidebarFilters.profession && sidebarFilters.profession !== "All") {
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          scheme.profession
            .toLowerCase()
            .includes(sidebarFilters.profession.toLowerCase()) ||
          scheme.profession === "All"
      );
    }
    if (sidebarFilters.location && sidebarFilters.location !== "All") {
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          scheme.location
            .toLowerCase()
            .includes(sidebarFilters.location.toLowerCase()) ||
          scheme.location === "All"
      );
    }
    //Govt. schemes implemented By [GOK , GOI , LSGI]
    if (
      sidebarFilters.implementedBy &&
      sidebarFilters.implementedBy !== "All"
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) =>
        scheme.implementedBy.includes(sidebarFilters.implementedBy)
      );
 
    }

    // Category filter
    if (sidebarFilters.category && sidebarFilters.category.length > 0) {
      filteredSchemes = filteredSchemes.filter((scheme) => {
        const value = scheme.socialCategory.some((element) =>
          sidebarFilters.category.includes(element)
        );
        return value;
      });
    }

    return filteredSchemes;
  }, [inputValue, sidebarFilters, currentScheme]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {schemesToDisplay.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <h1>No schemems to display</h1>
        </div>
      ) : (
        <ul className="grid auto-rows-min gap-4 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemesToDisplay.map((eachScheme) => (
            <li
              className="bg-muted/50 aspect-video rounded-xl p-5 gap-2.5 max-sm-w-[100vw] "
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
              {/* {eachScheme.keywords.map((keyword) => (
              <Badge key={keyword} className="m-2 mt-0 mb-2">
                {keyword}
              </Badge>
            ))} */}
              <StarRating
                schemeId={scheme._id}
                initialUserRating={scheme.userRating} // if you preload what the user already gave
                average={scheme.avgRating}
                count={scheme.ratingCount}
              />

              <DialogCloseButton scheme={eachScheme} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchemeDisplay;
