"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "app/layout";
import "../globals.css";

const recommendData = [
  {
    en: "financial assistance",
    ml: "സാമ്പത്തിക സഹായം",
    category: "finance",
  },
  {
    en: "subsidy",
    ml: "സബ്സിഡി",
    category: "finance",
  },
  {
    en: "loan",
    ml: "വായ്പ",
    category: "finance",
  },
  {
    en: "pension",
    ml: "പെൻഷൻ",
    category: "finance",
  },
  {
    en: "health insurance",
    ml: "ആരോഗ്യ ഇൻഷുറൻസ്",
    category: "health",
  },
  {
    en: "free treatment",
    ml: "സൗജന്യ ചികിത്സ",
    category: "health",
  },
  {
    en: "healthcare",
    ml: "ആരോഗ്യ പരിരക്ഷ",
    category: "health",
  },
  {
    en: "women",
    ml: "വനിതകൾ",
    category: "women",
  },
  {
    en: "children",
    ml: "കുട്ടികൾ",
    category: "children",
  },
  {
    en: "senior citizen",
    ml: "മുതിർന്ന പൗരൻ",
    category: "elderly",
  },
  {
    en: "disabled",
    ml: "ഭിന്നശേഷി",
    category: "disabled",
  },
  {
    en: "farmers",
    ml: "കർഷകർ",
    category: "agriculture",
  },
  {
    en: "SC",
    ml: "പട്ടികജാതി",
    category: "caste",
  },
  {
    en: "ST",
    ml: "പട്ടികവർഗ്ഗം",
    category: "caste",
  },
  {
    en: "BPL",
    ml: "ബിപിഎൽ",
    category: "caste",
  },
  {
    en: "education",
    ml: "വിദ്യാഭ്യാസം",
    category: "education",
  },
  {
    en: "scholarship",
    ml: "സ്കോളർഷിപ്പ്",
    category: "education",
  },
  {
    en: "students",
    ml: "വിദ്യാർത്ഥികൾ",
    category: "education",
  },
  {
    en: "self-employment",
    ml: "സ്വയംതൊഴിൽ",
    category: "employment",
  },
  {
    en: "entrepreneurship",
    ml: "സംരംഭകത്വം",
    category: "employment",
  },
  {
    en: "skill development",
    ml: "നൈപുണ്യ വികസനം",
    category: "employment",
  },
  {
    en: "housing",
    ml: "ഭവനം",
    category: "housing",
  },
  {
    en: "house loan",
    ml: "ഭവന വായ്പ",
    category: "housing",
  },
  {
    en: "LIFE Mission",
    ml: "ലൈഫ് മിഷൻ",
    category: "housing",
  },
  {
    en: "water supply",
    ml: "കുടിവെള്ളം",
    category: "government",
  },
  {
    en: "Jal Jeevan Mission",
    ml: "ജൽ ജീവൻ മിഷൻ",
    category: "government",
  },
  {
    en: "sanitation",
    ml: "ശുചിത്വം",
    category: "government",
  },
  {
    en: "toilet",
    ml: "ശൗചാലയം",
    category: "government",
  },
  {
    en: "dairy",
    ml: "ക്ഷീരം",
    category: "agriculture",
  },
  {
    en: "cattle feed",
    ml: "കാലിത്തീറ്റ",
    category: "agriculture",
  },
  {
    en: "fodder",
    ml: "തീറ്റപ്പുൽ",
    category: "agriculture",
  },
  {
    en: "women empowerment",
    ml: "വനിതാ ശാക്തീകരണം",
    category: "women",
  },
  {
    en: "child protection",
    ml: "ശിശു സംരക്ഷണം",
    category: "children",
  },
  {
    en: "maternity benefit",
    ml: "പ്രസവാനുകൂല്യം",
    category: "health",
  },
  {
    en: "helpline",
    ml: "ഹെൽപ്പ് ലൈൻ",
    category: "government",
  },
  {
    en: "PM-JAY",
    ml: "പിഎം-ജെഎവൈ",
    category: "health",
  },
  {
    en: "Ayushman Bharat",
    ml: "ആയുഷ്മാൻ ഭാരത്",
    category: "health",
  },
  {
    en: "Ksheerasree",
    ml: "ക്ഷീരശ്രീ",
    category: "agriculture",
  },
  {
    en: "Kudumbasree",
    ml: "കുടുംബശ്രീ",
    category: "employment",
  },
  {
    en: "minority",
    ml: "ന്യൂനപക്ഷം",
    category: "caste",
  },
  {
    en: "rehabilitation",
    ml: "പുനരധിവാസം",
    category: "disabled",
  },
  {
    en: "assistive devices",
    ml: "സഹായ ഉപകരണങ്ങൾ",
    category: "disabled",
  },
  {
    en: "shelter",
    ml: "അഭയം",
    category: "housing",
  },
  {
    en: "nutrition",
    ml: "പോഷകാഹാരം",
    category: "health",
  },
  {
    en: "training",
    ml: "പരിശീലനം",
    category: "employment",
  },
  {
    en: "investment",
    ml: "നിക്ഷേപം",
    category: "finance",
  },
  {
    en: "Kerala Government",
    ml: "കേരള സർക്കാർ",
    category: "government",
  },
  {
    en: "Central Government",
    ml: "കേന്ദ്ര സർക്കാർ",
    category: "government",
  },
  {
    en: "LSGI",
    ml: "തദ്ദേശ സ്ഥാപനം",
    category: "government",
  },
  {
    en: "co-operative society",
    ml: "സഹകരണ സംഘം",
    category: "government",
  },
];

