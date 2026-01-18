import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button"; // Adjust path as per your project
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path as per your project
import { Label } from "@/components/ui/label"; // Adjust path as per your project
import { ChevronDownIcon, XIcon } from "lucide-react"; // Added XIcon for clear button
import { Checkbox } from "@/components/ui/checkbox";
import { useDashboardContext } from "app/dashboard/layout";
import Autocomplete from "./Autocomplete";
import { usePathname } from "next/navigation";

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
  ageGroup: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "0-10", ml: "0-10" },
    { en: "11-20", ml: "11-20" },
    { en: "21-30", ml: "21-30" },
    { en: "31-40", ml: "31-40" },
    { en: "41-50", ml: "41-50" },
    { en: "60-100", ml: "60-100" },
  ],
  gender: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "Male", ml: "പുരുഷൻ" },
    { en: "Female", ml: "സ്ത്രീ" },
    { en: "Other", ml: "മറ്റുള്ളവ" },
  ],
  incomeLevel: [
    { en: "All", ml: "എല്ലാവരും" },
    {
      en: "Below Poverty Line(BPL)",
      ml: "ദാരിദ്ര്യരേഖയ്ക്ക് താഴെയുള്ളവർ (BPL)",
    },
    { en: "Indebted", ml: "കടബാധ്യതയുള്ളവർ" },
    { en: "Low Income", ml: "കുറഞ്ഞ വരുമാനം" },
    { en: "Middle Income", ml: "ഇടത്തരം വരുമാനം" },
    { en: "High Income", ml: "ഉയർന്ന വരുമാനം" },
  ],
  profession: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "Farmer", ml: "കർഷകൻ" },
    { en: "Student", ml: "വിദ്യാർത്ഥി" },
    { en: "Employed", ml: "ജോലിയുള്ളവർ" },
    { en: "Unemployed", ml: "തൊഴിൽരഹിതർ" },
    { en: "Entrepreneur", ml: "സംരംഭകൻ" },
    { en: "Self-employed", ml: "സ്വയം തൊഴിൽ ചെയ്യുന്നവർ" },
    { en: "Retired", ml: "വിരമിച്ചവർ" },
  ],
  location: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "National / India", ml: "ദേശീയം / ഇന്ത്യ" },
    { en: "Kerala", ml: "കേരളം" },
    { en: "Idukki, Kerala", ml: "ഇടുക്കി, കേരളം" },
  ],
  category: [
    { en: "SC", ml: "പട്ടികജാതി" },
    { en: "ST", ml: "പട്ടികവർഗ്ഗം" },
    { en: "OBC", ml: "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ" },
    { en: "General", ml: "പൊതുവിഭാഗം" },
    { en: "Disabled", ml: "ഭിന്നശേഷിക്കാർ" },
  ],
  healthCategory: [
    { en: "General", ml: "പൊതുവിഭാഗം" },
    { en: "Disabled", ml: "ഭിന്നശേഷിക്കാർ" },
    {
      en: "Economically Weaker Section (EWS)",
      ml: "സാമ്പത്തികമായി പിന്നോക്കം നിൽക്കുന്ന വിഭാഗം (EWS)",
    },
    { en: "Migrant Workers", ml: "അതിഥി തൊഴിലാളികൾ" },
    { en: "Children", ml: "കുട്ടികൾ" },
    { en: "Senior Citizen", ml: "മുതിർന്ന പൗരന്മാർ" },
    {
      en: "Government Employees/Pensioners",
      ml: "സർക്കാർ ജീവനക്കാർ/പെൻഷൻകാർ",
    },
  ],
  implementedBy: [
    { en: "Government of India", ml: "കേന്ദ്ര സർക്കാർ" },
    { en: "Government of Kerala", ml: "കേരള സർക്കാർ" },
    {
      en: "Local Self-Government Institutions",
      ml: "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ",
    },
    {
      en: "Registrar of Cooperative Societies",
      ml: "സഹകരണസംഘം രജിസ്ട്രാർ",
    },
  ],
};

// Helper for display names of filters
const filterDisplayNames = {
  ageGroup: { en: "Age Group", ml: "പ്രായപരിധി" },
  gender: { en: "Gender", ml: "ലിംഗം" },
  incomeLevel: { en: "Income Level", ml: "വരുമാന നിലവാരം" },
  profession: { en: "Profession", ml: "തൊഴിൽ" },
  location: { en: "Location", ml: "സ്ഥലം" },
  implementedBy: { en: "Implemented By", ml: "നടപ്പിലാക്കുന്നത്" },
  category: { en: "Category", ml: "വിഭാഗം" },
};

