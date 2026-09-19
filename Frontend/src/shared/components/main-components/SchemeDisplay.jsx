"use client";
import React, { useMemo } from "react";
import { Badge } from "shared/components/ui/badge";
import { SchemeViewMoreSection } from "./SchemeViewMoreSection";
import { useDashboardContext } from "app/dashboard/layout";
import { Info, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useAppContext } from "app/providers";
import { filterSchemes, getMultilingualValue } from "shared/lib/schemeFilterEngine";

/**
 * SchemeCard — Subcomponent for rendering an individual scheme card.
 * Decoupled from the grid mapping to keep the render tree flat and readable.
 */
function SchemeCard({ scheme, currentLang }) {
  const name = getMultilingualValue(scheme.name, currentLang);
  const location = getMultilingualValue(scheme.location, currentLang);
  const description = getMultilingualValue(scheme.description, currentLang);

  return (
    <div className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 rounded-xl overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="p-6 pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
        </div>

        {location && (
          <Badge
            variant="secondary"
            className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-800 font-medium mt-2"
          >
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <SchemeViewMoreSection
            scheme={scheme}
            currentLang={currentLang}
          />
        </div>
      </div>
    </div>
  );
}

const SchemeDisplay = ({ scheme }) => {
  const pathname = usePathname();
  const { inputValue, sidebarFilters } = useDashboardContext();
  const { tags } = useAppContext();
  
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  // Delegate all business logic to the pure schemeFilterEngine
  const schemesToDisplay = useMemo(() => {
    return filterSchemes({
      schemes: scheme,
      searchTerm: inputValue,
      sidebarFilters,
      currentLang,
      pathname,
      tags,
    });
  }, [scheme, inputValue, sidebarFilters, currentLang, pathname, tags]);

  return (
    <div className="flex flex-1 flex-col justify-between gap-6 p-6 pt-0">
      {schemesToDisplay.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
              <Info className="h-8 w-8" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">
                No schemes found
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Try adjusting your filters or search terms to find relevant
                schemes.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid auto-rows-min gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemesToDisplay.map((eachScheme) => (
            <SchemeCard 
              key={eachScheme.id} 
              scheme={eachScheme} 
              currentLang={currentLang} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemeDisplay;
