"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wheat,
  Baby,
  Accessibility,
  UserCheck,
  Building2,
  Heart,
  UserX,
} from "lucide-react";
import { useAppContext } from "app/layout";
import { redirect } from "next/navigation";

const EventCategories = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const { setPrompt } = useAppContext();

  const categories = [
    { icon: Wheat, title: "Agriculture Schemes", key: "agriculture" },
    { icon: Building2, title: "Caste Schemes", key: "caste" },
    { icon: Baby, title: "Children Schemes", key: "children" },
    { icon: Accessibility, title: "Disabled Schemes", key: "disabled" },
    { icon: UserCheck, title: "Elderly Schemes", key: "elderly" },
    { icon: Building2, title: "Government Schemes", key: "government" },
    { icon: Heart, title: "Healthcare Schemes", key: "healthcare" },
    { icon: UserX, title: "Women Schemes", key: "women" },
  ];

  const generatePrompt = (categoryKey, categoryTitle) => {
    const prompts = {
      agriculture: `Filter and return only those schemes that are intended for 'farmers and agricultural workers'. A scheme is considered for farmers if its description, title, or target audience mentions farming, agriculture, crop cultivation, livestock, or rural agricultural development. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      caste: `Filter and return only those schemes that are intended for 'scheduled castes, scheduled tribes, and other backward classes'. A scheme is considered for these communities if its description, title, or target audience mentions SC, ST, OBC, caste-based reservations, or social welfare for marginalized communities. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      children: `Filter and return only those schemes that are intended for 'children and minors'. A scheme is considered for children if its description, title, or target audience mentions children, minors, kids, child welfare, or individuals under 18 years of age. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      disabled: `Filter and return only those schemes that are intended for 'persons with disabilities'. A scheme is considered for disabled individuals if its description, title, or target audience mentions disability, handicapped, differently abled, special needs, or accessibility support. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      elderly: `Filter and return only those schemes that are intended for 'senior citizens and elderly people'. A scheme is considered for elderly if its description, title, or target audience mentions senior citizens, elderly, old age, retirement, or individuals above 60 years of age. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      government: `Filter and return only those schemes that are intended for 'government employees and public sector workers'. A scheme is considered for government workers if its description, title, or target audience mentions government employees, civil servants, public sector, or official government personnel. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      healthcare: `Filter and return only those schemes that are intended for 'healthcare and medical support'. A scheme is considered for healthcare if its description, title, or target audience mentions health, medical care, hospitals, treatment, medicine, or health insurance. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,

      women: `Filter and return only those schemes that are intended for 'women and girls'. A scheme is considered for women if its description, title, or target audience mentions women, girls, female, women empowerment, or gender-specific benefits. The output must be a pure JSON array containing the filtered scheme objects. Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`,
    };

    return (
      prompts[categoryKey] || `Filter and return schemes for ${categoryTitle}`
    );
  };

  const handleCardClick = (categoryKey, categoryTitle) => {
    const prompt = generatePrompt(categoryKey, categoryTitle);
    setGeneratedPrompt(prompt);
    setPrompt(prompt);
    redirect("/dashboard/allScheme");
    // Copy to clipboard
    navigator.clipboard.writeText(prompt).then(() => {
      console.log("Prompt copied to clipboard");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 font-sans">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm text-blue-700 mb-4 uppercase tracking-wide font-medium">
            Who are we for
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 animate-fade-in leading-tight">
            Personalised Schemes For You
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedCard === index;

            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-300 border-0 ${
                  isSelected
                    ? "bg-white/90 backdrop-blur-sm shadow-xl scale-105 shadow-blue-500/25 ring-2 ring-blue-500"
                    : "bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg hover:-translate-y-1 shadow-blue-200/50"
                } shadow-sm`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
                onMouseEnter={() => setSelectedCard(index)}
                onMouseLeave={() => setSelectedCard(null)}
                onClick={() => handleCardClick(category.key, category.title)}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Icon */}
                  <div
                    className={`mb-6 transition-all duration-300 ${
                      isSelected ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <IconComponent
                      size={40}
                      className={`mx-auto transition-all duration-300 ${
                        isSelected
                          ? "text-blue-700"
                          : "text-blue-600 group-hover:text-blue-700"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? "text-slate-900"
                        : "text-slate-800 group-hover:text-slate-900"
                    }`}
                  >
                    {category.title}
                  </h2>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventCategories;
