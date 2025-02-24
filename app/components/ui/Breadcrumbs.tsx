import React from "react";
import { LuChevronRight } from "react-icons/lu";

// 定义面包屑项目类型
interface BreadcrumbItem {
  label: string; // 名称
  href?: string; // 链接（可选，最后一项不需要链接）
  icon?: React.ReactNode; // 可选图标
}

// 定义面包屑组件的类型
interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // 面包屑数据
  separator?: React.ReactNode; // 分隔符（可自定义）
  className?: string; // 自定义样式
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <LuChevronRight className="text-gray-400 mx-2" />, // 默认分隔符
  className = "",
}) => {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center space-x-2 ${className}`}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {/* 图标 */}
            {item.icon && <span className="mr-1">{item.icon}</span>}

            {/* 链接或文本 */}
            {isLastItem ? (
              <span className="text-gray-500 font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-pink-400 hover:text-pink-700 font-medium"
              >
                {item.label}
              </a>
            )}

            {/* 分隔符 */}
            {!isLastItem && <span>{separator}</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
