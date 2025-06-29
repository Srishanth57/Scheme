import React from "react";
import {
  Leaf,
  HeartPulse,
  Hand,
  Accessibility,
  Handshake,
  User,
  GraduationCap,
  Home,
  Gavel,
  Glasses,
} from "lucide-react";

const categories = [
  {
    name: "Women and Child Welfare",
    count: 20,
    icon: <User color="#e11d48" size={40} />,
  },
  {
    name: "Government Schemes for the Elderly",
    count: 20,
    icon: <Glasses color="#1e3a8a" size={40} />,
  },
  {
    name: "Schemes for Persons with Disabilities",
    count: 20,
    icon: <Accessibility color="#7c3aed" size={40} />,
  },
  {
    name: "Social Welfare & Empowerment",
    count: 50,
    icon: <Hand color="#ea580c" size={40} />,
  },
  {
    name: "Business & Entrepreneurship",
    count: 50,
    icon: <Handshake color="#4b5563" size={40} />,
  },
  {
    name: "Agriculture, Rural & Environment",
    count: 50,
    icon: <Leaf color="#15803d" size={40} />,
  },
  {
    name: "Education & Learning",
    count: 85,
    icon: <GraduationCap color="#e11d48" size={40} />,
  },
  {
    name: "Housing & Shelter",
    count: 20,
    icon: <Home color="#2563eb" size={40} />,
  },
  {
    name: "Public Safety, Law & Justice",
    count: 10,
    icon: <Gavel color="#92400e" size={40} />,
  },
  {
    name: "Health & Wellness",
    count: 50,
    icon: <HeartPulse color="#0d9488" size={40} />,
  },
];

export default function CategoryGrid() {
  return (
    <div className=" text-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-blue-900">Categories</h2>
      <div
        className="
          grid gap-8 max-w-6xl mx-auto px-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-slate-100 rounded-2xl p-4 transition-transform duration-300 cursor-pointer shadow-md flex flex-col items-center hover:scale-105"
          >
            <div className="bg-sky-100 p-4 rounded-full mb-3">{cat.icon}</div>
            <div className="text-emerald-700 font-medium text-sm mb-1">
              {cat.count} Schemes
            </div>
            <div className="text-base font-semibold text-gray-900">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