const Page = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [selectedTags, setSelectedTags] = useState([]);
  const { tags, setTags } = useAppContext();
  const router = useRouter();

  const handleTagUpdate = () => {
    setTags(selectedTags);
  };

  const translations = {
    en: {
      popularTags: "Popular Search Tags",
      tagsSubtitle: "Quick search by selecting relevant tags for your needs",
      selectedTags: "Selected Tags",
      findSchemes: "Find My Schemes",
    },
    ml: {
      popularTags: "ജനപ്രിയ സെർച്ച് ടാഗുകൾ",
      tagsSubtitle:
        "നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് പ്രസക്തമായ ടാഗുകൾ തിരഞ്ഞെടുത്ത് വേഗത്തിൽ തിരയുക",
      selectedTags: "തിരഞ്ഞെടുത്ത ടാഗുകൾ",
      findSchemes: "എന്റെ പദ്ധതികൾ കണ്ടെത്തുക",
    },
  };

  const toggleTag = (tagText) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagText)) {
        return prev.filter((tag) => tag !== tagText);
      } else {
        return [...prev, tagText];
      }
    });
  };

  const isTagSelected = (tagText) => {
    return selectedTags.includes(tagText);
  };

  const getCategoryColor = (category) => {
    const colors = {
      finance:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      health: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      women: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
      children:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      elderly:
        "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
      disabled:
        "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200",
      agriculture:
        "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
      caste: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
      education: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      employment: "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200",
      housing: "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
      government:
        "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    );
  };

  const getSelectedCategoryColor = (category) => {
    const colors = {
      finance: "bg-green-600 text-white border-green-600 shadow-lg",
      health: "bg-red-600 text-white border-red-600 shadow-lg",
      women: "bg-pink-600 text-white border-pink-600 shadow-lg",
      children: "bg-purple-600 text-white border-purple-600 shadow-lg",
      elderly: "bg-orange-600 text-white border-orange-600 shadow-lg",
      disabled: "bg-indigo-600 text-white border-indigo-600 shadow-lg",
      agriculture: "bg-yellow-600 text-white border-yellow-600 shadow-lg",
      caste: "bg-gray-600 text-white border-gray-600 shadow-lg",
      education: "bg-blue-600 text-white border-blue-600 shadow-lg",
      employment: "bg-cyan-600 text-white border-cyan-600 shadow-lg",
      housing: "bg-teal-600 text-white border-teal-600 shadow-lg",
      government: "bg-slate-600 text-white border-slate-600 shadow-lg",
    };
    return (
      colors[category] || "bg-gray-600 text-white border-gray-600 shadow-lg"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setCurrentLang(currentLang === "en" ? "ml" : "en")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentLang === "en" ? "മലയാളം" : "English"}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {translations[currentLang].popularTags}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {translations[currentLang].tagsSubtitle}
          </p>
        </div>

        {/* Tags Grid */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {recommendData.map((tag, index) => (
            <button
              key={`${tag.en}-${index}`}
              onClick={() => toggleTag(tag[currentLang])}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                isTagSelected(tag[currentLang])
                  ? getSelectedCategoryColor(tag.category)
                  : getCategoryColor(tag.category)
              }`}
              style={{
                animationDelay: `${index * 30}ms`,
                animation: "fadeIn 0.5s ease-out forwards",
              }}
            >
              {tag[currentLang]}
            </button>
          ))}
        </div>

        {/* Selected Count and Continue Button */}
        {selectedTags.length > 0 && (
          <div className="text-center">
            <div className="mb-6">
              <span className="text-gray-700 font-medium text-lg">
                {translations[currentLang].selectedTags}: {selectedTags.length}
              </span>
            </div>
            <button
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
              onClick={() => (
                router.push("/dashboard/allScheme"), handleTagUpdate()
              )}
            >
              {translations[currentLang].findSchemes}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
