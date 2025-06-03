"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "app/components/ModeToggle";
import Link from "next/link";
import { nationalSchemes } from "../data/schemes"; // Ensure this path is correct
import { DialogCloseButton } from "app/components/DialogCloseButton";

import { useState, useMemo } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  // sidebarFilters will store the object from FilterSection, e.g.,
  // { ageGroup: "18-25", gender: "Female", incomeLevel: "Low", ... }
  // Each value can be a string (the selected option) or null.
  const [sidebarFilters, setSidebarFilters] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSidebarFilterChange = (newFiltersFromSidebar) => {
    setSidebarFilters(newFiltersFromSidebar);
  };

  const schemesToDisplay = useMemo(() => {
    // Start with schemes filtered by search input
    let currentSchemes = nationalSchemes.filter((scheme) =>
      scheme.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (sidebarFilters) {
      currentSchemes = currentSchemes.filter((scheme) => {
        // Check Age Group
        if (
          sidebarFilters.ageGroup &&
          !scheme.eligibility.ageGroup.includes(sidebarFilters.ageGroup)
        ) {
          return false;
        }

        // Check Gender
        if (sidebarFilters.gender) {
          const filterGenderLower = sidebarFilters.gender.toLowerCase();
          const schemeGenderLower = scheme.eligibility.gender.toLowerCase();
          // Scheme matches if its gender is "all" or directly matches the filter
          if (
            schemeGenderLower !== "all" &&
            schemeGenderLower !== filterGenderLower
          ) {
            return false;
          }
        }

        // Check Income Level
        if (
          sidebarFilters.incomeLevel &&
          !scheme.eligibility.incomeLevel.includes(sidebarFilters.incomeLevel)
        ) {
          return false;
        }

        // Check Category
        if (
          sidebarFilters.category &&
          !scheme.eligibility.category.includes(sidebarFilters.category)
        ) {
          return false;
        }

        // Check Profession
        if (
          sidebarFilters.profession &&
          !scheme.eligibility.profession.includes(sidebarFilters.profession)
        ) {
          return false;
        }

        // Check Location
        if (
          sidebarFilters.location &&
          !scheme.eligibility.location.includes(sidebarFilters.location)
        ) {
          return false;
        }

        return true; // Scheme matches all active sidebar filters
      });
    }

    return currentSchemes;
  }, [inputValue, sidebarFilters]);

  return (
    <SidebarProvider>
      <AppSidebar filterSection={handleSidebarFilterChange} />
      <SidebarInset>
        <header className="flex h-16 w-full items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href="/home">Home page</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className=" flex justify-end mr-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-row">
          <Input
            type="search"
            placeholder="Enter scheme name to search..."
            className="w-full m-4 mt-0 pl-11"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Search strokeWidth={1.5} className="absolute mt-1 left-6" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ul className="grid auto-rows-min gap-4 md:grid-cols-3">
            {schemesToDisplay.map((eachScheme) => (
              <li
                className="bg-muted/50 aspect-video rounded-xl p-5 gap-2.5"
                key={eachScheme.id}
              >
                <h1 className="text-xl">{eachScheme.name}</h1>
                <p className="text-md pt-6 pb-6">{eachScheme.description}</p>

                <DialogCloseButton scheme={eachScheme} />
              </li>
            ))}
          </ul>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
