import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

// 定义 Button 的属性类型
interface ButtonProps {
  label: string; // 按钮文本
  onClick?: () => void; // 点击事件
  isActive?: boolean; // 当前按钮是否激活
  disabled?: boolean; // 是否禁用
}

// 定义 ButtonGroup 的属性类型
interface ButtonGroupProps {
  buttons: ButtonProps[]; // 按钮列表
  className?: string; // 自定义样式
  variant?: "default" | "outline" | "solid"; // 按钮样式类型
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  className = "",
  variant = "default",
}) => {
  // 根据 variant 设置按钮样式
  const baseStyle = "px-4 py-2 font-medium focus:outline-none";
  const variants = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-200",
    solid: "bg-pink-300 text-white hover:bg-pink-800",
  };

  return (
    <div className={classNames("inline-flex", className)}>
      {buttons.map((button, index) => (
        <motion.button
          key={index}
          onClick={button.onClick}
          disabled={button.disabled}
          className={classNames(
            baseStyle,
            variants[variant],
            button.isActive
              ? "bg-pink-700 text-white" // 激活状态样式
              : "",
            index === 0  
              ? "rounded-l-md" // 左边按钮圆角
              : index === buttons.length - 1
              ? "rounded-r-md" // 右边按钮圆角
              : "border-l border-white-900", // 中间按钮分隔线
            button.disabled
              ? "bg-gray-100 text-pink-300 cursor-not-allowed"
              : "border-l  border-white-900"
          )}
          whileTap={{ scale: 0.95 }} // 点击缩放动画
          whileHover={{ scale: 1.05 }} // 悬停放大动画
        >
          {button.label}
        </motion.button>
      ))}
    </div>
  );
};

export default ButtonGroup;
