
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './ui/Link'
import MobileNav from './ui/MobileNav'
import ThemeSwitch from './ui/ThemeSwitch'
import SearchButton from './ui/SearchButton'
import Image from "./ui/Image";
import { auth } from '@clerk/nextjs/server'  
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { SignOutButton,  UserButton } from '@clerk/nextjs'

const Header = async () => {
  const { userId,sessionId } = await auth()
  // const { userId, sessionId } = useAuth(); // ✅ 在 Client 组件使用
  return (   
    <header >
      <div className = "ml-10 flex items-center flex-row justify-between">
        <Image className="m-5 pr-5 space-x-4 w-[150px] h-[120px]  mr-40" 
              src= "/static/images/logo.png"
              alt="ooxx"  
              priority
              // layout="fill" 
              width={100} 
              height={180}
              // objectFit="cover"
            />
      <div className="flex items-center justify-between space-x-6 leading-4 pl-2 ml-20">
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
        <SearchButton />
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden space-x-2 font-medium  flex-col text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
           { userId ? <><SignOutButton signOutOptions={{ sessionId }} redirectUrl='/signin'><LuLogOut/></SignOutButton></>: <><Link href="/signin"><LuLogIn/></Link></>
                    }
        
        <ThemeSwitch />
         </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header


