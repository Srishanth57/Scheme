import React, { useState, useEffect, useCallback } from "react";
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
    { en: "Other", ml: "മറ്റുള്ളത്" },
  ],
  incomeLevel: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "Below Poverty Line(BPL)", ml: "ദാരിദ്ര്യ രേഖയ്ക്ക് താഴെ (BPL)" },
    { en: "Marginal", ml: "ചെറുകിട" },
    { en: "Indebted", ml: "കടത്തിലുള്ളത്" },
    { en: "Low Income", ml: "കുറഞ്ഞ വരുമാനം" },
    { en: "Middle Income", ml: "ഇടത്തരം വരുമാനം" },
    { en: "High Income", ml: "ഉയർന്ന വരുമാനം" },
  ],
  profession: [
    { en: "All", ml: "എല്ലാവരും" },
    { en: "Farmer", ml: "കർഷകൻ" },
    { en: "Student", ml: "വിദ്യാർത്ഥി" },
    { en: "Employed", ml: "തൊഴിലിലുള്ളത്" },
    { en: "Unemployed", ml: "തൊഴില്ലാത്തത്" },
    { en: "Entrepreneur", ml: "ഉദ്യോഗസ്ഥൻ" },
    { en: "Self-employed", ml: "സ്വയംതൊഴിലാളി" },
    { en: "Retired", ml: "വിശ്രമപ്രാപ്തനായത്" },
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
      ml: "സാമ്പത്തികമായി ദുർബലരായ വിഭാഗം (EWS)",
    },
    { en: "Migrant Workers", ml: "അതിഥി തൊഴിലാളികൾ" },
    { en: "Children", ml: "കുട്ടികൾ" },
    { en: "Senior Citizen", ml: "മുതിർന്ന പൗരൻ" },
    {
      en: "Government Employees/Pensioners",
      ml: "സർക്കാർ ജീവനക്കാർ/പെൻഷൻകാർ",
    },
  ],
  implementedBy: [
    { en: "Government of India", ml: "ഭാരത സർക്കാരിന്‍റേത്" },
    { en: "Government of Kerala", ml: "കേരള സർക്കാരിന്‍റേത്" },
    { en: "Local Self-Government Institutions", ml: "സ്ഥാപിത ഭരണ സ്ഥാപനങ്ങൾ" },
    {
      en: "Registrar of Cooperative Societies",
      ml: "കോപറേറ്റീവ് സൊസൈറ്റികളുടെ രജിസ്ട്രാർ",
    },
  ],
};

// Helper for display names of filters
const filterDisplayNames = {
  ageGroup: { en: "Age Group", ml: "പ്രായ ശ്രേണി" },
  gender: { en: "Gender", ml: "ലിംഗം" },
  incomeLevel: { en: "Income Level", ml: "വരുമാന നിരപ്പ്" },
  profession: { en: "Profession", ml: "തൊഴിൽ" },
  location: { en: "Location", ml: "പ്രദേശം" },
  implementedBy: { en: "Implemented By", ml: "പ്രവർത്തിപ്പിക്കുന്നത്" },
  category: { en: "Category", ml: "വർഗ്ഗം" },
};

