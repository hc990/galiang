'use client';
import React from 'react';
import { useGlobalState } from '@/app/context/globalProvider'
import { useRouter, usePathname } from 'next/navigation'
// import Image from "next/image";  
import menu from '@/app/utils/menu'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'
// import { HiPlus } from "react-icons/hi"
import { LuChevronsDown, LuPanelLeftClose, LuPanelLeftOpen, LuChevronsRight } from 'react-icons/lu'
// import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import clsx from 'clsx';

function Sidebar() {
  // const { signOut } = useClerk();
  // const { user } = useUser();

  const {
    collapsed,
    collapseMenu,
    show,
    changeShow
  } = useGlobalState();
  const { firstName, lastName, imageUrl } = {
    firstName: '',
    lastName: '',
    imageUrl: '/static/images/logo.png',
  };
  const router = useRouter();
  let pathname = usePathname();

  const isActive = (link: string) => {
    if (link === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(link);
  };

  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <nav className='border border-gray-300 rounded flex flex-col justify-between'>
      <div className='px-2 pt-2 space-y-1'>
        <div className='flex items-center space-x-2 cursor-pointer'>
          <div className='relative overflow-hidden'>
          </div>
          <h1 className='text-lg font-medium'>
            {firstName} {lastName}
          </h1>
        </div>
        <div className='flex space-x-2'>
          <Button
            icon={LuChevronsDown}
            variant='text'
            className={`${show ? '' : 'hidden'
              } flex-1 w-32 
            `}
            onClick={() => {
              collapseMenu()
            }
            }
          >
            {show ? '隐藏目录' : '显示目录'}
          </Button>
          <Button
            icon={show ? LuPanelLeftClose : LuPanelLeftOpen}
            variant='outline'
            onClick={() => {
              changeShow()
            }}

          />
        </div>
        <ul className={`${show ? "" : "hidden"
          } ${collapsed ? "" : "hidden"
          }  true mt-4`}   >
          {menu.map((item) => (
            <li
              key={item.id}
              className={clsx(
                'flex items-center space-x-2 cursor-pointer rounded-md mt-2 py-2 px-4',
                {
                  'bg-pink-500 text-white': isActive(item.link),
                  'hover:bg-pink-200': !isActive(item.link),
                }
              )}
              onClick={() => handleClick(item.link)}
            >
              <LuChevronsRight></LuChevronsRight>
              <Link className="font-medium flex-1 whitespace-nowrap overflow-hidde" href={item.link}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute py-80 px-4 pb-4">
        <div className="mt-8">

        </div>
      </div>
    </nav>
  );
}
export default Sidebar;
