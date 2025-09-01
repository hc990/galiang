import { ComponentPropsWithoutRef } from "react"
import { IconType } from "react-icons"

type ButtonProps = {
  icon?: IconType
  variant?: "default" | "outline" | "text"
  type?: "submit" | "button" | "reset" | undefined
} & ComponentPropsWithoutRef<"button">


function Button({
  children,
  name,
  type,
  className = "",
  icon: Icon,
  variant = "default",
  color,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
      ${variant === "default"
          ? "text-white dark:text-pink-300 bg-pink-400 hover:bg-pink-500 dark:bg-pink-700 dark:hover:bg-pink-900"
          : variant === "outline"
            ? "text-white border border-pink-300 dark:border-pink-600 text-black dark:text-pink-300 bg-pink-400 hover:bg-pink-500 dark:bg-pink-800 dark:hover:bg-pink-900"
            : "text-black dark:text-pink-300 bg-transparent hover:bg-pink-400 dark:hover:bg-pink-700"
        }
      ${className}`}
      {...props}
    >
      {Icon && <Icon className={`text-lg ${children ? "" : ""}`} />}
      {children}
    </button>
  );
}

export default Button;
