import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path as per your project
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path as per your project
import { Label } from "@/components/ui/label"; // Adjust path as per your project
import { ChevronDownIcon, XIcon } from "lucide-react"; // Added XIcon for clear button

// Define your filter options here
const filterOptions = {
  ageGroup: ["Under 18", "18-25", "26-35", "36-45", "46-60", "Over 60"],
  gender: ["Male", "Female", "Other", "Prefer not to say"],
  incomeLevel: ["Low", "Lower-middle", "Middle", "Upper-middle", "High"],
  profession: ["Student", "Employed", "Unemployed", "Self-employed", "Retired"],
  location: ["Urban", "Rural", "Semi-urban"], // You might want a more complex location filter (e.g., search input)
  category: ["SC", "ST", "OBC", "General", "Disabled", "Tribal"],
};

const initialFilters = {
  ageGroup: null,
  gender: null,
  incomeLevel: null,
  profession: null,
  location: null,
  category: null,
};

// Helper for display names of filters
const filterDisplayNames = {
  ageGroup: "Age Group",
  gender: "Gender",
  incomeLevel: "Income Level",
  profession: "Profession",
  location: "Location",
  category: "Category",
};


export function FilterSection({updateAndShowSchemes}) {
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const handleSelectFilter = (filterType, value) => {
 
    
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? null : value, // Toggle selection, allow deselect
    }));
  };

  const clearFilters = () => {
    setSelectedFilters(initialFilters);
    updateAndShowSchemes(initialFilters);
  };

  const updatedFilters = () => {
    
    updateAndShowSchemes(selectedFilters)
  }

  const isAnyFilterApplied = Object.values(selectedFilters).some(
    (value) => value !== null
  );

  const FilterDropdown = ({ filterType, label, options }) => (
    <div className="flex flex-col space-y-1.5 w-full">
      {/* Ensured w-full here for parent flex context */}
      <Label
        htmlFor={filterType}
        className="text-sm font-medium text-muted-foreground"
      >
        {label}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {/* Removed sm:w-[180px] to allow full width adaptation */}
            <span className="truncate pr-1">
              {/* Added truncate for long selected values */}
              {selectedFilters[filterType] || `Select ${label}`}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" sideOffset={5}>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Option to clear individual filter */}
          {selectedFilters[filterType] && (
            <>
              <DropdownMenuCheckboxItem
                onSelect={() =>
                  handleSelectFilter(filterType, selectedFilters[filterType])
                } // This will deselect
                className="text-destructive focus:text-destructive"
              >
                Clear selection
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
            </>
          )}
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selectedFilters[filterType] === option}
              onCheckedChange={() => handleSelectFilter(filterType, option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 bg-card text-card-foreground rounded-lg border h-full">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Filters
        </h2>
        
      </div>

      <div className="flex flex-col gap-y-5">
        <FilterDropdown
          filterType="ageGroup"
          label={filterDisplayNames.ageGroup}
          options={filterOptions.ageGroup}
        />
        <FilterDropdown
          filterType="gender"
          label={filterDisplayNames.gender}
          options={filterOptions.gender}
        />
        <FilterDropdown
          filterType="incomeLevel"
          label={filterDisplayNames.incomeLevel}
          options={filterOptions.incomeLevel}
        />
        <FilterDropdown
          filterType="profession"
          label={filterDisplayNames.profession}
          options={filterOptions.profession}
        />
        <FilterDropdown
          filterType="location"
          label={filterDisplayNames.location}
          options={filterOptions.location}
        />
        <FilterDropdown
          filterType="category"
          label={filterDisplayNames.category}
          options={filterOptions.category}
        />
      </div>

    {isAnyFilterApplied && (
          <div className="flex flex-row">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-sm px-2"
            >
              <XIcon className="h-4 w-4 mr-1 sm:mr-2" />
              Clear all
            </Button>
            <Button
              variant="ghost"
              onClick={updatedFilters}
              className="text-sm px-2"
            >
              
              Apply filters
            </Button>
          </div>
          
        )}
    </div>
  );
}

export default FilterSection;