export function FilterSection() {
  const {
    sidebarFilters,
    handleSidebarFilterChange,
    selectedTab,
    currentLang,
  } = useDashboardContext();

  const pathname = usePathname();
  const initialFilters = {
    ageGroup: currentLang === "en" ? "All" : "എല്ലാവരും",
    gender: currentLang === "en" ? "All" : "എല്ലാവരും",
    incomeLevel: currentLang === "en" ? "All" : "എല്ലാവരും",
    profession: currentLang === "en" ? "All" : "എല്ലാവരും",
    location: currentLang === "en" ? "All" : "എല്ലാവരും",
    implementedBy: currentLang === "en" ? "All" : "എല്ലാവരും",
    category: [],
    keywords: [],
  };

  const [selectedFilters, setSelectedFilters] = useState(
    sidebarFilters || initialFilters
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setSelectedFilters(initialFilters);
    handleSidebarFilterChange(initialFilters);
  }, [selectedTab, currentLang]);

  const handleSelectFilter = useCallback(
    (filterType, value) => {
      const newValue =
        sidebarFilters[filterType] === value
          ? currentLang === "en"
            ? "All"
            : "എല്ലാവരും"
          : value;
      handleSidebarFilterChange({ [filterType]: newValue });
    },
    [currentLang, handleSidebarFilterChange, sidebarFilters]
  );

  const clearFilters = useCallback(() => {
    const resetFilters = {
      ageGroup: currentLang === "en" ? "All" : "എല്ലാവരും",
      gender: currentLang === "en" ? "All" : "എല്ലാവരും",
      incomeLevel: currentLang === "en" ? "All" : "എല്ലാവരും",
      profession: currentLang === "en" ? "All" : "എല്ലാവരും",
      location: currentLang === "en" ? "All" : "എല്ലാവരും",
      implementedBy: currentLang === "en" ? "All" : "എല്ലാവരും",
      category: [],
      keywords: [],
    };
    handleSidebarFilterChange(resetFilters);
  }, [currentLang, handleSidebarFilterChange]);

  // Update the handleCheckboxChange function
  const handleCheckboxChange = useCallback(
    (filterType, value, checked) => {
      setSelectedFilters((prev) => {
        const updatedValues = checked
          ? [...(prev[filterType] || []), value]
          : prev[filterType].filter((item) => item !== value);

        // Update sidebar filters immediately
        handleSidebarFilterChange({
          ...prev,
          [filterType]: updatedValues,
        });

        return {
          ...prev,
          [filterType]: updatedValues,
        };
      });
    },
    [handleSidebarFilterChange]
  );

  useEffect(() => {
    if (isDesktop) {
      handleSidebarFilterChange(selectedFilters);
    }
  }, [selectedFilters, isDesktop, handleSidebarFilterChange, currentLang]);

  // And update your applyFiltersForMobile function:
  const applyFiltersForMobile = useCallback(() => {
    console.log("Applying mobile filters:", selectedFilters); // Debug log
    handleSidebarFilterChange(selectedFilters);
  }, [selectedFilters, handleSidebarFilterChange]);

  // Also update your areFiltersApplied function:
  const areFiltersApplied = useCallback(() => {
    const isCategoryFiltered =
      selectedFilters.category && selectedFilters.category.length > 0;
    const isKeywordFiltered =
      selectedFilters.keywords && selectedFilters.keywords.length > 0;
    const isSingleSelectFiltered = Object.keys(initialFilters).some(
      (key) =>
        key !== "category" &&
        key !== "keywords" &&
        selectedFilters[key] !== initialFilters[key]
    );
    return isCategoryFiltered || isSingleSelectFiltered || isKeywordFiltered;
  }, [selectedFilters, initialFilters, currentLang]);

  const FilterDropdown = ({ filterType, label, options }) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <Label
          htmlFor={filterType}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[80%] justify-between">
              <span className="truncate pr-1">
                {Array.isArray(sidebarFilters[filterType])
                  ? sidebarFilters[filterType].length > 0
                    ? sidebarFilters[filterType].join(", ")
                    : `${
                        currentLang === "en"
                          ? "Select " + label
                          : label + " തിരഞ്ഞെടുക്കുക"
                      }`
                  : sidebarFilters[filterType] !==
                    (currentLang === "en" ? "All" : "എല്ലാവരും")
                  ? sidebarFilters[filterType]
                  : `${
                      currentLang === "en"
                        ? "Select " + label
                        : label + " തിരഞ്ഞെടുക്കുക"
                    }`}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" sideOffset={5}>
            {/* Show clear selection for single-select dropdowns if not 'All' */}
            {!Array.isArray(sidebarFilters[filterType]) &&
              sidebarFilters[filterType] !== ("All" || "എല്ലാവരും") && (
                <>
                  <DropdownMenuCheckboxItem
                    onSelect={() => {
                      const value = currentLang === "en" ? "All" : "എല്ലാവരും";
                      return handleSelectFilter(filterType, value);
                    }} // Deselect to "All"
                    className="text-destructive focus:text-destructive"
                  >
                    {currentLang === "en"
                      ? "Clear selection"
                      : "തിരഞ്ഞെടുത്തത് ഒഴിവാക്കുക"}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                </>
              )}
            {/* For single-select (e.g., ageGroup, gender) */}
            {!Array.isArray(sidebarFilters[filterType])
              ? options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option?.[currentLang]}
                    checked={
                      sidebarFilters[filterType] === option?.[currentLang]
                    }
                    onCheckedChange={() =>
                      handleSelectFilter(filterType, option?.[currentLang])
                    }
                  >
                    {option?.[currentLang]}
                  </DropdownMenuCheckboxItem>
                ))
              : // For multi-select (e.g., category)
                options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option?.[currentLang]}
                    checked={sidebarFilters[filterType].includes(
                      option?.[currentLang]
                    )}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        filterType,
                        option?.[currentLang],
                        checked
                      )
                    }
                  >
                    {option?.[currentLang]}
                  </DropdownMenuCheckboxItem>
                ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <div>
      {selectedTab === "agriculture" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />
            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />
            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "allScheme" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />
            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />
            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "healthCare" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />
            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />
            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="healthCategory"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.healthCategory.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "disabled" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />
            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />
            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "national" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />
            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />
            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />
            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "children" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "caste" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="profession"
              label={filterDisplayNames.profession?.[currentLang]}
              options={filterOptions.profession}
            />

            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "women" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />

            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />

            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />

            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-[#688E26]"
                >
                  {currentLang === "en"
                    ? "Apply filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "elderly" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "": currentLang === "ml",
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="ageGroup"
              label={filterDisplayNames.ageGroup?.[currentLang]}
              options={filterOptions.ageGroup}
            />

            <FilterDropdown
              filterType="gender"
              label={filterDisplayNames.gender?.[currentLang]}
              options={filterOptions.gender}
            />

            <FilterDropdown
              filterType="incomeLevel"
              label={filterDisplayNames.incomeLevel?.[currentLang]}
              options={filterOptions.incomeLevel}
            />

            <FilterDropdown
              filterType="location"
              label={filterDisplayNames.location?.[currentLang]}
              options={filterOptions.location}
            />
            <Label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              {filterDisplayNames.category?.[currentLang]}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={sidebarFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {!isDesktop && (
              <div className="flex gap-3 mt-6 px-1">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="
        flex-1 h-11 text-sm font-medium
        border-2 border-red-200 dark:border-red-800
        bg-red-50 dark:bg-red-950
        text-red-700 dark:text-red-300
        hover:bg-red-100 dark:hover:bg-red-900
        hover:border-red-300 dark:hover:border-red-700
        active:bg-red-200 dark:active:bg-red-800
        transition-all duration-200
        focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        rounded-lg shadow-sm
      "
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  {currentLang === "en" ? "Clear All" : "എല്ലാം മായ്ക്കുക"}
                </Button>

                <Button
                  variant="outline"
                  onClick={applyFiltersForMobile}
                  className="
        flex-1 h-11 text-sm font-medium
        border-2 border-green-200 dark:border-green-800
        bg-green-50 dark:bg-green-950
        text-green-700 dark:text-green-300
        hover:bg-green-100 dark:hover:bg-green-900
        hover:border-green-300 dark:hover:border-green-700
        active:bg-green-200 dark:active:bg-green-800
        transition-all duration-200
        focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
        rounded-lg shadow-sm
      "
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  {currentLang === "en"
                    ? "Apply Filters"
                    : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === "governmentSchemes" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
          <div className="flex flex-row justify-between items-center">
            <span
              className={clsx(" font-semibold  tracking-tight", {
                "text-2xl ": currentLang === "en",
                "text-xl": currentLang === "ml", // Fixed: Added proper Malayalam text size
              })}
            >
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </span>
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center ml-1"
              >
                <XIcon className="h-4 w-4  sm:mr-1" />
                {currentLang === "en" ? "Clear all" : "മായ്ക്കുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="implementedBy"
              label={filterDisplayNames.implementedBy?.[currentLang]}
              options={filterOptions.implementedBy}
            />
            <Autocomplete
              onKeywordsChange={(keywords) => {
                // Update selectedFilters for mobile behavior
                setSelectedFilters((prev) => ({
                  ...prev,
                  keywords: keywords,
                }));
              }}
              currentKeywords={selectedFilters.keywords || []}
              isDesktop={isDesktop}
            />
            {!isDesktop && (
              <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                <Button
                  variant="default"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-red-500 hover:bg-red-600 text-white border-red-500"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  <span className="truncate">
                    {currentLang === "en" ? "Clear all" : "എല്ലാം മായ്ക്കുക"}
                  </span>
                </Button>
                <Button
                  variant="default"
                  onClick={applyFiltersForMobile}
                  className="text-sm px-2 flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600"
                >
                  <span className="truncate">
                    {currentLang === "en"
                      ? "Apply filters"
                      : "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക"}
                  </span>
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
