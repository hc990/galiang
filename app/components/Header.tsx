import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './ui/Link'
import MobileNav from './ui/MobileNav'
import ThemeSwitch from './ui/ThemeSwitch'
import SearchButton from './ui/SearchButton'
import Image from "next/image";
import { LuLogIn } from "react-icons/lu";
import { UserButton } from '@clerk/nextjs'
const Header = () => {
  return (
    <header className="flex py-6 space-x-3 items-center">
      <div>
      <Image className="m-2 px-2 space-x-3"
              src= "/static/images/logo.png"
              alt="嘎亮"  
              // layout="fill" 
              width={300} 
              height={200}
              // objectFit="cover"
            />
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="items-center">
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-1 text-1xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}                                
          </div>                               
        </Link>  
      </div> 
      
      <div className="flex items-center space-x-4 leading-2 sm:space-x-3 absolute right-0 pr-6">
        <SearchButton />
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden space-x-2 font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
         
        <ThemeSwitch />
        <Link href="/signin">
             < LuLogIn/>           
          </Link>
        <MobileNav />
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </header>
  )
}

export default Header
