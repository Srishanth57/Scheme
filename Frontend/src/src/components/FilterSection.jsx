import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Adjust path as per your project
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path as per your project
import { Label } from "@/components/ui/label"; // Adjust path as per your project
import { ChevronDownIcon, XIcon } from "lucide-react"; // Added XIcon for clear button
import { Checkbox } from "@/components/ui/checkbox";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches); // Initial check

      const handler = (event) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }
    return undefined; // Return undefined if window is not defined
  }, [query]);

  return matches;
}

// Define your filter options here
const filterOptions = {
  ageGroup: ["All", "0-10", "11-20", "21-30", "31-40", "41-50", "60-100"],
  gender: ["All", "Male", "Female", "Other"],
  incomeLevel: [
    "All",
    "Below Poverty Line(BPL)",
    "Marginal",
    "Indebted",
    "Low Income",
    "Middle Income",
    "High Income",
  ],
  profession: [
    "All",
    "Farmer", 
    "Student",
    "Employed",
    "Unemployed",
    "Entrepreneur",
    "Self-employed",
    "Retired",
  ],
  category: ["SC", "ST", "OBC", "General", "Disabled"],
};

const initialFilters = {
  ageGroup: "All",
  gender: "All",
  incomeLevel: "All",
  profession: "All",
  category: [],
};

// Helper for display names of filters
const filterDisplayNames = {
  ageGroup: "Age Group",
  gender: "Gender",
  incomeLevel: "Income Level",
  profession: "Profession",
  location: "Location",
  category: "Category",
};

export function FilterSection({ filters, updateAndShowSchemes }) {
  const [selectedFilters, setSelectedFilters] = useState(
    filters || initialFilters
  );
  // Use the custom hook to detect if it's a desktop device (md breakpoint and up)
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Tailwind's 'md' breakpoint

  const handleSelectFilter = useCallback((filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? "All" : value,
    }));
  }, []);

  const clearFilters = () => {
    const resetFilters = { ...initialFilters, category: [] };
    setSelectedFilters(resetFilters);
    updateAndShowSchemes(resetFilters);
  };

  const handleCheckboxChange = useCallback((filterType, value, checked) => {
    setSelectedFilters((prevFilters) => {
      let updatedValues = prevFilters[filterType] || [];
      if (checked) {
        updatedValues = [...updatedValues, value];
      } else {
        updatedValues = updatedValues.filter((item) => item !== value);
      }
      return {
        ...prevFilters,
        [filterType]: updatedValues,
      };
    });
  }, []);

  useEffect(() => {
    if (isDesktop) {
      // Only call updateAndShowSchemes automatically if on desktop
      updateAndShowSchemes(selectedFilters);
    }
  }, [selectedFilters, isDesktop, updateAndShowSchemes]); // Depend on selectedFilters and isDesktop

  // This function is now explicitly called by the "Apply Filters" button on mobile
  const applyFiltersForMobile = useCallback(() => {
    updateAndShowSchemes(selectedFilters);
  }, [selectedFilters, updateAndShowSchemes]);

  // Check if any filters are applied (for showing/hiding clear button)
  const areFiltersApplied = useCallback(() => {
    const isCategoryFiltered = selectedFilters.category.length > 0;
    const isSingleSelectFiltered = Object.keys(initialFilters).some(
      (key) =>
        key !== "category" && selectedFilters[key] !== initialFilters[key]
    );
    return isCategoryFiltered || isSingleSelectFiltered;
  }, [selectedFilters]);

  const FilterDropdown = ({ filterType, label, options }) => (
    <div className="flex flex-col space-y-1.5 w-full">
      <Label
        htmlFor={filterType}
        className="text-sm font-medium text-muted-foreground"
      >
        {label}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="truncate pr-1">
              {/* Display selected value(s) for single select */}
              {Array.isArray(selectedFilters[filterType])
                ? selectedFilters[filterType].length > 0
                  ? selectedFilters[filterType].join(", ")
                  : `Select ${label}`
                : selectedFilters[filterType] !== "All"
                ? selectedFilters[filterType]
                : `Select ${label}`}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" sideOffset={5}>
          {/* Show clear selection for single-select dropdowns if not 'All' */}
          {!Array.isArray(selectedFilters[filterType]) &&
            selectedFilters[filterType] !== "All" && (
              <>
                <DropdownMenuCheckboxItem
                  onSelect={() => handleSelectFilter(filterType, "All")} // Deselect to "All"
                  className="text-destructive focus:text-destructive"
                >
                  Clear selection
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
              </>
            )}
          {/* For single-select (e.g., ageGroup, gender) */}
          {!Array.isArray(selectedFilters[filterType])
            ? options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={selectedFilters[filterType] === option}
                  onCheckedChange={() => handleSelectFilter(filterType, option)}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))
            : // For multi-select (e.g., category - though category is handled by checkboxes directly)
              // This part might not be needed if category is only via checkboxes
              options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={selectedFilters[filterType].includes(option)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(filterType, option, checked)
                  }
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Filters
        </h2>
        {/* Show Clear all button on desktop, hide on mobile */}
        {areFiltersApplied() && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
          >
            <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-y-5">
        <FilterDropdown
          filterType="ageGroup"
          label={filterDisplayNames.ageGroup}
          options={filterOptions.ageGroup}
        />
        <FilterDropdown
          filterType="gender"
          label={filterDisplayNames.gender}
          options={filterOptions.gender}
        />
        <FilterDropdown
          filterType="incomeLevel"
          label={filterDisplayNames.incomeLevel}
          options={filterOptions.incomeLevel}
        />
        <FilterDropdown
          filterType="profession"
          label={filterDisplayNames.profession}
          options={filterOptions.profession}
        />

        <Label
          htmlFor="category"
          className="text-sm font-medium text-muted-foreground"
        >
          Category
        </Label>
        {filterOptions.category.map((eachCategory) => (
          <div key={eachCategory} className="flex items-center gap-3">
            <Checkbox
              id={eachCategory}
              checked={selectedFilters.category.includes(eachCategory)} // Ensure checked state is correct
              onCheckedChange={(checked) => {
                handleCheckboxChange("category", eachCategory, checked);
              }}
            />
            <Label htmlFor={eachCategory}>{eachCategory}</Label>
          </div>
        ))}

        {/* Action buttons visible only on mobile (max-md) */}
        {!isDesktop && ( // Use !isDesktop for mobile-only visibility
          <div className="flex justify-between gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-sm px-2 flex-1"
            >
              <XIcon className="h-4 w-4 mr-1" />
              Clear all
            </Button>
            <Button
              onClick={applyFiltersForMobile} // Use the new function for mobile apply
              className="text-sm px-2 flex-1"
            >
              Apply filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSection;
