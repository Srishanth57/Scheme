"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/main-components/app-sidebar";
import Header from "@/components/main-components/Header";
import "../globals.css";
import NavBar from "@/components/main-components/NavBar";
import { useTranslation } from "next-i18next";
import { ScrollToTop } from "@/components/main-components/ScrollToTop";

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

// Default filter state
const defaultFilters = {
  ageGroup: "All",
  gender: "All",
  incomeLevel: "All",
  profession: "All",
  location: "All",
  implementedBy: "All",
  category: [],
  keywords: [],
};

// Helper functions for localStorage operations
const getStoredFilters = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("dashboardFilters");
      return stored ? JSON.parse(stored) : defaultFilters;
    } catch (error) {
      console.warn("Error reading filters from localStorage:", error);
      return defaultFilters;
    }
  }
  return defaultFilters;
};

const getStoredInputValue = () => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("dashboardInputValue") || "";
    } catch (error) {
      console.warn("Error reading input value from localStorage:", error);
      return "";
    }
  }
  return "";
};

const getStoredSelectedTab = () => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("dashboardSelectedTab") || "agriculture";
    } catch (error) {
      console.warn("Error reading selected tab from localStorage:", error);
      return "agriculture";
    }
  }
  return "agriculture";
};

export default function RootLayout({ children }) {
  // Initialize state with stored values or defaults
  const [sidebarFilters, setSidebarFilters] = useState(defaultFilters);
  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("agriculture");
  const [isHydrated, setIsHydrated] = useState(false);

  const { i18n } = useTranslation();
  const currentLang = i18n?.language || "en";

  // Hydrate state from localStorage after component mounts
  useEffect(() => {
    setSidebarFilters(getStoredFilters());
    setInputValue(getStoredInputValue());
    setSelectedTab(getStoredSelectedTab());
    setIsHydrated(true);
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "dashboardFilters",
          JSON.stringify(sidebarFilters)
        );
      } catch (error) {
        console.warn("Error saving filters to localStorage:", error);
      }
    }
  }, [sidebarFilters, isHydrated]);

  // Save input value to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem("dashboardInputValue", inputValue);
      } catch (error) {
        console.warn("Error saving input value to localStorage:", error);
      }
    }
  }, [inputValue, isHydrated]);

  // Save selected tab to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem("dashboardSelectedTab", selectedTab);
      } catch (error) {
        console.warn("Error saving selected tab to localStorage:", error);
      }
    }
  }, [selectedTab, isHydrated]);

  const handleInputValue = useCallback((value) => {
    setInputValue(value);
  }, []);

  const handleSidebarFilterChange = useCallback((newFilters) => {
    setSidebarFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const handleNavMenuSelection = useCallback((value) => {
    setSelectedTab(value);
  }, []);

  // Clear all stored data (useful for reset functionality)
  const clearStoredFilters = useCallback(() => {
    setSidebarFilters(defaultFilters);
    setInputValue("");
    setSelectedTab("agriculture");

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("dashboardFilters");
        localStorage.removeItem("dashboardInputValue");
        localStorage.removeItem("dashboardSelectedTab");
      } catch (error) {
        console.warn("Error clearing localStorage:", error);
      }
    }
  }, []);

  const contextValue = {
    setSelectedTab,
    selectedTab,
    sidebarFilters,
    inputValue,
    handleNavMenuSelection,
    handleSidebarFilterChange,
    handleInputValue,
    clearStoredFilters,
    currentLang,
    isHydrated, // Can be used to prevent rendering until hydrated
  };

  return (
    <ClerkProvider lang="en" suppressHydrationWarning>
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

              {/* Main Content - Only render after hydration to prevent mismatch */}
              {isHydrated ? (
                children
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              )}
              <ScrollToTop />
            </SidebarInset>
          </SidebarProvider>
        </DashboardContext.Provider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
