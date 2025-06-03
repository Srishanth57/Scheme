import React from 'react';
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

  Glasses
} from "lucide-react";

import './CategoryGrid.css';
const categories = [
  {
    name: "Women and Child Welfare",
    count: 20,
    icon: <User color="#e11d48" size={40} />
  },
  {
    name: "Government Schemes for the Elderly",
    count: 20,
    icon: <Glasses color="#1e3a8a" size={40} />
  },
  {
    name: "Schemes for Persons with Disabilities",
    count: 20,
    icon: <Accessibility color="#7c3aed" size={40} />
  },
  {
    name: "Social Welfare & Empowerment",
    count: 50,
    icon: <Hand color="#ea580c" size={40} />
  },
    { name: "Business & Entrepreneurship", count: 50, icon: <Handshake color="#4b5563" size={40} /> },
  {
    name: "Agriculture, Rural & Environment",
    count: 50,
    icon: <Leaf color="#15803d" size={40} />
  },
  { name: "Education & Learning", count: 85, icon: <GraduationCap color="#e11d48" size={40} /> },
   { name: "Housing & Shelter", count: 20, icon: <Home color="#2563eb" size={40} /> },
  { name: "Public Safety, Law & Justice", count: 10, icon: <Gavel color="#92400e" size={40} /> },
  {
    name: "Health & Wellness",
    count: 50,
    icon: <HeartPulse color="#0d9488" size={40} />
  }
];


export default function CategoryGrid() {
  return (
    <section className="category-grid-section">
      <h2 className="category-title">Find schemes based on categories</h2>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <div className="category-icon">{cat.icon}</div>
            <div className="category-count">{cat.count} Schemes</div>
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
