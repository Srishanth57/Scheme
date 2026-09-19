import React, { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import { Button } from "shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "shared/components/ui/dropdown-menu";
import { Label } from "shared/components/ui/label";
import { ChevronDownIcon, XIcon, Filter } from "lucide-react";
import { Checkbox } from "shared/components/ui/checkbox";
import { useDashboardContext } from "app/dashboard/layout";
import Autocomplete from "./Autocomplete";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import {
  FILTER_OPTIONS,
  FILTER_DISPLAY_NAMES,
  INITIAL_FILTERS,
  TAB_FILTER_CONFIGS,
  UI_STRINGS,
  getTabFromPathname,
} from "shared/lib/filterConfig";

// ---------------------------------------------------------------------------
// Sub-Components (defined outside FilterSection to avoid re-mounting)
// ---------------------------------------------------------------------------

/**
 * FilterPanelHeader — the "Filters" heading + optional "Clear all" button.
 */
function FilterPanelHeader({ currentLang, showClearButton, onClear }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <span
        className={clsx("font-semibold tracking-tight", {
          "text-2xl": currentLang === "en",
          "text-xl": currentLang === "ml",
        })}
      >
        {UI_STRINGS.filtersHeading[currentLang]}
      </span>
      {showClearButton && (
        <Button
          variant="ghost"
          onClick={onClear}
          className="text-sm px-2 hidden md:flex items-center ml-1"
        >
          <XIcon className="h-4 w-4 sm:mr-1" />
          {UI_STRINGS.clearAllShort[currentLang]}
        </Button>
      )}
    </div>
  );
}

/**
 * MobileFilterActions — "Clear all" + "Apply filters" buttons (mobile only).
 */
function MobileFilterActions({ currentLang, onClear, onApply }) {
  return (
    <div className="flex gap-3 mt-6 px-1">
      <Button
        variant="outline"
        onClick={onClear}
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
        {UI_STRINGS.clearAll[currentLang]}
      </Button>

      <Button
        variant="outline"
        onClick={onApply}
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
        <Filter className="h-4 w-4 mr-2" />
        {UI_STRINGS.applyFilters[currentLang]}
      </Button>
    </div>
  );
}

/**
 * FilterDropdown — A single dropdown filter (single-select or multi-select).
 *
 * Reads from `selectedFilters` (local state) for immediate UI feedback,
 * while the parent decides when to push changes to the global context.
 */
function FilterDropdown({
  filterType,
  label,
  options,
  currentValue,
  currentLang,
  onSelectFilter,
  onCheckboxChange,
}) {
  const isMultiSelect = Array.isArray(currentValue);

  /** Build the trigger button label based on current selection. */
  const triggerLabel = useMemo(() => {
    if (isMultiSelect) {
      if (currentValue.length > 0) {
        return options
          .filter((opt) => currentValue.includes(opt.en))
          .map((opt) => opt[currentLang])
          .join(", ");
      }
    } else if (currentValue !== "All") {
      const match = options.find((opt) => opt.en === currentValue);
      if (match) return match[currentLang];
      return currentValue;
    }

    // Fallback: placeholder text
    return currentLang === "en"
      ? `${UI_STRINGS.selectPrefix.en}${label}`
      : `${label}${UI_STRINGS.selectSuffix.ml}`;
  }, [currentValue, options, currentLang, label, isMultiSelect]);

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
            <span className="truncate pr-1">{triggerLabel}</span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" sideOffset={5}>
          {/* Clear selection action — only for single-select with a non-default value */}
          {!isMultiSelect && currentValue !== "All" && (
            <>
              <DropdownMenuCheckboxItem
                onSelect={() => onSelectFilter(filterType, "All")}
                className="text-destructive focus:text-destructive"
              >
                {UI_STRINGS.clearSelection[currentLang]}
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Option items */}
          {!isMultiSelect
            ? options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.en}
                  checked={currentValue === option.en}
                  onCheckedChange={() =>
                    onSelectFilter(filterType, option.en)
                  }
                >
                  {option[currentLang]}
                </DropdownMenuCheckboxItem>
              ))
            : options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.en}
                  checked={currentValue.includes(option.en)}
                  onCheckedChange={(checked) =>
                    onCheckboxChange(filterType, option.en, checked)
                  }
                >
                  {option[currentLang]}
                </DropdownMenuCheckboxItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/**
 * CategoryCheckboxGroup — renders a labelled list of checkboxes.
 */
