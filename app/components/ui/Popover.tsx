import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PopoverProps {
  trigger: React.ReactNode; // 触发元素
  content: React.ReactNode; // 弹出的内容
  className?: string; // 自定义样式
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen((prev) => !prev);
  const closePopover = () => setIsOpen(false);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <div onClick={togglePopover} className="cursor-pointer">
        {trigger}
      </div>

      {/* Popover Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 mt-2 p-4 bg-white border rounded shadow-md ${className}`}
            style={{ minWidth: "200px" }}
          >
            {content}
            {/* Close Button */}
            <button
              onClick={closePopover}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;
