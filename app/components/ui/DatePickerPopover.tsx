import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerPopoverProps {
  className?: string;
}

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const ref = useRef(null);

  const togglePopover = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref.current]);

  return (
    <div ref={ref} className="relative inline-block">
      <button  
        onClick={togglePopover}
        aria-label={selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select date"}
        className="bg-pink-200 text-black px-12 py-2 rounded hover:bg-pink-600"
      >
        {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select Date"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 mt-2 p-4 bg-white border rounded shadow-lg ${className}`}
            style={{ minWidth: "250px" }}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date || undefined);
                setIsOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePickerPopover;