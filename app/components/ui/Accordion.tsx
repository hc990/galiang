import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronsDown, LuChevronsLeft } from "react-icons/lu";

// 定义 AccordionItem 的类型
interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

// 定义 AccordionProps 的类型
interface AccordionProps {
  items: AccordionItem[];
  allowMultipleOpen?: boolean; // 是否允许同时展开多个面板
  className?: string; // 自定义样式
  customIcon?: (isOpen: boolean) => React.ReactNode; // 自定义图标
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultipleOpen = false,
  className = "",
  customIcon,
}) => {
  const [openPanels, setOpenPanels] = useState<number[]>([]);

  // 处理面板切换
  const togglePanel = (id: number) => {
    if (allowMultipleOpen) {
      setOpenPanels((prev) =>
        prev.includes(id) ? prev.filter((panelId) => panelId !== id) : [...prev, id]
      );
    } else {
      setOpenPanels((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openPanels.includes(item.id);
        return (
          <div key={item.id} className="w-100 accordion-item  border-b border-pink-300">
            {/* 标题 */}
            <button     
              onClick={() => togglePanel(item.id)}
              className="accordion-title flex justify-between items-center   py-3 px-4 text-left font-bold bg-pink-100 hover:bg-pink-200 w-[500px]"
            >   
              <span className="flex-grow" >{item.title}</span>
              {/* 动态图标 */}
              {customIcon ? customIcon(isOpen) : <span>{isOpen ? < LuChevronsLeft /> : <LuChevronsDown/>}</span>}
            </button>

            {/* 内容部分 */}
            <AnimatePresence>  
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="accordion-content overflow-hidden"
                >
                  <div className="py-3 px-4 bg-pink-800">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
