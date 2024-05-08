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
      ${
          variant === "default"
              ? "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"
              : variant === "outline"
              ? "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              : "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
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
