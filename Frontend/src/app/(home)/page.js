"use client";
import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  CheckCircle,
  Wheat,
  Building2,
  Baby,
  Accessibility,
  Users,
  FileText,
  Heart,
  UserX,
} from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";

const Page = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Create refs for the sections you want to scroll to
  const heroRef = useRef(null);
  const schemesRef = useRef(null);

  // 2. Create a handler function for scrolling
  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  // 3. Define navigation links with names and their corresponding refs
  const navLinks = [
    { name: "Home", ref: heroRef, href: "#home" },
    { name: "Schemes", ref: schemesRef, href: "#schemes" },
  ];

  const schemeCategories = [
    {
      title: "Agriculture Schemes",
      description:
        "Financial support and resources for farmers and agricultural development",
      icon: Wheat,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/agriculture",
    },
    {
      title: "Caste Schemes",
      description:
        "Empowerment programs for scheduled castes and backward communities",
      icon: Building2,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/caste",
    },
    {
      title: "Children Schemes",
      description: "Educational support and welfare programs for children",
      icon: Baby,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/children",
    },
    {
      title: "Disabled Schemes",
      description:
        "Support and rehabilitation programs for persons with disabilities",
      icon: Accessibility,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/disabled",
    },
    {
      title: "Elderly Schemes",
      description: "Healthcare and pension support for senior citizens",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/elderly",
    },
    {
      title: "Government Schemes",
      description: "General welfare and development programs by the government",
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/governmentSchemes/scheme",
    },
    {
      title: "Healthcare Schemes",
      description: "Medical insurance and healthcare support programs",
      icon: Heart,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/healthCare",
    },
    {
      title: "Women Schemes",
      description: "Empowerment and support programs for women development",
      icon: UserX,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-700",
      url: "/dashboard/women",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-4 min-h-screen">
        <Spinner size="lg" color="primary" label="Loading schemes..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        id="home"
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url('/Frame3.jpg')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

        {/* Header */}
        <header className="fixed top-0 w-full py-4 md:py-6 z-50  bg-transparent shadow-md">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="flex rounded outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">C</span>
                  </div>
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="text-black hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-7 h-7" />
                  ) : (
                    <Menu className="w-7 h-7" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {/* Navigation Links */}
                <nav className="flex items-center space-x-8">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(item.ref);
                      }}
                      className="text-base font-medium text-black transition-all duration-200 rounded focus:outline-none hover:text-blue-600 hover:ring-1 hover:ring-blue-200 hover:ring-offset-1 hover:scale-105 px-5 py-2 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="w-px h-5 bg-black bg-opacity-30"></div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                  {" "}
                  <SignedOut>
                    <SignInButton>
                      <a
                        href="#"
                        className="px-5 py-2 text-base font-semibold leading-7 text-black border border-black rounded-lg hover:scale-105 transition-all hover:bg-white duration-200"
                      >
                        Login
                      </a>
                    </SignInButton>
                    <SignUpButton>
                      <a
                        href="#"
                        className="text-base font-medium rounded-lg leading-7 border border-transparent bg-blue-500 px-7 py-2 transition-all duration-200 hover:scale-105 text-white hover:bg-blue-600"
                      >
                        Sign up
                      </a>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton showName />
                  </SignedIn>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 p-4 bg-white/90 backdrop-blur-md rounded-lg">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(item.ref);
                      }}
                      className="text-base font-medium text-black hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <a
                      href="#"
                      className="px-4 py-2 text-black border border-black rounded-lg text-center"
                    >
                      Login
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center"
                    >
                      Sign up
                    </a>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Hero Content */}
        <section className="relative py-10 sm:py-16 lg:py-20 flex-1 z-10 pt-[20%]">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[60vh] gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left max-w-2xl">
                <div className="space-y-6">
                  <h1 className="text-4xl font-sans leading-tight text-black sm:text-5xl lg:text-6xl">
                    Power your{" "}
                    <span className="italic text-blue-500 font-['Lobster_Two']">
                      ambitions
                    </span>{" "}
                    with the right support
                  </h1>

                  {/* Stats Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <p className="text-lg text-black">
                      Unlock your{" "}
                      <span className="font-bold text-blue-600">potential</span>
                      <br className="sm:hidden" /> with the right scheme.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <a
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-500 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-blue-400 hover:bg-blue-600 hover:scale-105 transform shadow-lg cursor-pointer"
                  >
                    Explore Schemes
                  </a>
                </div>
              </div>

              {/* Image Section */}
              <div className="hidden lg:block flex-1 max-w-lg w-full">
                <div className="relative w-96 h-96 lg:h-[500px]">
                  {/* Main Image */}
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/pexels-ebin-kuriakose-706000-15305762.jpg')",
                      boxShadow:
                        "0 25px 50px -10px rgb(33, 121, 243), 0 10px 10px -10px rgb(39, 107, 242)",
                    }}
                  ></div>

                  {/* Floating Cards */}
                  <div className="absolute -bottom-10 -left-11 w-32 h-40 bg-white border-2 border-white rounded-xl overflow-hidden transform rotate-6 hover:rotate-12 transition-transform duration-300 shadow-xl">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('/pexels-shafi_fotumcatcher-1249695-2378278.jpg')",
                      }}
                    ></div>
                  </div>

                  <div className="absolute -top-9 -right-14 w-48 h-40 border-2 border-white bg-white rounded-xl overflow-hidden transform -rotate-6 hover:-rotate-12 transition-transform duration-300 shadow-xl">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('/pexels-visualentity-3633950.jpg')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Action Button */}
        <div className="fixed bottom-5 right-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50 cursor-pointer">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Government Schemes Section */}
      <section
        ref={schemesRef}
        id="schemes"
        className="min-h-screen px-7 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      >
        <div className="mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="px-8 pt-20 pb-12 text-center">
            <p className="mb-6 text-lg text-blue-500 font-medium uppercase tracking-wide">
              Who are we for
            </p>
            <h1 className="text-4xl md:text-5xl leading-tight font-bold text-gray-900 mb-4">
              Personalised Schemes For You
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover government schemes and benefits tailored to your needs
              and eligibility
            </p>
          </div>

          {/* Government Schemes Grid */}
          <div className="py-12 px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {schemeCategories.map((scheme, index) => {
                const IconComponent = scheme.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-8 text-center hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 group cursor-pointer min-h-[200px]"
                    onClick={() => router.push(scheme.url)}
                  >
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${scheme.gradient} ${scheme.hoverGradient} transition-all duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {scheme.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {scheme.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
