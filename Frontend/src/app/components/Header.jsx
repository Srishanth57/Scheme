"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavMenu, NavigationMenuDemo } from "./NavigationMenu";

const Links = [
  { displayName: "All Schemes", link: "/dashboard/allScheme" },
  { displayName: "Agriculture", link: "/dashboard/agriculture" },
  { displayName: "Health-care", link: "/dashboard/healthCare" },
  { displayName: "Disabled", link: "/dashboard/disabled" },
  { displayName: "Caste", link: "/dashboard/caste" },
  { displayName: "Children", link: "/dashboard/children" },
  { displayName: "Schemes", link: "/dashboard/governmentSchemes/scheme" },
  {
    displayName: "National Health Mission",
    link: "/dashboard/governmentSchemes/nationHealth",
  },
  {
    displayName: "Kerala Water Authority",
    link: "/dashboard/governmentSchemes/keralaWaterAuthority",
  },
  {
    displayName: "LIFE Mission",
    link: "/dashboard/governmentSchemes/lifeMission",
  },
  {
    displayName: "Police Department",
    link: "/dashboard/governmentSchemes/policeDepartment",
  },
  {
    displayName: "Cooperative Department",
    link: "/dashboard/governmentSchemes/Cooperative",
  },
];
const Header = ({ handleInputValue }) => {
  const [inputValue, setInputValue] = useState("");
  const pathName = usePathname();
  const currentLinkObject = Links.find((each) => each.link === pathName);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    handleInputValue(event.target.value);
  };
  return (
    <div>
      <header className=" flex h-16 w-[100%] items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 max-md:visible " />
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
      <div>
        {/* Navigation menu for swtiching between the tabs*/}
        <NavigationMenuDemo /> {/* for desktop view */}
        <MobileNavMenu /> {/* for mobile view */}
      </div>
      <div>
        <p>{currentLinkObject?.displayName}</p>
      </div>
    </div>
  );
};

export default Header;
