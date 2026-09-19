/**
 * filterConfig.js — Single source of truth for all filter-related data.
 *
 * This module centralises filter options, display labels, default state,
 * and the per-tab configuration so that adding a new tab or filter
 * requires editing only this file — not the UI components.
 */

// ---------------------------------------------------------------------------
// Bilingual Filter Options
// ---------------------------------------------------------------------------
// Each option stores both English (`en`) and Malayalam (`ml`) translations.
// The English value is always the canonical key stored in global state.

export const FILTER_OPTIONS = {
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
    { en: "Below Poverty Line(BPL)", ml: "ദാരിദ്ര്യരേഖയ്ക്ക് താഴെയുള്ളവർ (BPL)" },
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
    { en: "Economically Weaker Section (EWS)", ml: "സാമ്പത്തികമായി പിന്നോക്കം നിൽക്കുന്ന വിഭാഗം (EWS)" },
    { en: "Migrant Workers", ml: "അതിഥി തൊഴിലാളികൾ" },
    { en: "Children", ml: "കുട്ടികൾ" },
    { en: "Senior Citizen", ml: "മുതിർന്ന പൗരന്മാർ" },
    { en: "Government Employees/Pensioners", ml: "സർക്കാർ ജീവനക്കാർ/പെൻഷൻകാർ" },
  ],

  implementedBy: [
    { en: "Government of India", ml: "കേന്ദ്ര സർക്കാർ" },
    { en: "Government of Kerala", ml: "കേരള സർക്കാർ" },
    { en: "Local Self-Government Institutions", ml: "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ" },
    { en: "Registrar of Cooperative Societies", ml: "സഹകരണസംഘം രജിസ്ട്രാർ" },
  ],
};

// ---------------------------------------------------------------------------
// Bilingual Display Names (sidebar labels for each filter group)
// ---------------------------------------------------------------------------

export const FILTER_DISPLAY_NAMES = {
  ageGroup:       { en: "Age Group",      ml: "പ്രായപരിധി" },
  gender:         { en: "Gender",         ml: "ലിംഗം" },
  incomeLevel:    { en: "Income Level",   ml: "വരുമാന നിലവാരം" },
  profession:     { en: "Profession",     ml: "തൊഴിൽ" },
  location:       { en: "Location",       ml: "സ്ഥലം" },
  implementedBy:  { en: "Implemented By", ml: "നടപ്പിലാക്കുന്നത്" },
  category:       { en: "Category",       ml: "വിഭാഗം" },
};

// ---------------------------------------------------------------------------
// Default / Initial Filter State
// ---------------------------------------------------------------------------
// Single-select filters default to "All"; multi-select filters default to [].

export const INITIAL_FILTERS = {
  ageGroup: "All",
  gender: "All",
  incomeLevel: "All",
  profession: "All",
  location: "All",
  implementedBy: "All",
  category: [],
  keywords: [],
};

// ---------------------------------------------------------------------------
// Tab → Filter Configuration Map
// ---------------------------------------------------------------------------
// Each tab declares which dropdowns and which category checkboxes to render.
// This replaces ~900 lines of duplicated JSX in FilterSection.jsx.
//
// - `dropdowns`              : Array of filter type keys to render as dropdown selects.
// - `categoryCheckboxSource` : Key into FILTER_OPTIONS for the checkbox list, or null.
// - `showAutocomplete`       : Whether to show the keyword Autocomplete input.

const STANDARD_DROPDOWNS = ["ageGroup", "gender", "incomeLevel", "profession", "location"];

export const TAB_FILTER_CONFIGS = {
  agriculture: {
    dropdowns: STANDARD_DROPDOWNS,
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  allScheme: {
    dropdowns: STANDARD_DROPDOWNS,
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  healthCare: {
    dropdowns: STANDARD_DROPDOWNS,
    categoryCheckboxSource: "healthCategory",
    showAutocomplete: false,
  },
  disabled: {
    dropdowns: STANDARD_DROPDOWNS,
    categoryCheckboxSource: null,
    showAutocomplete: false,
  },
  national: {
    dropdowns: STANDARD_DROPDOWNS,
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  children: {
    dropdowns: [],
    categoryCheckboxSource: null,
    showAutocomplete: false,
  },
  caste: {
    dropdowns: ["profession"],
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  women: {
    dropdowns: ["ageGroup", "gender", "incomeLevel", "location"],
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  elderly: {
    dropdowns: ["ageGroup", "gender", "incomeLevel", "location"],
    categoryCheckboxSource: "category",
    showAutocomplete: false,
  },
  governmentSchemes: {
    dropdowns: ["implementedBy"],
    categoryCheckboxSource: null,
    showAutocomplete: true,
  },
};

// ---------------------------------------------------------------------------
// Bilingual UI Strings (buttons, headings, etc.)
// ---------------------------------------------------------------------------

export const UI_STRINGS = {
  filtersHeading:    { en: "Filters",                          ml: "ഫിൽട്ടറുകൾ" },
  clearAll:          { en: "Clear all",                        ml: "എല്ലാം മായ്ക്കുക" },
  clearAllShort:     { en: "Clear all",                        ml: "മായ്ക്കുക" },
  applyFilters:      { en: "Apply filters",                    ml: "ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക" },
  clearSelection:    { en: "Clear selection",                   ml: "തിരഞ്ഞെടുത്തത് ഒഴിവാക്കുക" },
  selectPrefix:      { en: "Select ",                          ml: "" },
  selectSuffix:      { en: "",                                 ml: " തിരഞ്ഞെടുക്കുക" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derive the active tab key from a Next.js pathname.
 *
 * Government scheme subroutes (e.g. `/dashboard/governmentSchemes/scheme`)
 * all map to the single "governmentSchemes" tab. Other routes use the
 * last pathname segment (e.g. `/dashboard/agriculture` → "agriculture").
 */
export function getTabFromPathname(pathname) {
  if (!pathname) return "agriculture";
  if (pathname.includes("/dashboard/governmentSchemes")) return "governmentSchemes";

  const segments = pathname.split("/");
  return segments[segments.length - 1] || "agriculture";
}
