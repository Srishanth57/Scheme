// src/MyScheme.jsx
"use client";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import React, { useEffect } from "react";
import "./MyScheme.css";
import CategoryGrid from "./CategoryGrid";
import Footer from "./Footer";
import Highlight from "./Highlight";

import Link from "next/link";

function MyScheme() {
  const images = [
    { src: "/students.jpg", alt: "Students in a classroom" },
    { src: "/student1.jpg", alt: "Student studying" },
    { src: "/student2.jpg", alt: "Students collaborating" },
  ];

  return (
    <div>
      <section className="title-bar">
        <div className="title-container">
          <div className="logo-section">
            <img src="/emblemmm.png" alt="Emblem of India" className="emblem" />
            <h1 className="logo-title fade-in">
              <span>Yojana</span>
              <span> Connect </span>
            </h1>
            <img
              src="/elephanttt.png"
              alt="Emblem of India"
              className="emblemm"
            />
          </div>

          <nav className="top-navbar">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Schemes</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Carousel */}

      <ImageCarousel images={images} />
      {/* Highlight Section */}
      <Highlight />

      {/* Hero Section */}
      <section className="hero fade-in">
        <h2>Find the Right Government Schemes for You</h2>
        <p>
          Search and filter thousands of central and state government welfare
          schemes in one place.
        </p>
        <Link href="/dashboard">Explore Schemes</Link>
      </section>

      <CategoryGrid />
      <Footer />
    </div>
  );
}

export default MyScheme;
