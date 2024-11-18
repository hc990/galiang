"use client";

import Link from '@/app/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { useGlobalState } from './context/globalProvider';
import formatDate from '@/app/utils/formatDate'
import Image from "next/image";

const MAX_DISPLAY = 5

export default function Home() {
  const { books } = useGlobalState();
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-0.25 pb-6 pt-4 md:space-y-1">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
             金鼎店
          </h1>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p> */}
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!books.length && 'No books found.'}
          {books.slice(0, MAX_DISPLAY).map((book: { id: any; slug: any; createAt: any; name: any; summary: any; tags: any; size: any; }) => {  
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
                              src= "/static/images/avatar.png"
                              alt="标记"  
                              width={150} 
                              height={180}
                              objectFit="cover"
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
