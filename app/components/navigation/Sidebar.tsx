'use client';
import React from 'react';
import { GlobalContext, useGlobalState } from '@/app/context/globalProvider';  
import { useRouter,usePathname } from 'next/navigation';
// import Image from "next/image";  
import menu from '@/app/utils/menu';
import Link from 'next/link';
import Button from '@/app/components/common/Button';
import {MdInfo} from 'react-icons/md'
// import { HiPlus } from "react-icons/hi"
import { LuPanelLeft } from 'react-icons/lu'
// import { useState } from 'react'
import { IoChevronDownSharp ,IoChevronForward} from 'react-icons/io5'
// import { IoChevronForward } from "react-icons/io5"
// import { UserButton, useClerk, useUser } from "@clerk/nextjs";

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
  
  if (pathname.indexOf('blog') != 1){
    pathname = '/'
  }   

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
            icon={IoChevronDownSharp}
            variant='text'
            className={`${
              show ? '' : 'hidden'
              } flex-1 w-32 
            `}
            onClick={() => {
              collapseMenu()
             }
            }
          >
          {collapsed ? '隐藏目录' : '显示目录'}
          </Button>
          <Button 
            icon={LuPanelLeft}
            variant='outline'
            onClick={() => {
              changeShow()
           }} 
          />
        </div>
        <ul className={`${
              show ? "" : "hidden" 
              } ${collapsed ? "" : "hidden" 
                }  true mt-4`}   >
          {menu.map((item) => (
            <li
              key={item.id} 
              className={`flex-1 mt-2 py-2 px-4 bg-grey-300 flex items-center space-x-2 cursor-pointer rounded-md ${
                pathname === item.link ? "bg-pink-500 " : ""
              }`}
              onClick={() => handleClick(item.link)}
            >
              <IoChevronForward></IoChevronForward>
              <Link className="font-medium flex-1 whitespace-nowrap overflow-hidde" href={item.link}>
              {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 pb-4">
        <div className="mt-8">
          <Button
             icon={MdInfo}
             variant='outline'
            //  onClick={() => {
            //   signOut(() => router.push("/signin"));
            // }
          // }
          >
          </Button>
        </div>
      </div>
    </nav>
  );
}
export default Sidebar;
