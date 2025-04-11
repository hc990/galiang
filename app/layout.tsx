import '../css/tailwind.css'    
// import { Space_Grotesk } from 'next/font/google'
import Header from '@/app/components/Header'
import SectionContainer from '@/app/components/ui/SectionContainer'
import Footer from '@/app/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemesProvider } from '@/app/providers/ThemesProvider'
import { Metadata } from 'next'
import Sidebar from '@/app/components/navigation/Sidebar'
import ContextProvider from './providers/ContextProvider'  
import { SearchProvider,SearchConfig } from './components/search/SearchProvider'
import { ClerkProvider } from "@clerk/nextjs";    
import Image from "./components/ui/Image";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}
// const { userId } = await auth()
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <ClerkProvider >
    <html
      lang={siteMetadata.language}
      // className={`${space_grotesk.variable} scroll-smooth`}
      className={`scroll-smooth`}
      suppressHydrationWarning
    >   
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ContextProvider>
         <ThemesProvider>
          {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
            <SectionContainer>
              <div className="flex h-screen flex-col justify-between font-sans">
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                    <div className="flex items-center flex-nowrap justify-between">
                        <Header />   
                    </div>
                    <div className="flex space-x-5 mb-auto">
                      <Sidebar />
                      <main>{children}</main>
                    </div>
                  <Footer />
                </SearchProvider>
              </div>
            </SectionContainer>
          </ThemesProvider>
        </ContextProvider>
      </body>
    </html>
   </ClerkProvider>
  )
}
