import { ComponentPropsWithoutRef } from 'react'
import { IconType } from 'react-icons'

type ButtonProps = {
  icon?: IconType
  variant?: 'default' | 'outline' | 'text'
  type?: 'submit' | 'button' | 'reset' | undefined
} & ComponentPropsWithoutRef<'button'>

function Button({
  children,
  name,
  type,
  className = '',
  icon: Icon,
  variant = 'default',
  color,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-[38px] min-w-[38px] items-center rounded px-3 py-1.5
      ${
        variant === 'default'
          ? 'bg-pink-400 text-white hover:bg-pink-500 dark:bg-pink-700 dark:text-pink-300 dark:hover:bg-pink-900'
          : variant === 'outline'
            ? 'border border-pink-300 bg-pink-400 text-black text-white hover:bg-pink-500 dark:border-pink-600 dark:bg-pink-800 dark:text-pink-300 dark:hover:bg-pink-900'
            : 'bg-transparent text-black hover:bg-pink-400 dark:text-pink-300 dark:hover:bg-pink-700'
      }
      ${className}`}
      {...props}
    >
      {Icon && <Icon className={`text-lg ${children ? '' : ''}`} />}
      {children}
    </button>
  )
}

export default Button
