"use client";

import * as React from "react";
import { format as formatDateFns, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

// Utility to parse "dd-MM-yyyy" into Date object
const parseCustomDate = (dateStr) => {
  return parse(dateStr, "dd-MM-yyyy", new Date());
};

// Utility to format Date object into "dd-MM-yyyy"
const formatCustomDate = (dateObj) => {
  return formatDateFns(dateObj, "dd-MM-yyyy");
};

export function DatePickerDemo({ value, onChange }) {
  // Convert string to Date object (only if passed as string)
  const parsedValue =
    typeof value === "string" ? parseCustomDate(value) : value;

  const handleDateChange = (dateObj) => {
    if (!dateObj) return;
    const formatted = formatCustomDate(dateObj);
    onChange(formatted); // return string like "20-08-2025"
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !parsedValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {parsedValue ? formatDateFns(parsedValue, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={parsedValue}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
