import React from "react";
import { motion } from "framer-motion";

// 定义 Spinner 的属性类型
interface SpinnerProps {
  size?: number; // Spinner 的大小
  color?: string; // Spinner 的颜色
  speed?: number; // 旋转速度（秒为单位）
  className?: string; // 自定义类名
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "#3b82f6", // 默认 TailwindCSS 蓝色
  speed = 1,
  className = "",
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }} // 旋转动画
      transition={{
        repeat: Infinity, // 无限循环
        ease: "linear", // 线性动画
        duration: speed, // 旋转速度
      }}
      style={{
        width: size,
        height: size,
        border: `${size * 0.1}px solid ${color}`, // 外环的粗细和颜色
        borderTop: `${size * 0.1}px solid transparent`, // 顶部部分透明，形成动画效果
        borderRadius: "50%", // 圆形
      }}
    ></motion.div>
  );
};

export default Spinner;
