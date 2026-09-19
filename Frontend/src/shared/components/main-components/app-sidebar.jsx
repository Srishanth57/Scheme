"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { TeamSwitcher } from "shared/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "shared/components/ui/sidebar";
import FilterSection from "./FilterSection";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <FilterSection />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
