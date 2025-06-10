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
import { agricultureScheme } from "app/data/agriculture";
import { DialogCloseButton } from "app/components/DialogCloseButton";

import { useState, useMemo, useEffect, useCallback } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  const [sidebarFilters, setSidebarFilters] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSidebarFilterChange = (newFiltersFromSidebar) => {
    setSidebarFilters(newFiltersFromSidebar);
  };

  const schemesToDisplay = useMemo(() => {
    // Start with all schemes filtered by search input
    let filteredSchemes = agricultureScheme.filter((scheme) =>
      scheme.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (
      !sidebarFilters ||
      Object.values(sidebarFilters).every(
        (value) =>
          value === null ||
          value === undefined ||
          value === "" ||
          value === "All" ||
          (Array.isArray(value) && value.length === 0)
      )
    ) {
      return filteredSchemes;
    }

    // Age Group filter
    if (sidebarFilters.ageGroup && sidebarFilters.ageGroup !== "All") {
      filteredSchemes = filteredSchemes.filter(
        (scheme) =>
          (Array.isArray(scheme.ageGroup)
            ? scheme.ageGroup.includes(sidebarFilters.ageGroup)
            : scheme.ageGroup === sidebarFilters.ageGroup) ||
          scheme.ageGroup === "All"
      );
    }
 console.log(filteredSchemes)
 // Gender filter
 if (sidebarFilters.gender && sidebarFilters.gender !== "All") {
   filteredSchemes = filteredSchemes.filter(
     (scheme) =>
      (Array.isArray(scheme.gender)
     ? scheme.gender.includes(sidebarFilters.gender)
     : scheme.gender === sidebarFilters.gender) ||
     scheme.gender === "All"
    );
  }
  console.log(filteredSchemes)
  
  // Income Level filter
  if (sidebarFilters.incomeLevel && sidebarFilters.incomeLevel !== "All") {
    filteredSchemes = filteredSchemes.filter(
      (scheme) =>
        (Array.isArray(scheme.incomeLevel)
      ? scheme.incomeLevel.includes(sidebarFilters.incomeLevel)
      : scheme.incomeLevel === sidebarFilters.incomeLevel) ||
      scheme.incomeLevel === "All"
    );
  }
  console.log(filteredSchemes)
  
  // Profession filter
  if (sidebarFilters.profession && sidebarFilters.profession !== "All") {
    filteredSchemes = filteredSchemes.filter(
      (scheme) =>
        scheme.profession
      .toLowerCase()
      .includes(sidebarFilters.profession.toLowerCase()) ||
      scheme.profession === "All"
    );
  }
  console.log(filteredSchemes)
      // Category filter
      if (sidebarFilters.category && sidebarFilters.category.length > 0) {
        filteredSchemes = filteredSchemes.filter((scheme) => {
          const value = scheme.socialCategory.some((element) =>
            sidebarFilters.category.includes(element)
          );
          return value;
        });
      }
      console.log(filteredSchemes)

    // Add more filters here as needed...

    return filteredSchemes;
  }, [inputValue, sidebarFilters]);

  return (
    <SidebarProvider className="md:w-full lg:w-auto">
      <AppSidebar
        filters={sidebarFilters}
        filterSection={handleSidebarFilterChange}
      />
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
                  <Link href="/">Home page</Link>
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
