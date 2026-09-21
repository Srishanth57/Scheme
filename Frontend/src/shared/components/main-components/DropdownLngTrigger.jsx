"use client";

import * as React from "react";

import { Button } from "shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "shared/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import i18n from "lib/i18next";

export function DropdownMenuRadioGroupDemo() {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")} >
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("ml")}>
          Malayalam
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
