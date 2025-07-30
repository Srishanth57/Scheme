"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import React, { createContext, useContext, useState, useCallback } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/main-components/app-sidebar";

import Header from "@/components/main-components/Header";
import "../globals.css";
import NavBar from "@/components/main-components/NavBar";
import { useTranslation } from "next-i18next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const DashboardContext = createContext();

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default function RootLayout({ children }) {
  const [sidebarFilters, setSidebarFilters] = useState({
    ageGroup: "All",
    gender: "All",
    incomeLevel: "All",
    profession: "All",
    location: "All",
    implementedBy: "All",
    category: [],
    keywords: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("agriculture");
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const handleInputValue = (value) => {
    setInputValue(value);
  };

  const handleSidebarFilterChange = useCallback((newFilters) => {
    setSidebarFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const handleNavMenuSelection = (value) => {
    setSelectedTab(value);
  };
  const contextValue = {
    setSelectedTab,
    selectedTab,
    sidebarFilters,
    inputValue,
    handleNavMenuSelection,
    handleSidebarFilterChange,
    currentLang,
  };
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DashboardContext.Provider value={contextValue}>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="overflow-x-hidden">
                  <NavBar />
                  <Header handleInputValue={handleInputValue} />

                  {/* Main Content */}
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </DashboardContext.Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
