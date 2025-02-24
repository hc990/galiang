import React from "react";

// 定义 Badge 的类型
interface BadgeProps {
  text?: string; // Badge 的文字内容
  type?: "success" | "error" | "warning" | "info" | "neutral"; // 类型
  icon?: React.ReactNode; // 可选图标
  size?: "sm" | "md" | "lg"; // 尺寸
  outlined?: boolean; // 是否显示轮廓样式
  rounded?: boolean; // 是否显示圆形样式
  className?: string; // 自定义样式
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = "neutral",
  icon,
  size = "md",
  outlined = false,
  rounded = false,
  className = "",
}) => {
  // 类型样式
  const typeStyles = {
    success: outlined
      ? "border-green-500 text-green-500"
      : "bg-green-500 text-white",
    error: outlined
      ? "border-red-500 text-red-500"
      : "bg-red-500 text-white",
    warning: outlined
      ? "border-yellow-500 text-yellow-500"
      : "bg-yellow-500 text-white",
    info: outlined
      ? "border-blue-500 text-blue-500"
      : "bg-blue-500 text-white",
    neutral: outlined
      ? "border-gray-500 text-gray-500"
      : "bg-gray-500 text-white",
  };

  // 尺寸样式
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  // 组件样式
  const baseStyles = `inline-flex items-center font-medium ${
    rounded ? "rounded-full" : "rounded"
  } ${outlined ? "border" : ""} ${className}`;

  return (
    <span className={`${baseStyles} ${typeStyles[type]} ${sizeStyles[size]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