export function FilterSection() {
  const {
    sidebarFilters,
    handleSidebarFilterChange,
    selectedTab,
    currentLang,
  } = useDashboardContext();

  const initialFilters = {
    ageGroup: currentLang === "en" ? "All" : "എല്ലാവരും",
    gender: currentLang === "en" ? "All" : "എല്ലാവരും",
    incomeLevel: currentLang === "en" ? "All" : "എല്ലാവരും",
    profession: currentLang === "en" ? "All" : "എല്ലാവരും",
    location: currentLang === "en" ? "All" : "എല്ലാവരും",
    implementedBy: currentLang === "en" ? "All" : "എല്ലാവരും",
    category: [],
  };

  const [selectedFilters, setSelectedFilters] = useState(
    sidebarFilters || initialFilters
  );

  const isDesktop = useMediaQuery("(min-width: 768px)"); // Tailwind's 'md' breakpoint

  useEffect(() => {
    setSelectedFilters(initialFilters);
    handleSidebarFilterChange(initialFilters);
  }, [selectedTab, currentLang]);

  const handleSelectFilter = useCallback(
    (filterType, value) => {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]:
          prevFilters[filterType] === value
            ? currentLang === "en"
              ? "All"
              : "എല്ലാവരും"
            : value,
      }));
    },
    [currentLang]
  );

  const clearFilters = useCallback(() => {
    const resetFilters = { ...initialFilters, category: [] };
    setSelectedFilters(resetFilters);
    handleSidebarFilterChange(resetFilters);
  }, [selectedTab, currentLang]);

  const handleCheckboxChange = useCallback(
    (filterType, value, checked) => {
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
    },
    [currentLang]
  );

  useEffect(() => {
    if (isDesktop) {
      handleSidebarFilterChange(selectedFilters);
    }
  }, [selectedFilters, isDesktop, handleSidebarFilterChange, currentLang]);

  const applyFiltersForMobile = useCallback(() => {
    handleSidebarFilterChange(selectedFilters);
  }, [selectedFilters, handleSidebarFilterChange, selectedTab, currentLang]);

  // Check if any filters are applied (for showing/hiding clear button)
  const areFiltersApplied = useCallback(() => {
    const isCategoryFiltered = selectedFilters.category.length > 0;
    const isSingleSelectFiltered = Object.keys(initialFilters).some(
      (key) =>
        key !== "category" && selectedFilters[key] !== initialFilters[key]
    );
    return isCategoryFiltered || isSingleSelectFiltered;
  }, [selectedFilters, currentLang]);

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
                  : `${
                      currentLang === "en"
                        ? "Select " + label
                        : label + "തിരഞ്ഞെടുക്കുക"
                    }`
                : selectedFilters[filterType] !==
                  (currentLang === "en" ? "All" : "എല്ലാവരും")
                ? selectedFilters[filterType]
                : `${
                    currentLang === "en"
                      ? "Select " + label
                      : label + "തിരഞ്ഞെടുക്കുക"
                  }`}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" sideOffset={5}>
          {/* Show clear selection for single-select dropdowns if not 'All' */}
          {!Array.isArray(selectedFilters[filterType]) &&
            selectedFilters[filterType] !== ("All" || "എല്ലാവരും") && (
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
                    : "തെരഞ്ഞെടുപ്പ് ഒഴിവാക്കുക"}
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
              </>
            )}
          {/* For single-select (e.g., ageGroup, gender) */}
          {!Array.isArray(selectedFilters[filterType])
            ? options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option?.[currentLang]}
                  checked={
                    selectedFilters[filterType] === option?.[currentLang]
                  }
                  onCheckedChange={() =>
                    handleSelectFilter(filterType, option?.[currentLang])
                  }
                >
                  {option?.[currentLang]}
                </DropdownMenuCheckboxItem>
              ))
            : // For multi-select (e.g., category - though category is handled by checkboxes directly)
              // This part might not be needed if category is only via checkboxes
              options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option?.[currentLang]}
                  checked={selectedFilters[filterType].includes(
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

  return (
    <div>
      {selectedTab === "agriculture" && (
        <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.healthCategory.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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

            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang] || eachCategory;
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
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
              {currentLang === "en" ? "Category" : "വിഭാഗം"}
            </Label>
            {filterOptions.category.map((eachCategory) => {
              const category = eachCategory?.[currentLang];
              return (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("category", category, checked);
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              );
            })}
            {/* Action buttons visible only on mobile (max-md) */}
            {!isDesktop && ( // Use !isDesktop for mobile-only visibility
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm px-2 flex-1 bg-[#FD151B]"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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

      {selectedTab === "governmentSchemes" && (
        <div className="min-md:pl-13 pl-7 p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {currentLang === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
            </h2>
            {/* Show Clear all button on desktop, hide on mobile */}
            {areFiltersApplied() && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-2 hidden md:flex items-center" // Show only on md and up
              >
                <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
                {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <FilterDropdown
              filterType="implementedBy"
              label={filterDisplayNames.implementedBy?.[currentLang]}
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
                  {currentLang === "en" ? "Clear all" : "എല്ലാം നീക്കം ചെയ്യുക"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={applyFiltersForMobile} // Use the new function for mobile apply
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
    </div>
  );
}

export default FilterSection;
