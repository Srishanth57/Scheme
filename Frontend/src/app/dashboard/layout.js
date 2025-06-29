"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import React, { createContext, useContext, useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "app/components/app-sidebar";

import Header from "app/components/Header";
import "../globals.css";
import NavBar from "app/components/NavBar";
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
  const [sidebarFilters, setSidebarFilters] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("agriculture");

  const handleInputValue = (value) => {
    setInputValue(value);
  };
  const handleSidebarFilterChange = (newFiltersFromSidebar) => {
    setSidebarFilters(newFiltersFromSidebar);
  };

  const handleNavMenuSelection =(value) =>{
    setSelectedTab(value)
  }
  const contextValue = {
    setSelectedTab,
    selectedTab,
    sidebarFilters,
    inputValue,
    handleNavMenuSelection,
    handleSidebarFilterChange,
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
                  <div className=" sticky top-0 z-50 backdrop-blur-lg bg-white/60 dark:bg-black/60">
                    <Header handleInputValue={handleInputValue} />
                  </div>
                  {/* Main Content */}
                  <div>{children}</div>
                </SidebarInset>
              </SidebarProvider>
            </DashboardContext.Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
