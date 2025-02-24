'use client'
import Link from '@/app/components/ui/Link'
import siteMetadata from '@/data/siteMetadata'
import { useGlobalState } from './context/globalProvider'
import formatDate from '@/app/utils/formatDate'
import Image from "@/app/components/ui/Image";
import { useUser } from '@clerk/nextjs'
import Carousel from './components/ui/Carousel'
import Spinner from './components/ui/Spinner'

// import { shuffleArray } from "@/app/utils/utils";


export default function Home() {
  const MAX_DISPLAY = 5
  const { user } = useUser();
  const { books } = useGlobalState();
  // let length = Math.floor(Math.random() * (books.length-5)) 
  if(!books || books.length === 0) { 
    return  <div className='flex flex-col h-[400px] w-[900px] items-center justify-center'><div className="flex flex-col items-center"><Spinner size={60} color="pink" speed={1.5} className="bg-pink-900 p-8 rounded" /><p className="mt-4 text-pink-800 text-lg animate-pulse">
    Loading...
  </p></div></div>  
  }
  const randomNumber = Math.random() * (books.length - 18)
  const images = books.slice(randomNumber,randomNumber+18)
  return (
    <>  
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex space-x-12 md:space-x-16 lg:space-x-18 items-end space-y-0.25 pb-6 pt-4 md:space-y-1"> 
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
             金鼎店   
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Welcome, {user?.firstName}!
            {/* {siteMetadata.description} */}
          </p>
        </div>
        <Carousel images={images.map((book:{id:any}) =>{return book.id})} autoplay autoplayDelay={5000} />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {books && books.length > 0 && books?.slice(0, MAX_DISPLAY).map((book: { id: any; slug: any; createAt: any; name: any; summary: any; tags: any; size: any; }) => {  
            const { id, slug, createAt, name, summary, tags, size } = book
            return (
              <li key={id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={createAt}>{formatDate(createAt)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div className="flex h-70 space-x-2 ">
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${id}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {name}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {/* {tags.m=-ap((tag) => (
                              <Tag key={tag} text={tag} />
                            ))} */} 
                           中文  小说  历史  创意 |  { Math.round(size) }MB
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                        <div className="prose max-w-none">
                          <Image
                              src= {'/thumbnail/'+ id +'.png'}  
                              alt="标记"  
                              width= {180}
                              height=  {180}  
                              // objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${name}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {books.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All Books"
          >
            All Books &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          {/* <NewsletterForm /> */}
        </div>
      )}
    </>
  )
}
