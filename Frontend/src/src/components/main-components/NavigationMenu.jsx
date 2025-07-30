"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  {
    title: "Women",
    key: "women",
    href: "/dashboard/women",
    description:
      "Schemes and initiatives supporting women's welfare, empowerment, education, health, safety, financial aid, and social protection.",
  },
  {
    title: "Elderly",
    key: "elderly",
    href: "/dashboard/elderly",
    description:
      "Schemes and benefits for senior citizens, including pensions, healthcare, social security, legal rights, travel concessions, and welfare support.",
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
              Recommended
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
    setSelectedTab(value);
  };

  return (
    // This menu is hidden on large screens (lg) and up
    <div className="w-full px-2 lg:hidden">
      {/* Standalone link for "Recommended" */}
      <Link
        href="/dashboard/allScheme"
        onClick={() => handleNavMenu("allScheme")}
        className="block w-full text-left px-4 py-3 text-sm font-medium border-b hover:bg-accent hover:text-accent-foreground"
      >
        Recommended
      </Link>

      {/* Accordion for collapsible sections */}
      <Accordion type="single" collapsible className="w-full">
        {/* General Schemes Item */}
        <AccordionItem value="general-schemes" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium">
            General Schemes
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-6 pr-4 py-2 flex flex-col space-y-1">
              {components.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.href}
                    onClick={() => handleNavMenu(component.key)}
                    className="block p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent"
                  >
                    {component.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Government Schemes Item */}
        <AccordionItem value="govt-schemes" className="border-b-0">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium">
            Government Schemes
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-6 pr-4 py-2 flex flex-col space-y-1">
              {GovernmentSchemeComponents.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.key}
                    onClick={() => handleNavMenu("governmentSchemes")}
                    className="block p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent"
                  >
                    {component.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}