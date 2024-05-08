'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MdOutlineWbSunny } from "react-icons/md"
import { IoMdMoon } from "react-icons/io";
import Button from "@/app/components/common/Button";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
      icon={theme === 'dark' || resolvedTheme === 'dark' ? IoMdMoon : MdOutlineWbSunny}
    >
    </Button>
  )
}

export default ThemeSwitch
