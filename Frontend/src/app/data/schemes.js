// data/schemes.js

// These are the filter options from your FilterSection for reference
const filterOptionValues = {
  ageGroup: ["Under 18", "18-25", "26-35", "36-45", "46-60", "Over 60"],
  gender: ["Male", "Female", "Other"],
  incomeLevel: ["Low", "Lower-middle", "Middle", "Upper-middle", "High"],
  profession: ["Student", "Employed", "Unemployed", "Self-employed", "Retired"],
  location: ["Urban", "Rural", "Semi-urban"],
  category: ["SC", "ST", "OBC", "General", "Disabled", "Tribal"],
};

export const nationalSchemes = [
  {
    id: "national-1",
    name: "Ayushman Bharat – PM-JAY",
    type: "national",
    forWhom: "Economically vulnerable families",
    objective: "₹5 lakh per family/year for hospitalisation",
    department: "Ministry of Health & Family Welfare, GoI",
    support: "Cashless treatment in empanelled hospitals",
    link: "https://nha.gov.in/PM-JAY", // Added link
    eligibility: {
      // All ages means it includes all defined age brackets
      ageGroup: [...filterOptionValues.ageGroup],
      // "all" gender maps to "All"
      gender: "All",
      // "BPL" mapped to "Low". This is an interpretation.
      incomeLevel: ["Low"],
      // Assuming it's for all social categories if not specified, given "vulnerable families"
      category: [...filterOptionValues.category],
      // Assuming applicable to all professions and locations unless specified
      profession: [...filterOptionValues.profession],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "national-2",
    name: "Rashtriya Arogya Nidhi (RAN)",
    type: "national",
    forWhom: "Patients below poverty line",
    objective: "Financial aid for life-threatening diseases",
    department: "MoHFW, GoI",
    support: "Cost reimbursement for treatment",
    link: "https://www.india.gov.in/rashtriya-arogya-nidhi-scheme-ministry-health-and-family-welfare", // Added link
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup], // All ages
      gender: "All",
      incomeLevel: ["Low"], // BPL mapped to "Low"
      category: [...filterOptionValues.category], // Assuming BPL patients can be from any category
      profession: [...filterOptionValues.profession],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "national-3",
    name: "Health Minister's Cancer Patient Fund",
    type: "national",
    forWhom: "Weaker sections with cancer",
    objective: "Aid for cancer treatment",
    department: "MoHFW, GoI",
    support: "Financial support for treatment",
    link: "https://www.myscheme.gov.in/schemes/hmcpf", // Added link
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup], // All ages
      gender: "All",
      // "low-income" mapped more broadly
      incomeLevel: ["Low", "Lower-middle"],
      // "Weaker sections" implies broad category applicability. The "cancer" aspect is an additional health criterion.
      category: [...filterOptionValues.category],
      profession: [...filterOptionValues.profession],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "national-4",
    name: "Health Minister's Discretionary Grant",
    type: "national",
    forWhom: "BPL individuals with urgent needs",
    objective: "Aid for emergency medical care",
    department: "MoHFW, GoI",
    support: "Financial assistance",
    link: "https://www.myscheme.gov.in/schemes/hmdg", // Added link
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup], // All ages
      gender: "All",
      incomeLevel: ["Low"], // BPL
      category: [...filterOptionValues.category],
      profession: [...filterOptionValues.profession],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "national-5",
    name: "Deendayal Disabled Rehabilitation Scheme",
    type: "national",
    forWhom: "Persons with disabilities",
    objective: "Support services and rehabilitation",
    department: "Dept. of Empowerment of Persons with Disabilities",
    support: "Aid via NGOs",
    link: "https://depwd.gov.in/ddrs/", // Added link
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup], // All ages
      gender: "All",
      // "any" income level
      incomeLevel: [...filterOptionValues.incomeLevel],
      // Specific to "Disabled" category
      category: ["Disabled"],
      profession: [...filterOptionValues.profession],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "national-6",
    name: "Integrated Child Development Services (ICDS)",
    type: "national",
    forWhom: "Children under 6, mothers",
    objective: "Nutrition, health, preschool education",
    department: "Ministry of Women & Child Development",
    support: "Supplementary nutrition, immunization, health check-ups",
    link: "https://icds.gov.in/en/schemes", // Added link
    eligibility: {
      // Children under 6 fall into "Under 18". Mothers can be in various age groups.
      // For simplicity, if primary beneficiary is child under 6.
      ageGroup: ["Under 18"],
      // Applicable to children (all genders) and mothers (Female).
      // If primarily child-focused, "All" gender. If also mother-specific aspects, might be complex.
      // Let's assume "All" for the child, and mother's gender is implied "Female".
      // For filtering based on primary beneficiary:
      gender: "All", // For children. If filtering for mothers, this might need refinement.
      // "any" income level
      incomeLevel: [...filterOptionValues.incomeLevel],
      // Applies across all social categories for children and mothers
      category: [...filterOptionValues.category],
      // Children are "Students" (preschool) or N/A for profession. Mothers various.
      // Assuming broad applicability or focusing on child (not a profession).
      profession: ["Student", ...filterOptionValues.profession.filter(p => p !== "Student")], // Or simply all professions for mothers
      location: [...filterOptionValues.location],
    },
  },
];
