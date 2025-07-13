export const agricultureScheme = [
  {
    id: "agriculture1",
    name: "PM-KISAN",
    description: "₹6,000 annual income support",
    category: "Agriculture",
    targetAudience: "Small and marginal farmers",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Direct Benefit Transfer (₹2,000 in 3 installments)",
    ageGroup: "All", // Likely benefits farmers of all ages
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "income support",
      "farmers",
      "financial aid",
      "central government",
    ],
    link: "https://pmkisan.gov.in/",
  },
  {
    id: "agriculture2",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance against natural calamities",
    category: "Agriculture",
    targetAudience: "All farmers",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Insurance coverage, premium subsidy",
    ageGroup: "All", // Relevant for all farmers
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "crop insurance",
      "farmers",
      "natural calamities",
      "central government",
    ],
    link: "https://pmfby.gov.in/",
  },
  {
    id: "agriculture3",
    name: "Kisan Credit Card (KCC)",
    description: "Access to affordable credit",
    category: "Agriculture",
    targetAudience: "All farmers",
    implementingAgency: "NABARD / Commercial Banks",
    benefits: "Credit limit for crops and allied activities",
    ageGroup: "All", // Generally for all adult farmers
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: ["credit", "farmers", "financial assistance", "NABARD"],
    link: "https://www.unionbankofindia.co.in/en/blog/Digital-Kisan-Credit-Card-KCC",
  },
  {
    id: "agriculture4",
    name: "Soil Health Card Scheme",
    description: "Promote balanced fertilizer use",
    category: "Agriculture",
    targetAudience: "Farmers",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Soil testing and recommendations",
    ageGroup: "All", // Applicable to all farmers
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: ["soil health", "fertilizer", "farmers", "central government"],
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    id: "agriculture5",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: "Promotion of organic farming practices",
    category: "Agriculture",
    targetAudience: "Farmers interested in organic farming",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Cluster-based support, certification assistance",
    ageGroup: "All", // Open to all ages
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "organic farming",
      "sustainable agriculture",
      "farmers",
      "central government",
    ],
    link: "https://nconf.dac.gov.in/SchemaGuidelines",
  },
  {
    id: "agriculture6",
    name: "MIDH (Horticulture Mission)",
    description: "Development of fruits, vegetables, spices",
    category: "Horticulture",
    targetAudience: "Horticulture farmers",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Financial assistance, training, market linkages",
    ageGroup: "All", // Broad applicability
    gender: "All",
    incomeLevel: "All",
    profession: "Horticulture Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "horticulture",
      "fruits",
      "vegetables",
      "spices",
      "central government",
    ],
    link: "https://shm.kerala.gov.in/scheme-details/",
  },
  {
    id: "agriculture7",
    name: "Subhiksha Keralam",
    description: "Promote food security through local cultivation",
    category: "Agriculture",
    targetAudience: "All farming households",
    implementingAgency: "Govt. of Kerala",
    benefits: "Subsidies for inputs, local food crop promotion",
    ageGroup: "All", // Broad applicability
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "food security",
      "local cultivation",
      "Kerala government",
      "subsidies",
    ],
    link: "https://kerala.gov.in/schemes-programmes",
  },
  {
    id: "agriculture8",
    name: "Farm Mechanization Scheme",
    description: "Promote modern tools and reduce labor dependency",
    category: "Agriculture",
    targetAudience: "Small & medium-scale farmers",
    implementingAgency: "Dept. of Agriculture, Kerala",
    benefits: "Subsidy on farm equipment and machinery",
    ageGroup: "All", // Equipment purchase isn't typically age-gated
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "farm equipment",
      "mechanization",
      "subsidy",
      "Kerala government",
    ],
    link: "https://ksheerasree.kerala.gov.in/scheme/details/8",
  },
  {
    id: "agriculture9",
    name: "Karshaka Kshemanidhi Board",
    description: "Pension and welfare benefits",
    category: "Welfare",
    targetAudience: "Registered farmers",
    implementingAgency: "Govt. of Kerala",
    benefits: "Monthly pension, accidental death benefits",
    ageGroup: "60-100", // Pension schemes are typically for older age groups
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: ["pension", "welfare", "farmers", "Kerala government"],
    link: "https://cmo.kerala.gov.in/office_level_oi.php?FMfcgzQVxRKfvdfSDbGCkhJQJFnZGGCP=ZGlkPTEmb2ZjX2lkPTljZGZlNjg3LTgyYTMtNDU4MS1hYjFiLTE3MDIwNDcxNTQzMiZsZXZlbF9zdGF0dXM9MyZvZmZpY2U9U2VjcmV0YXJ5K0tlcmFsYStTdGF0ZStGYXJtZXJzK0RlYnQrUmVsaWVmK0NvbW1pc3Npb24mZmQ9Jm9mZmljZV9pZD05Y2RmZTY4Ny04MmEzLTQ1ODEtYWIxYi0xNzAyMDQ3MTU0MzI=",
  },
  {
    id: "agriculture10",
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    description: "Integrated development of agriculture and allied sectors",
    category: "Agriculture",
    targetAudience: "All farmers, cooperatives",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Grants for infrastructure, training, and innovation",
    ageGroup: "All", // Broad applicability
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "agricultural development",
      "infrastructure",
      "training",
      "innovation",
      "central government",
    ],
    link: "https://rkvy.nic.in/",
  },
  {
    id: "agriculture11",
    name: "Jaiva Karshika Mission",
    description: "Promote organic clusters and GAP",
    category: "Agriculture",
    targetAudience: "Organic farmers",
    implementingAgency: "Dept. of Agriculture, Kerala",
    benefits: "Technical and financial support",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Organic Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "organic farming",
      "GAP",
      "Kerala government",
      "financial support",
    ],
    link: "https://keralaagriculture.gov.in/wp-content/uploads/2024/07/WI-Organic.pdf",
  },
  {
    id: "agriculture12",
    name: "Nadapu Scheme",
    description: "Financial support for certified organic practices",
    category: "Agriculture",
    targetAudience: "Organic farmers",
    implementingAgency: "Govt. of Kerala",
    benefits: "Subsidies for bio-inputs, training",
    ageGroup: "All", // Open to all ages
    gender: "All",
    incomeLevel: "All",
    profession: "Organic Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "organic farming",
      "subsidies",
      "bio-inputs",
      "training",
      "Kerala government",
    ],
    link: "https://www.jaagrukbharat.com/list-of-top-agriculture-schemes-in-india-2024-with-features-eligibility-1402163",
  },
  {
    id: "agriculture13",
    name: "Agri Clinics and Agribusiness Centres (ACABC)",
    description: "Promote private agri-advisory and business centres",
    category: "Entrepreneurship",
    targetAudience: "Agriculture graduates and entrepreneurs",
    implementingAgency: "Ministry of Agriculture, GoI / MANAGE",
    benefits: "Credit-linked subsidy for setting up agri-enterprises",
    ageGroup: "21-30", // Likely targeting younger graduates/entrepreneurs
    gender: "All",
    incomeLevel: "All",
    profession: "Entrepreneur",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "agri-advisory",
      "agribusiness",
      "entrepreneurship",
      "subsidy",
      "central government",
    ],
    link: "https://www.agriclinics.net/Contacts.aspx",
  },
  {
    id: "agriculture14",
    name: "Gramin Bhandaran Yojana",
    description: "Improve rural storage infrastructure",
    category: "Infrastructure",
    targetAudience: "Farmers, cooperatives, FPOs",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Capital subsidy for warehouse construction",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "storage",
      "warehousing",
      "infrastructure",
      "farmers",
      "central government",
    ],
    link: "https://kisandapp.com/gramin-bhandaran-yojana/",
  },
  {
    id: "agriculture15",
    name: "Kerala State Farmers Debt Relief Commission",
    description: "Provide relief from agricultural debts",
    category: "Financial Relief",
    targetAudience: "Indebted farmers",
    implementingAgency: "Govt. of Kerala",
    benefits: "One-time settlement / waiver in hardship cases",
    ageGroup: "41-50",
    gender: "All",
    incomeLevel: "Indebted",
    profession: "Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "debt relief",
      "farmers",
      "financial assistance",
      "Kerala government",
    ],
    link: "https://cmo.kerala.gov.in/office_level_oi.php?FMfcgzQVxRKfvdfSDbGCkhJQJFnZGGCP=ZGlkPTEmb2ZjX2lkPTljZGZlNjg3LTgyYTMtNDU4MS1hYjFiLTE3MDIwNDcxNTQzMiZsZXZlbF9zdGF0dXM9MyZvZmZpY2U9U2VjcmV0YXJ5K0tlcmFsYStTdGF0ZStGYXJtZXJzK0RlYnQrUmVsaWVmK0NvbW1pc3Npb24mZmQ9Jm9mZmljZV9pZD05Y2RmZTY4Ny04MmEzLTQ1ODEtYWIxYi0xNzAy0%3D",
  },
  {
    id: "agriculture16",
    name: "Dairy Entrepreneur Development Scheme (DEDS)",
    description: "Promote dairy farming and entrepreneurship",
    category: "Dairy",
    targetAudience: "Dairy farmers, SHGs, FPOs",
    implementingAgency: "NABARD",
    benefits: "Subsidy for dairy units, chilling units",
    ageGroup: "31-40",
    gender: "All",
    incomeLevel: "All",
    profession: "Dairy Farmer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: ["dairy farming", "entrepreneurship", "subsidy", "NABARD"],
    link: "https://www.nabard.org/content.aspx?id=591",
  },
  {
    id: "agriculture17",
    name: "National Livestock Mission (NLM)",
    description: "Sustainable livestock development",
    category: "Livestock",
    targetAudience: "Livestock rearers",
    implementingAgency: "Ministry of Agriculture, GoI",
    benefits: "Financial assistance for animal husbandry activities",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Livestock Rearer",
    location: "National",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "livestock",
      "animal husbandry",
      "financial assistance",
      "central government",
    ],
    link: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2099684",
  },
  {
    id: "agriculture18",
    name: "Fodder Development Programme",
    description: "Promote fodder cultivation and preservation",
    category: "Dairy",
    targetAudience: "Dairy farmers, cooperative societies",
    implementingAgency: "Dept. of Dairy Development, Kerala",
    benefits: "Support for seeds, silage pits, and mechanization",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Dairy Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: ["fodder", "dairy", "cultivation", "Kerala government"],
    link: "https://livestock.kerala.gov.in/",
  },
  {
    id: "agriculture19",
    name: "Scheme on Coconut Development",
    description: "Enhance productivity and health of coconut trees",
    category: "Horticulture",
    targetAudience: "Coconut growers",
    implementingAgency: "Dept. of Agriculture, Kerala",
    benefits: "Support for bio-inputs, pest management, and replanting",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Coconut Grower",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "coconut",
      "productivity",
      "pest management",
      "Kerala government",
    ],
    link: "https://keralaagriculture.gov.in/schemes/coconut-development/",
  },
  {
    id: "agriculture20",
    name: "Kerala State Horticulture Mission",
    description: "Support value chain in horticultural crops",
    category: "Horticulture",
    targetAudience: "Horticulture farmers",
    implementingAgency: "Govt. of Kerala",
    benefits: "Nursery development, post-harvest tech, export promotion",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Horticulture Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "horticulture",
      "value chain",
      "post-harvest",
      "export",
      "Kerala government",
    ],
    link: "http://shm.kerala.gov.in/",
  },
  {
    id: "agriculture21",
    name: "Jaiva Griham (Idukki Special)",
    description: "Promote integrated, sustainable agriculture",
    category: "Agriculture",
    targetAudience: "Marginal farmers in Idukki",
    implementingAgency: "Dept. of Agriculture, Kerala / NABARD",
    benefits:
      "Model farm houses, soil & water conservation, local market access",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "Marginal",
    profession: "Farmer",
    location: "Idukki, Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "integrated agriculture",
      "sustainable agriculture",
      "Idukki",
      "Kerala government",
      "NABARD",
    ],
    link: "https://meserumelycollege.ac.in/wp-content/uploads/2020/08/ANNUAL-REPORT-MSW-2020-2021.pdf",
  },
  {
    id: "agriculture22",
    name: "Haritha Keralam Mission",
    description: "Promote organic farming, waste, and water management",
    category: "Environment",
    targetAudience: "Entire rural community",
    implementingAgency: "Govt. of Kerala",
    benefits: "Awareness, convergence of water/agriculture projects",
    ageGroup: "All", // Community-based scheme
    gender: "All",
    incomeLevel: "All",
    profession: "Organic Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "organic farming",
      "waste management",
      "water management",
      "Kerala government",
    ],
    link: "http://haritham.kerala.gov.in/",
  },
  {
    id: "agriculture23",
    name: "Idukki Special Dairy Package",
    description: "Enhance dairy productivity and income",
    category: "Dairy",
    targetAudience: "Dairy farmers in Idukki",
    implementingAgency: "Dept. of Dairy Development, Kerala",
    benefits: "Financial and infrastructural support",
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "Dairy Farmer",
    location: "Idukki, Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "dairy",
      "productivity",
      "income",
      "Idukki",
      "Kerala government",
    ],
    link: "https://dairydevelopment.kerala.gov.in/Eng/index.php/institutions/district-wise-offices?id=534",
  },
  {
    id: "agriculture24",
    name: "Ksheera Theeram",
    description: "Improve milk quality and farmer welfare",
    category: "Dairy",
    targetAudience: "Dairy farmers",
    implementingAgency: "Dept. of Dairy Development, Kerala",
    benefits: "Cattle feed, veterinary aid, milk chilling support",
    ageGroup: "All", // Broad applicability
    gender: "All",
    incomeLevel: "All",
    profession: "Dairy Farmer",
    location: "Kerala",
    socialCategory: ["General", "SC", "ST", "OBC"],
    keywords: [
      "milk quality",
      "dairy welfare",
      "cattle feed",
      "veterinary aid",
      "Kerala government",
    ],
    link: "https://keralabank.co.in/p_l_agri_014.php",
  },
   {
    "id": "agriculture20",
    "name": {
      "en": "Kerala State Horticulture Mission",
      "ml": "കേരള സംസ്ഥാന ഹോർട്ടികൾച്ചർ മിഷൻ"
    },
    "description": {
      "en": "Support value chain in horticultural crops",
      "ml": "ഹോർട്ടികൾച്ചർ വിളകളിൽ മൂല്യ ശൃംഖലയെ പിന്തുണയ്ക്കുക"
    },
    "category": {
      "en": "Horticulture",
      "ml": "ഹോർട്ടികൾച്ചർ"
    },
    "targetAudience": {
      "en": "Horticulture farmers",
      "ml": "ഹോർട്ടികൾച്ചർ കർഷകർ"
    },
    "implementingAgency": {
      "en": "Govt. of Kerala",
      "ml": "കേരള സർക്കാർ"
    },
    "benefits": {
      "en": "Nursery development, post-harvest tech, export promotion",
      "ml": "നഴ്സറി വികസനം, വിളവെടുപ്പിന് ശേഷമുള്ള സാങ്കേതികവിദ്യ, കയറ്റുമതി പ്രോത്സാഹനം"
    },
    "eligibility": {
      "en": "Horticulture farmers in Kerala",
      "ml": "കേരളത്തിലെ ഹോർട്ടികൾച്ചർ കർഷകർ"
    },
    "documentsRequired": {
      "en": "Not specified, likely proof of farming and identity",
      "ml": "പ്രത്യേകം പറഞ്ഞിട്ടില്ല, കാർഷിക പ്രവർത്തനങ്ങളുടെയും തിരിച്ചറിയലിന്റെയും തെളിവുകൾ ആവശ്യമായി വരാം"
    },
    "applicationProcess": {
      "en": "Contact Kerala State Horticulture Mission or relevant agricultural offices",
      "ml": "കേരള സംസ്ഥാന ഹോർട്ടികൾച്ചർ മിഷനുമായോ ബന്ധപ്പെട്ട കാർഷിക ഓഫീസുകളുമായോ ബന്ധപ്പെടുക"
    },
    "ageGroup": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "gender": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "incomeLevel": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "profession": {
      "en": "Horticulture Farmer",
      "ml": "ഹോർട്ടികൾച്ചർ കർഷകൻ"
    },
    "location": {
      "en": "Kerala",
      "ml": "കേരളം"
    },
    "socialCategory": {
      "en": ["General", "SC", "ST", "OBC"],
      "ml": ["പൊതുവിഭാഗം", "പട്ടികജാതി", "പട്ടികവർഗ്ഗം", "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ"]
    },
    "keywords": {
      "en": ["horticulture", "value chain", "post-harvest", "export", "Kerala government"],
      "ml": ["ഹോർട്ടികൾച്ചർ", "മൂല്യ ശൃംഖല", "വിളവെടുപ്പിന് ശേഷം", "കയറ്റുമതി", "കേരള സർക്കാർ"]
    },
    "link": "http://shm.kerala.gov.in/",
    "ratings": {
      "avgRating": 0,
      "count": 0
    }
  },
  {
    "id": "agriculture21",
    "name": {
      "en": "Jaiva Griham (Idukki Special)",
      "ml": "ജൈവ ഗൃഹം (ഇടുക്കി സ്പെഷ്യൽ)"
    },
    "description": {
      "en": "Promote integrated, sustainable agriculture",
      "ml": "സമഗ്രവും സുസ്ഥിരവുമായ കൃഷി പ്രോത്സാഹിപ്പിക്കുക"
    },
    "category": {
      "en": "Agriculture",
      "ml": "കൃഷി"
    },
    "targetAudience": {
      "en": "Marginal farmers in Idukki",
      "ml": "ഇടുക്കിയിലെ ചെറുകിട കർഷകർ"
    },
    "implementingAgency": {
      "en": "Dept. of Agriculture, Kerala / NABARD",
      "ml": "കൃഷി വകുപ്പ്, കേരളം / നബാർഡ്"
    },
    "benefits": {
      "en": "Model farm houses, soil & water conservation, local market access",
      "ml": "മാതൃകാ ഫാം ഹൗസുകൾ, മണ്ണ്, ജല സംരക്ഷണം, പ്രാദേശിക വിപണി പ്രവേശനം"
    },
    "eligibility": {
      "en": "Marginal farmers in Idukki district",
      "ml": "ഇടുക്കി ജില്ലയിലെ ചെറുകിട കർഷകർ"
    },
    "documentsRequired": {
      "en": "Not specified, likely proof of land ownership/farming status and identity",
      "ml": "പ്രത്യേകം പറഞ്ഞിട്ടില്ല, ഭൂമി ഉടമസ്ഥത/കൃഷി നിലയുടെയും തിരിച്ചറിയലിന്റെയും തെളിവുകൾ ആവശ്യമായി വരാം"
    },
    "applicationProcess": {
      "en": "Contact Department of Agriculture, Kerala or NABARD offices in Idukki",
      "ml": "ഇടുക്കിയിലെ കൃഷി വകുപ്പ്, കേരളം അല്ലെങ്കിൽ നബാർഡ് ഓഫീസുകളുമായി ബന്ധപ്പെടുക"
    },
    "ageGroup": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "gender": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "incomeLevel": {
      "en": "Marginal",
      "ml": "ചെറുകിട"
    },
    "profession": {
      "en": "Farmer",
      "ml": "കർഷകൻ"
    },
    "location": {
      "en": "Idukki, Kerala",
      "ml": "ഇടുക്കി, കേരളം"
    },
    "socialCategory": {
      "en": ["General", "SC", "ST", "OBC"],
      "ml": ["പൊതുവിഭാഗം", "പട്ടികജാതി", "പട്ടികവർഗ്ഗം", "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ"]
    },
    "keywords": {
      "en": ["integrated agriculture", "sustainable agriculture", "Idukki", "Kerala government", "NABARD"],
      "ml": ["സമഗ്ര കൃഷി", "സുസ്ഥിര കൃഷി", "ഇടുക്കി", "കേരള സർക്കാർ", "നബാർഡ്"]
    },
    "link": "https://meserumelycollege.ac.in/wp-content/uploads/2020/08/ANNUAL-REPORT-MSW-2020-2021.pdf",
    "ratings": {
      "avgRating": 0,
      "count": 0
    }
  },
  {
    "id": "agriculture22",
    "name": {
      "en": "Haritha Keralam Mission",
      "ml": "ഹരിത കേരളം മിഷൻ"
    },
    "description": {
      "en": "Promote organic farming, waste, and water management",
      "ml": "ജൈവകൃഷി, മാലിന്യ സംസ്കരണം, ജലസംരക്ഷണം എന്നിവ പ്രോത്സാഹിപ്പിക്കുക"
    },
    "category": {
      "en": "Environment",
      "ml": "പരിസ്ഥിതി"
    },
    "targetAudience": {
      "en": "Entire rural community",
      "ml": "മുഴുവൻ ഗ്രാമീണ സമൂഹവും"
    },
    "implementingAgency": {
      "en": "Govt. of Kerala",
      "ml": "കേരള സർക്കാർ"
    },
    "benefits": {
      "en": "Awareness, convergence of water/agriculture projects",
      "ml": "അവബോധം, ജല/കാർഷിക പദ്ധതികളുടെ ഏകീകരണം"
    },
    "eligibility": {
      "en": "Residents and communities in rural Kerala interested in organic farming and environmental conservation",
      "ml": "ജൈവകൃഷിയിലും പരിസ്ഥിതി സംരക്ഷണത്തിലും താൽപ്പര്യമുള്ള കേരളത്തിലെ ഗ്രാമീണ നിവാസികളും കമ്മ്യൂണിറ്റികളും"
    },
    "documentsRequired": {
      "en": "Not explicitly stated, often community-based participation",
      "ml": "പ്രത്യേകം പറഞ്ഞിട്ടില്ല, സാധാരണയായി കമ്മ്യൂണിറ്റി അധിഷ്ഠിത പങ്കാളിത്തം"
    },
    "applicationProcess": {
      "en": "Participate through local self-government bodies or community initiatives",
      "ml": "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങളിലൂടെയോ കമ്മ്യൂണിറ്റി സംരംഭങ്ങളിലൂടെയോ പങ്കെടുക്കുക"
    },
    "ageGroup": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "gender": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "incomeLevel": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "profession": {
      "en": "Organic Farmer",
      "ml": "ജൈവ കർഷകൻ"
    },
    "location": {
      "en": "Kerala",
      "ml": "കേരളം"
    },
    "socialCategory": {
      "en": ["General", "SC", "ST", "OBC"],
      "ml": ["പൊതുവിഭാഗം", "പട്ടികജാതി", "പട്ടികവർഗ്ഗം", "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ"]
    },
    "keywords": {
      "en": ["organic farming", "waste management", "water management", "Kerala government"],
      "ml": ["ജൈവകൃഷി", "മാലിന്യ സംസ്കരണം", "ജലസംരക്ഷണം", "കേരള സർക്കാർ"]
    },
    "link": "http://haritham.kerala.gov.in/",
    "ratings": {
      "avgRating": 0,
      "count": 0
    }
  },
  {
    "id": "agriculture23",
    "name": {
      "en": "Idukki Special Dairy Package",
      "ml": "ഇടുക്കി സ്പെഷ്യൽ ക്ഷീര പാക്കേജ്"
    },
    "description": {
      "en": "Enhance dairy productivity and income",
      "ml": "ക്ഷീര ഉത്പാദനക്ഷമതയും വരുമാനവും വർദ്ധിപ്പിക്കുക"
    },
    "category": {
      "en": "Dairy",
      "ml": "ക്ഷീരം"
    },
    "targetAudience": {
      "en": "Dairy farmers in Idukki",
      "ml": "ഇടുക്കിയിലെ ക്ഷീരകർഷകർ"
    },
    "implementingAgency": {
      "en": "Dept. of Dairy Development, Kerala",
      "ml": "ക്ഷീരവികസന വകുപ്പ്, കേരളം"
    },
    "benefits": {
      "en": "Financial and infrastructural support",
      "ml": "സാമ്പത്തികവും അടിസ്ഥാന സൗകര്യപരവുമായ പിന്തുണ"
    },
    "eligibility": {
      "en": "Dairy farmers in Idukki district",
      "ml": "ഇടുക്കി ജില്ലയിലെ ക്ഷീരകർഷകർ"
    },
    "documentsRequired": {
      "en": "Not specified, likely proof of dairy farming and identity",
      "ml": "പ്രത്യേകം പറഞ്ഞിട്ടില്ല, ക്ഷീരകർഷകന്റെയും തിരിച്ചറിയലിന്റെയും തെളിവുകൾ ആവശ്യമായി വരാം"
    },
    "applicationProcess": {
      "en": "Contact Department of Dairy Development, Kerala offices in Idukki",
      "ml": "ഇടുക്കിയിലെ ക്ഷീരവികസന വകുപ്പ്, കേരളം ഓഫീസുകളുമായി ബന്ധപ്പെടുക"
    },
    "ageGroup": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "gender": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "incomeLevel": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "profession": {
      "en": "Dairy Farmer",
      "ml": "ക്ഷീരകർഷകൻ"
    },
    "location": {
      "en": "Idukki, Kerala",
      "ml": "ഇടുക്കി, കേരളം"
    },
    "socialCategory": {
      "en": ["General", "SC", "ST", "OBC"],
      "ml": ["പൊതുവിഭാഗം", "പട്ടികജാതി", "പട്ടികവർഗ്ഗം", "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ"]
    },
    "keywords": {
      "en": ["dairy", "productivity", "income", "Idukki", "Kerala government"],
      "ml": ["ക്ഷീരം", "ഉത്പാദനക്ഷമത", "വരുമാനം", "ഇടുക്കി", "കേരള സർക്കാർ"]
    },
    "link": "https://dairydevelopment.kerala.gov.in/Eng/index.php/institutions/district-wise-offices?id=534",
    "ratings": {
      "avgRating": 0,
      "count": 0
    }
  },
  {
    "id": "agriculture24",
    "name": {
      "en": "Ksheera Theeram",
      "ml": "ക്ഷീര തീരം"
    },
    "description": {
      "en": "Improve milk quality and farmer welfare",
      "ml": "പാൽ ഗുണനിലവാരം മെച്ചപ്പെടുത്തുകയും കർഷക ക്ഷേമം ഉറപ്പാക്കുകയും ചെയ്യുക"
    },
    "category": {
      "en": "Dairy",
      "ml": "ക്ഷീരം"
    },
    "targetAudience": {
      "en": "Dairy farmers",
      "ml": "ക്ഷീരകർഷകർ"
    },
    "implementingAgency": {
      "en": "Dept. of Dairy Development, Kerala",
      "ml": "ക്ഷീരവികസന വകുപ്പ്, കേരളം"
    },
    "benefits": {
      "en": "Cattle feed, veterinary aid, milk chilling support",
      "ml": "കന്നുകാലി തീറ്റ, വെറ്ററിനറി സഹായം, പാൽ ശീതീകരണ പിന്തുണ"
    },
    "eligibility": {
      "en": "Dairy farmers in Kerala",
      "ml": "കേരളത്തിലെ ക്ഷീരകർഷകർ"
    },
    "documentsRequired": {
      "en": "Not specified, likely proof of dairy farming and identity",
      "ml": "പ്രത്യേകം പറഞ്ഞിട്ടില്ല, ക്ഷീരകർഷകന്റെയും തിരിച്ചറിയലിന്റെയും തെളിവുകൾ ആവശ്യമായി വരാം"
    },
    "applicationProcess": {
      "en": "Contact Department of Dairy Development, Kerala",
      "ml": "ക്ഷീരവികസന വകുപ്പ്, കേരളവുമായി ബന്ധപ്പെടുക"
    },
    "ageGroup": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "gender": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "incomeLevel": {
      "en": "All",
      "ml": "എല്ലാവരും"
    },
    "profession": {
      "en": "Dairy Farmer",
      "ml": "ക്ഷീരകർഷകൻ"
    },
    "location": {
      "en": "Kerala",
      "ml": "കേരളം"
    },
    "socialCategory": {
      "en": ["General", "SC", "ST", "OBC"],
      "ml": ["പൊതുവിഭാഗം", "പട്ടികജാതി", "പട്ടികവർഗ്ഗം", "മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ"]
    },
    "keywords": {
      "en": ["milk quality", "dairy welfare", "cattle feed", "veterinary aid", "Kerala government"],
      "ml": ["പാൽ ഗുണനിലവാരം", "ക്ഷീര ക്ഷേമം", "കന്നുകാലി തീറ്റ", "വെറ്ററിനറി സഹായം", "കേരള സർക്കാർ"]
    },
    "link": "https://keralabank.co.in/p_l_agri_014.php",
    "ratings": {
      "avgRating": 0,
      "count": 0
    }
  }
];
