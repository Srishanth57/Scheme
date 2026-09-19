/**
 * schemeFilterEngine.js — Pure business logic for filtering schemes.
 *
 * Every function in this module is a pure function (no React, no DOM, no state).
 * This makes the filtering logic independently testable and completely
 * decoupled from the UI layer.
 */

// ---------------------------------------------------------------------------
// String & Type Safety Utilities
// ---------------------------------------------------------------------------

/**
 * Safely coerce any value to a lowercase string.
 * Returns "" for null, undefined, numbers, objects, etc.
 */
export function safeString(value) {
  return typeof value === "string" ? value.toLowerCase() : "";
}

/**
 * Safely coerce a value to an array.
 * Handles raw strings, nullish values, and already-array values.
 */
export function normalizeToArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
}

/**
 * Extract a value from a multilingual field (`{ en, ml }` or plain string).
 * Falls back through `preferredLang → "en" → raw value → fallback`.
 *
 * @param {string|object} field         The multilingual field
 * @param {string}        [preferredLang="en"]  Language code to prefer
 * @param {*}             [fallback=""]         Value if nothing is found
 */
export function getMultilingualValue(field, preferredLang = "en", fallback = "") {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field[preferredLang] || field.en || fallback;
}

// ---------------------------------------------------------------------------
// Age Range Parser
// ---------------------------------------------------------------------------

/**
 * Parse an age range string into [min, max].
 *
 * Supported formats:
 *   "21-30"  →  [21, 30]
 *   "60+"    →  [60, Infinity]
 *   "15"     →  [15, 15]
 *   null     →  [0, Infinity]   (matches everything)
 */
export function parseAgeRange(ageStr) {
  if (!ageStr) return [0, Infinity];

  const trimmed = String(ageStr).trim();

  if (trimmed.includes("-")) {
    const [minStr, maxStr] = trimmed.split("-");
    const min = Number(minStr);
    const max = Number(maxStr);
    return [isNaN(min) ? 0 : min, isNaN(max) ? Infinity : max];
  }

  if (trimmed.includes("+")) {
    const min = parseInt(trimmed.split("+")[0], 10);
    return [isNaN(min) ? 0 : min, Infinity];
  }

  const singleValue = parseInt(trimmed, 10);
  return isNaN(singleValue) ? [0, Infinity] : [singleValue, singleValue];
}

// ---------------------------------------------------------------------------
// Individual Filter Predicates
// ---------------------------------------------------------------------------
// Each predicate answers: "Does this scheme match the selected filter value?"
// They all return `true` when the scheme should be included.

/** A scheme's field value of "All" (in any language) means it's universal. */
function isUniversalValue(value) {
  return value === "All" || value === "എല്ലാവരും";
}

export function matchesAgeGroup(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  const schemeAge = getMultilingualValue(scheme.ageGroup);
  if (isUniversalValue(schemeAge)) return true;
  if (!schemeAge) return false;

  // Range overlap check: filter range overlaps with scheme range
  const [filterMin, filterMax] = parseAgeRange(filterValue);
  const [schemeMin, schemeMax] = parseAgeRange(schemeAge);
  return filterMin <= schemeMax && filterMax >= schemeMin;
}

export function matchesGender(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  const schemeGender = getMultilingualValue(scheme.gender);
  return isUniversalValue(schemeGender) || schemeGender === filterValue;
}

export function matchesIncomeLevel(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  const schemeIncome = getMultilingualValue(scheme.incomeLevel);
  return isUniversalValue(schemeIncome) || schemeIncome === filterValue;
}

export function matchesProfession(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  const schemeProfession = getMultilingualValue(scheme.profession);
  return (
    isUniversalValue(schemeProfession) ||
    safeString(schemeProfession).includes(safeString(filterValue))
  );
}

export function matchesLocation(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  const schemeLocation = getMultilingualValue(scheme.location);
  if (isUniversalValue(schemeLocation)) return true;

  // Location values like "National / India" contain slashes.
  // Split and check if any sub-part matches the scheme location.
  const filterParts = filterValue.includes("/")
    ? filterValue.split("/").map((s) => s.trim())
    : [filterValue];

  return filterParts.some((part) =>
    safeString(schemeLocation).includes(safeString(part))
  );
}

export function matchesImplementedBy(scheme, filterValue) {
  if (!filterValue || filterValue === "All") return true;

  // Check both `implementingAgency` and `implementedBy` fields
  const agency = getMultilingualValue(scheme.implementingAgency);
  const rawImplementedBy = scheme.implementedBy?.en || scheme.implementedBy || [];
  const implementedByList = normalizeToArray(rawImplementedBy);

  const matchesAgency = safeString(agency).includes(safeString(filterValue));
  const matchesList = implementedByList.some((item) =>
    safeString(item).includes(safeString(filterValue))
  );

  return matchesAgency || matchesList;
}

export function matchesSocialCategory(scheme, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) return true;

  // Safely extract and normalise — DB may store string, array, or { en, ml }
  const rawCategories = Array.isArray(scheme.socialCategory)
    ? scheme.socialCategory
    : scheme.socialCategory?.en || scheme.socialCategory || [];
  const categories = normalizeToArray(rawCategories);

  return categories.some((cat) => selectedCategories.includes(cat));
}

