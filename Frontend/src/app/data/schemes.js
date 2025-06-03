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
    link: "https://nha.gov.in/PM-JAY",
    description: "The Ayushman Bharat – PM-JAY scheme, launched by the Ministry of Health & Family Welfare, Government of India, provides ₹5 lakh per family/year for hospitalisation to economically vulnerable families.", // Added description
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup],
      gender: "All",
      incomeLevel: ["Low"],
      category: [...filterOptionValues.category],
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
    link: "https://www.india.gov.in/rashtriya-arogya-nidhi-scheme-ministry-health-and-family-welfare",
    description: "The Rashtriya Arogya Nidhi (RAN) scheme, managed by the Ministry of Health & Family Welfare, Government of India, offers financial aid for life-threatening diseases to patients below the poverty line.", // Added description
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup],
      gender: "All",
      incomeLevel: ["Low"],
      category: [...filterOptionValues.category],
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
    link: "https://www.myscheme.gov.in/schemes/hmcpf",
    description: "The Health Minister's Cancer Patient Fund, administered by the Ministry of Health & Family Welfare, Government of India, provides aid for cancer treatment to weaker sections.", // Added description
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup],
      gender: "All",
      incomeLevel: ["Low", "Lower-middle"],
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
    link: "https://www.myscheme.gov.in/schemes/hmdg",
    description: "The Health Minister's Discretionary Grant, from the Ministry of Health & Family Welfare, Government of India, offers financial assistance for emergency medical care to BPL individuals with urgent needs.", // Added description
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup],
      gender: "All",
      incomeLevel: ["Low"],
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
    link: "https://depwd.gov.in/ddrs/",
    description: "The Deendayal Disabled Rehabilitation Scheme, launched by the Department of Empowerment of Persons with Disabilities, provides support services and rehabilitation for persons with disabilities.", // Added description
    eligibility: {
      ageGroup: [...filterOptionValues.ageGroup],
      gender: "All",
      incomeLevel: [...filterOptionValues.incomeLevel],
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
    link: "https://icds.gov.in/en/schemes",
    description: "The Integrated Child Development Services (ICDS), managed by the Ministry of Women & Child Development, focuses on nutrition, health, and preschool education for children under 6 and mothers.", // Added description
    eligibility: {
      ageGroup: ["Under 18"],
      gender: "All",
      incomeLevel: [...filterOptionValues.incomeLevel],
      category: [...filterOptionValues.category],
      profession: ["Student", ...filterOptionValues.profession.filter(p => p !== "Student")],
      location: [...filterOptionValues.location],
    },
  },
  {
    id: "state-1",
    name: "Financial Assistance to Disabled Students Pursuing (10th, 11th, 12th Equivalent Exams)",
    type: "state",
    forWhom: "Disabled students pursuing 10th, 11th, or 12th equivalent exams",
    objective: "Provide financial assistance for education to disabled students",
    department: "Department of Social Justice, Government of Kerala",
    support: "Financial aid for educational expenses",
    link: "https://example.com/kerala-disabled-student-scheme",
    description: "The scheme “Financial Assistance to Disabled Students Pursuing (10th, 11th, 12th Equivalent Exams)” was launched by the Department of Social Justice, Government of Kerala.", // Added description
    eligibility: {
      ageGroup: ["Under 18", "18-25"],
      gender: "All",
      incomeLevel: [...filterOptionValues.incomeLevel],
      profession: ["Student"],
      category: ["Disabled"],
      location: [...filterOptionValues.location],
    },
  },
];
