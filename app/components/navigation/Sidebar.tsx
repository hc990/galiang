'use client'
import React from 'react'
import { useGlobalState } from '@/app/context/globalProvider'
import { useRouter, usePathname } from 'next/navigation'
// import Image from "next/image";
import menu from '@/app/utils/menu'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'
// import { HiPlus } from "react-icons/hi"
import { LuChevronsDown, LuPanelLeftClose, LuPanelLeftOpen, LuChevronsRight } from 'react-icons/lu'
// import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import clsx from 'clsx'

function Sidebar() {
  // const { signOut } = useClerk();
  // const { user } = useUser();

  const { collapsed, collapseMenu, show, changeShow } = useGlobalState()
  const { firstName, lastName, imageUrl } = {
    firstName: '',
    lastName: '',
    imageUrl: '/static/images/logo.png',
  }
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (link: string) => {
    if (link.lastIndexOf('/') === link.length - 1) {
      link = '/blog'
      //  return pathname.indexOf('blog') !== -1;
      if (pathname.lastIndexOf('/') === pathname.length - 1) {
        return true
      }
    }
    return pathname.startsWith(link)
  }

  const handleClick = (link: string) => {
    router.push(link)
  }
  return (
    <nav className="flex flex-col justify-between rounded border border-pink-300">
      <div className="space-y-1 px-2 pt-2">
        <div className="flex cursor-pointer items-center space-x-2">
          <div className="relative overflow-hidden"></div>
          <h1 className="text-lg font-medium">
            {firstName} {lastName}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button
            icon={LuChevronsDown}
            variant="text"
            className={`${show ? '' : 'hidden'} w-32 flex-1 
            `}
            onClick={() => {
              collapseMenu()
            }}
          >
            {show ? '隐藏目录' : '显示目录'}
          </Button>
          <Button
            icon={show ? LuPanelLeftClose : LuPanelLeftOpen}
            variant="outline"
            onClick={() => {
              changeShow()
            }}
          />
        </div>
        <ul className={`${show ? '' : 'hidden'} ${collapsed ? '' : 'hidden'}  true mt-4`}>
          {menu.map((item) => (
            <li
              key={item.id}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') window.location.href = item.link
              }}
              className={clsx(
                'mt-2 flex cursor-pointer items-center space-x-2 rounded-md px-4 py-2',
                {
                  'bg-pink-500 text-white': isActive(item.link),
                  'hover:bg-pink-200': !isActive(item.link),
                }
              )}
              onClick={() => handleClick(item.link)}
            >
              <LuChevronsRight></LuChevronsRight>
              <Link
                className="overflow-hidde flex-1 whitespace-nowrap font-medium"
                href={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute px-4 py-80 pb-4">
        <div className="mt-8"></div>
      </div>
    </nav>
  )
}
export default Sidebar
