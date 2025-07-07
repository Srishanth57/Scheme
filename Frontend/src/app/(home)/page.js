// src/MyScheme.jsx
"use client";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import React from "react";

import "./MyScheme.css";
import CategoryGrid from "./CategoryGrid";
import Footer from "./Footer";
import Highlight from "./Highlight";

import Link from "next/link";

import { useTranslation } from "react-i18next";

function MyScheme() {
  const images = [
    { src: "/students.jpg", alt: "Students in a classroom" },
    { src: "/student1.jpg", alt: "Student studying" },
    { src: "/student2.jpg", alt: "Students collaborating" },
  ];
  const { t } = useTranslation();

  return (
    <div className="overflow-x-hidden">
      {/* Carousel */}
      <ImageCarousel images={images} />
      {/* Highlight Section */}
      <Highlight />

      {/* Hero Section */}
      <section className="hero fade-in">
        <h1>{t("welcome")}</h1>
        <h2>Find the Right Government Schemes for You</h2>
        <p>
          Search and filter thousands of central and state government welfare
          schemes in one place.
        </p>
        <Link href="/dashboard/allScheme">Explore Schemes</Link>
      </section>

      <CategoryGrid />
      <Footer />
    </div>
  );
}

export default MyScheme;
