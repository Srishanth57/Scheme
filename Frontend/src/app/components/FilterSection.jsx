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
import { useDashboardContext } from "app/dashboard/layout";

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
  location: ["All", "National", "Kerala", "Idukki, Kerala"],
  category: ["SC", "ST", "OBC", "General", "Disabled"],
  healthCategory: [
    "General",
    "Disabled",
    "Economically Weaker Section (EWS)",
    "Migrant Workers",
    "Children",
    "Senior Citizen",
    "Government Employees/Pensioners",
  ],
  implementedBy: ["Government of India", "Government of Kerala", "Local Self-Government Institutions","Registrar of Cooperative Societies"],
};

const initialFilters = {
  ageGroup: "All",
  gender: "All",
  incomeLevel: "All",
  profession: "All",
  location: "All",
  implementedBy: "All",

  category: [],
};

// Helper for display names of filters
const filterDisplayNames = {
  ageGroup: "Age Group",
  gender: "Gender",
  incomeLevel: "Income Level",
  profession: "Profession",
  location: "Location",
  implementedBy: "Implemented By",
  category: "Category",
};

export function FilterSection() {
  const { sidebarFilters, handleSidebarFilterChange, selectedTab } =
    useDashboardContext();
  const [selectedFilters, setSelectedFilters] = useState(
    sidebarFilters || initialFilters
  );

  const isDesktop = useMediaQuery("(min-width: 768px)"); // Tailwind's 'md' breakpoint

  useEffect(() => {
    setSelectedFilters(initialFilters);
    handleSidebarFilterChange(initialFilters);
  }, [selectedTab]);
  const handleSelectFilter = useCallback((filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? "All" : value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    const resetFilters = { ...initialFilters, category: [] };
    setSelectedFilters(resetFilters);
    handleSidebarFilterChange(resetFilters);
  }, [selectedTab]);

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
      handleSidebarFilterChange(selectedFilters);
    }
  }, [selectedFilters, isDesktop, handleSidebarFilterChange]);

  const applyFiltersForMobile = useCallback(() => {
    handleSidebarFilterChange(selectedFilters);
  }, [selectedFilters, handleSidebarFilterChange, selectedTab]);

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
          <Button variant="outline" className="w-[80%] justify-between ">
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
    <div>
      {selectedTab === "agriculture" && (
        <div className="p-4   md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
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

            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location}
              options={filterOptions.location}
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
                  checked={selectedFilters.category.includes(eachCategory)}
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
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "allScheme" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
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
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location}
              options={filterOptions.location}
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
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "healthCare" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
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
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location}
              options={filterOptions.location}
            />
            <Label
              htmlFor="healthCategory"
              className="text-sm font-medium text-muted-foreground"
            >
              Category
            </Label>
            {filterOptions.healthCategory.map((eachCategory) => (
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
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "disabled" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
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
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location}
              options={filterOptions.location}
            />

            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "national" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
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
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location}
              options={filterOptions.location}
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
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "children" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
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
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "caste" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
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
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTab === "governmentSchemes" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
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
              filterType="implementedBy"
              label={filterDisplayNames.implementedBy}
              options={filterOptions.implementedBy}
            />

            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  Apply filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