function CategoryCheckboxGroup({
  options,
  selectedValues,
  currentLang,
  onCheckboxChange,
}) {
  return (
    <>
      <Label
        htmlFor="category"
        className="text-sm font-medium text-muted-foreground"
      >
        {FILTER_DISPLAY_NAMES.category[currentLang]}
      </Label>
      {options.map((option) => {
        const categoryLabel = option[currentLang];
        const categoryValue = option.en;
        return (
          <div key={categoryValue} className="flex items-center gap-3">
            <Checkbox
              id={categoryValue}
              checked={selectedValues.includes(categoryValue)}
              onCheckedChange={(checked) =>
                onCheckboxChange("category", categoryValue, checked)
              }
            />
            <Label htmlFor={categoryValue}>{categoryLabel}</Label>
          </div>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main FilterSection Component
// ---------------------------------------------------------------------------

export function FilterSection() {
  const { sidebarFilters, handleSidebarFilterChange, currentLang } =
    useDashboardContext();

  const pathname = usePathname();
  const selectedTab = getTabFromPathname(pathname);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Local copy of filters — allows mobile to buffer changes before applying
  const [selectedFilters, setSelectedFilters] = useState(
    sidebarFilters || INITIAL_FILTERS
  );

  // Sync local state when the global context changes (e.g. on external reset)
  useEffect(() => {
    if (sidebarFilters) setSelectedFilters(sidebarFilters);
  }, [sidebarFilters]);

  // Reset filters when the active tab changes
  useEffect(() => {
    setSelectedFilters(INITIAL_FILTERS);
    handleSidebarFilterChange(INITIAL_FILTERS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  // --- Event Handlers ---

  /** Toggle a single-select filter between the chosen value and "All". */
  const handleSelectFilter = useCallback(
    (filterType, value) => {
      const newValue = selectedFilters[filterType] === value ? "All" : value;
      const updated = { ...selectedFilters, [filterType]: newValue };
      setSelectedFilters(updated);

      // On desktop, push immediately; on mobile, wait for "Apply"
      if (isDesktop) handleSidebarFilterChange({ [filterType]: newValue });
    },
    [isDesktop, handleSidebarFilterChange, selectedFilters]
  );

  /** Add or remove a value from a multi-select filter (checkboxes). */
  const handleCheckboxChange = useCallback(
    (filterType, value, checked) => {
      const currentList = selectedFilters[filterType] || [];
      const updatedList = checked
        ? [...currentList, value]
        : currentList.filter((item) => item !== value);

      setSelectedFilters({ ...selectedFilters, [filterType]: updatedList });

      if (isDesktop) handleSidebarFilterChange({ [filterType]: updatedList });
    },
    [isDesktop, handleSidebarFilterChange, selectedFilters]
  );

  /** Reset all filters to their initial state. */
  const clearFilters = useCallback(() => {
    setSelectedFilters(INITIAL_FILTERS);
    handleSidebarFilterChange(INITIAL_FILTERS);
  }, [handleSidebarFilterChange]);

  /** Mobile only: push the buffered local state to the global context. */
  const applyFiltersForMobile = useCallback(() => {
    handleSidebarFilterChange(selectedFilters);
  }, [selectedFilters, handleSidebarFilterChange]);

  /** Returns true if any filter is in a non-default state. */
  const hasActiveFilters = useMemo(() => {
    const hasCategoryFilter =
      selectedFilters.category && selectedFilters.category.length > 0;
    const hasKeywordFilter =
      selectedFilters.keywords && selectedFilters.keywords.length > 0;
    const hasSingleSelectFilter = Object.keys(INITIAL_FILTERS).some(
      (key) =>
        key !== "category" &&
        key !== "keywords" &&
        selectedFilters[key] !== "All"
    );
    return hasCategoryFilter || hasSingleSelectFilter || hasKeywordFilter;
  }, [selectedFilters]);

  // --- Resolve Tab Configuration ---

  const tabConfig = TAB_FILTER_CONFIGS[selectedTab];

  // Tabs without a config entry don't show a sidebar (e.g. future tabs)
  if (!tabConfig) return null;

  const categoryOptions = tabConfig.categoryCheckboxSource
    ? FILTER_OPTIONS[tabConfig.categoryCheckboxSource]
    : null;

  // --- Render ---

  return (
    <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full md:w-full lg:w-auto min-md:pl-13 pl-7">
      <FilterPanelHeader
        currentLang={currentLang}
        showClearButton={hasActiveFilters}
        onClear={clearFilters}
      />

      <div className="flex flex-col gap-y-5">
        {/* Dropdown filters — driven by tabConfig.dropdowns */}
        {tabConfig.dropdowns.map((filterType) => (
          <FilterDropdown
            key={filterType}
            filterType={filterType}
            label={FILTER_DISPLAY_NAMES[filterType]?.[currentLang]}
            options={FILTER_OPTIONS[filterType]}
            currentValue={selectedFilters[filterType]}
            currentLang={currentLang}
            onSelectFilter={handleSelectFilter}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}

        {/* Category checkboxes — driven by tabConfig.categoryCheckboxSource */}
        {categoryOptions && (
          <CategoryCheckboxGroup
            options={categoryOptions}
            selectedValues={selectedFilters.category || []}
            currentLang={currentLang}
            onCheckboxChange={handleCheckboxChange}
          />
        )}

        {/* Keyword autocomplete — only for governmentSchemes tab */}
        {tabConfig.showAutocomplete && (
          <Autocomplete
            onKeywordsChange={(keywords) => {
              setSelectedFilters((prev) => ({ ...prev, keywords }));
            }}
            currentKeywords={selectedFilters.keywords || []}
            isDesktop={isDesktop}
          />
        )}

        {/* Mobile action buttons */}
        {!isDesktop && (
          <MobileFilterActions
            currentLang={currentLang}
            onClear={clearFilters}
            onApply={applyFiltersForMobile}
          />
        )}
      </div>
    </div>
  );
}

export default FilterSection;
