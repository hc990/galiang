
import React, { useState, useRef, useEffect } from "react";
import { format, parse } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { LuCalendarDays } from "react-icons/lu";
import Button from "./Button";
interface DatePickerPopoverProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Parse value to Date for DayPicker
  const selectedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;
  if (selectedDate && isNaN(selectedDate.getTime())) {
    console.warn(`Invalid date value for ${name}: ${value}`);
  }

  // Toggle popover
  const togglePopover = () => setIsOpen((prev) => !prev);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate popover position
  const getPopoverPosition = () => {
    if (!inputRef.current) return { top: 0, left: 0 };
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    };
  };

  const { top, left } = getPopoverPosition();

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    const syntheticEvent = {
      target: { name, value: date ? format(date, "yyyy-MM-dd") : "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-pink-500">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onClick={togglePopover}
          placeholder="YYYY-MM-DD"
          className={`border border-grep-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            error ? "border-pink-500" : ""
          }`}
        />
        <Button
          type="button"
          onClick={togglePopover}
          className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
        >
          <LuCalendarDays/>
        </Button>
      </div>
      {error && <p className="text-sm text-pink-500 mt-1">{error}</p>}
      {isOpen &&
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-lg p-4"
            style={{ top: `${top}px`, left: `${left}px`, minWidth: "250px" }}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
            />
          </motion.div>
          
        }
    </div>
  );
};

export default DatePickerPopover;
