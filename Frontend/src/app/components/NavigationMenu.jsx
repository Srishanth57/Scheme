"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useDashboardContext } from "app/dashboard/layout";

const components = [
  {
    title: "Agriculture",
    key: "agriculture",
    href: "/dashboard/agriculture",
    description:
      "Schemes tailored to support farmers, agricultural development, and rural livelihoods through subsidies, training, and financial aid.",
  },
  {
    title: "Health-care",
    key: "healthCare",
    href: "/dashboard/healthCare",
    description:
      "Access healthcare-related schemes including maternal care, insurance coverage, free treatment, and rural health missions.",
  },
  {
    title: "Disabled",
    key: "disabled",
    href: "/dashboard/disabled",
    description:
      "Welfare schemes aimed at supporting differently-abled individuals with financial aid, education, employment, and accessibility.",
  },

  {
    title: "Caste",
    key: "caste",
    href: "/dashboard/caste",
    description:
      "Targeted schemes designed to uplift marginalized communities including SC, ST, and OBC groups through education and employment.",
  },
  {
    title: "Children",
    key: "children",
    href: "/dashboard/children",
    description:
      "Initiatives focused on child welfare, education, nutrition, mental health, and protection from abuse or neglect.",
  },
];
const GovernmentSchemeComponents = [
  {
    title: "Schemes",
    key: "/dashboard/governmentSchemes/scheme",
    description:
      "Covers diverse government programmes related to rural development, dairy, and public awareness, typically implemented by the state.",
  },
  {
    title: "National Health Mission",
    key: "/dashboard/governmentSchemes/nationHealth",
    description:
      "Health-related initiatives focusing on maternal care, free delivery services, and healthcare accessibility for pregnant women.",
  },
  {
    title: "Kerala Water Authority",
    key: "/dashboard/governmentSchemes/keralaWaterAuthority",
    description:
      "Schemes under the Jal Jeevan Mission aimed at ensuring functional tap water connections for rural households in Kerala.",
  },
  {
    title: "LIFE Mission",
    key: "/dashboard/governmentSchemes/lifeMission",
    description:
      "A housing initiative providing financial assistance to homeless and economically disadvantaged families across the state.",
  },
  {
    title: "Police Department",
    key: "/dashboard/governmentSchemes/policeDepartment",
    description:
      "Welfare and protection schemes for children and students, addressing mental health, cyber safety, and behavioral issues.",
  },
  {
    title: "Cooperative Department",
    key: "/dashboard/governmentSchemes/Cooperative",
    description:
      "Support schemes for cooperative society members, including financial relief and interest-free loans for marginalized farmers.",
  },
];

export function NavigationMenuDemo() {
  const { setSelectedTab } = useDashboardContext();
  const handleNavMenu = (value) => {
    console.log(value);
    setSelectedTab(value);
  };
  return (
    <NavigationMenu viewport={false} className="ml-5 mb-3 max-lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/dashboard/allScheme"
              onClick={() => {
                handleNavMenu("allScheme");
              }}
            >
              All Schemes
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>General Schemes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  onClick={() => {
                    handleNavMenu(component.key);
                  }}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Government Schemes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {GovernmentSchemeComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.key}
                  onClick={() => handleNavMenu("governmentSchemes")}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function MobileNavMenu() {
  const { setSelectedTab } = useDashboardContext();
  const handleNavMenu = (value) => {
    console.log(value);
    setSelectedTab(value);
  };
  return (
    <NavigationMenu
      viewport={false}
      className="ml-5 mb-3 relative z-30 min-lg:hidden" // Makes it dropdown-style
    >
      <NavigationMenuList className="flex gap-4">
        {/* All Schemes */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/dashboard/allScheme"
              onClick={() => {
                handleNavMenu("allScheme");
              }}
            >
              All Schemes
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* General Schemes Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="font-medium px-3 py-2">
            General
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn(
              "absolute top-full mt-2 w-64 rounded-md bg-white shadow-md p-2 grid gap-2 z-50"
            )}
          >
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <li
                  key={component.title}
                  title={component.title}
                  onClick={() => {
                    handleNavMenu(component.key);
                  }}
                >
                  <Link href={component.href}>{component.title}</Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Government Schemes Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="font-medium px-3 py-2">
            Govt.
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn(
              "absolute top-full mt-2 w-64 rounded-md bg-white shadow-md p-2 grid gap-2 z-50"
            )}
          >
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {GovernmentSchemeComponents.map((component) => (
                <li
                  key={component.title}
                  title={component.title}
                  onClick={() => handleNavMenu("governmentSchemes")}
                >
                  <Link href={component.key}>{component.title}</Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