export function matchesKeywords(scheme, selectedKeywords, currentLang = "en") {
  if (!selectedKeywords || selectedKeywords.length === 0) return true;

  const rawKeywords =
    scheme.keywords?.en || scheme.keywords?.[currentLang] || scheme.keywords || [];
  const schemeKeywordSet = new Set(
    normalizeToArray(rawKeywords).map((k) => safeString(k))
  );

  // Each selectedKeyword is an object: { key, label: { en, ml } }
  // Match against key, label.en, and label.ml for maximum coverage
  return selectedKeywords.some((filterKeyword) => {
    const keyMatch = safeString(filterKeyword.key || "");
    const enMatch = safeString(filterKeyword.label?.en || "");
    const mlMatch = safeString(filterKeyword.label?.ml || "");

    return (
      schemeKeywordSet.has(keyMatch) ||
      schemeKeywordSet.has(enMatch) ||
      schemeKeywordSet.has(mlMatch)
    );
  });
}

// ---------------------------------------------------------------------------
// Orchestrators
// ---------------------------------------------------------------------------

/**
 * Check whether all sidebar filter values are in their default "empty" state.
 * Used to skip the entire filter pipeline for performance.
 */
export function areFiltersDefault(filters) {
  if (!filters) return true;

  return Object.values(filters).every((value) => {
    if (value === null || value === undefined || value === "" || value === "All") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (value instanceof Set && value.size === 0) return true;
    return false;
  });
}

/**
 * Apply all sidebar filters to a list of schemes.
 * Chains each predicate sequentially — order doesn't matter for correctness
 * but we put the cheapest checks first for early exits.
 */
export function applyAllSidebarFilters(schemes, filters, currentLang) {
  let result = schemes;

  if (filters.gender && filters.gender !== "All") {
    result = result.filter((s) => matchesGender(s, filters.gender));
  }
  if (filters.incomeLevel && filters.incomeLevel !== "All") {
    result = result.filter((s) => matchesIncomeLevel(s, filters.incomeLevel));
  }
  if (filters.profession && filters.profession !== "All") {
    result = result.filter((s) => matchesProfession(s, filters.profession));
  }
  if (filters.ageGroup && filters.ageGroup !== "All") {
    result = result.filter((s) => matchesAgeGroup(s, filters.ageGroup));
  }
  if (filters.location && filters.location !== "All") {
    result = result.filter((s) => matchesLocation(s, filters.location));
  }
  if (filters.implementedBy && filters.implementedBy !== "All") {
    result = result.filter((s) => matchesImplementedBy(s, filters.implementedBy));
  }
  if (filters.category && filters.category.length > 0) {
    result = result.filter((s) => matchesSocialCategory(s, filters.category));
  }
  if (filters.keywords && filters.keywords.length > 0) {
    result = result.filter((s) => matchesKeywords(s, filters.keywords, currentLang));
  }

  return result;
}

// ---------------------------------------------------------------------------
// Top-Level Entry Point
// ---------------------------------------------------------------------------

/**
 * filterSchemes — the single function that SchemeDisplay.jsx calls.
 *
 * Pipeline:
 *   1. Search by name (text input)
 *   2. Recommended tags (only on /dashboard/allScheme)
 *   3. Sidebar filters (dropdowns + checkboxes + keywords)
 *
 * @param {Object}   params
 * @param {Array}    params.schemes        All schemes for the current tab
 * @param {string}   params.searchTerm     Text from the search input
 * @param {Object}   params.sidebarFilters The global filter state object
 * @param {string}   params.currentLang    "en" or "ml"
 * @param {string}   params.pathname       Current Next.js route path
 * @param {string[]} params.tags           Recommended tags from the home page
 * @returns {Array}  Filtered list of schemes
 */
export function filterSchemes({
  schemes = [],
  searchTerm = "",
  sidebarFilters,
  currentLang = "en",
  pathname = "",
  tags = [],
}) {
  // 1. Search by scheme name
  let filtered = schemes;

  if (searchTerm) {
    const lowerSearch = safeString(searchTerm);
    filtered = filtered.filter((scheme) => {
      const name = getMultilingualValue(scheme.name, currentLang);
      return safeString(name).includes(lowerSearch);
    });
  }

  // 2. Recommended tags filter (only on the "allScheme" tab)
  if (pathname === "/dashboard/allScheme" && tags && tags.length > 0) {
    filtered = filtered.filter((scheme) => {
      const rawKeywords =
        scheme.keywords?.[currentLang] || scheme.keywords?.en || [];
      const schemeKeywords = normalizeToArray(rawKeywords);
      return schemeKeywords.some((keyword) => tags.includes(keyword));
    });
  }

  // 3. Sidebar filters — skip entirely if all values are defaults
  if (areFiltersDefault(sidebarFilters)) return filtered;

  return applyAllSidebarFilters(filtered, sidebarFilters, currentLang);
}
