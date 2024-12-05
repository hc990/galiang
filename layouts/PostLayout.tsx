import { ReactNode } from 'react'
// import { CoreContent } from 'pliny/utils/contentlayer'
// import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/app/components/Comments'
import Link from '@/app/components/ui/Link'
import PageTitle from '@/app/components/ui/PageTitle'
import SectionContainer from '@/app/components/ui/SectionContainer'
import Image from '@/app/components/ui/Image'
import Tag from '@/app/components/ui/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/app/components/ui/ScrollTopAndComment'
import formatDate from '@/app/utils/formatDate'
// import Button from '@/app/components/common/Button'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path: string) =>``
const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  book: { size: number, name: string, bookname: string, createAt: string, comment:any },
  // authorDetails: []
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  slug: string
  path: string
  children: ReactNode
}

export default function PostLayout({ slug , book, path, next, prev, children }: LayoutProps) {
  const { size, name, bookname, createAt, comment } = book
  const basePath = path.split('/')[0]
  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-2 xl:pb-2">
            <div className="space-y-2 text-center">
              <dl className="space-y-1">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-4 text-gray-500 dark:text-gray-400">
                  Published on： <time dateTime={createAt}>{formatDate(createAt)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{name}</PageTitle>
              </div>
            </div>
          </header>
          <div className="xl:grid-2·grid-rows-[auto_1fr]·divide-y··divide-gray-200·dark:divide-gray-700">
            <dl className="pb-3 pt-3 xl:border-b xl:border-gray-200 xl:pt-6 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>  
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-6 xl:block xl:space-x-0 xl:space-y-6">
                  {/* { */}
                      {/* {authorDetails.map((author) => ( */}
                    <li className="flex items-center space-x-2" key={''}>
                      {/* {author.avatar && ( */}
                        <Image
                          src={'/static/images/google.png'}
                          width={38}
                          height={38}
                          alt='avatar'
                          className='h-10 w-10 rounded-full'
                        />
                      {/* )} */}
                      <dl className='whitespace-nowrap text-sm font-medium leading-5'>
                        <dt className='sr-only'>Name</dt>
                        <dd className='text-gray-900 dark:text-gray-100'>{'Everest'}</dd>
                        <dt className='sr-only'></dt>
                        <dd>
                          {/* {author.twitter && ( */}
                            <Link
                              href={''}
                              className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                            >
                              {''}
                            </Link>
                          {/* )} */}
                        </dd>
                      </dl>
                    </li>
                    {/* ))} } */}
                </ul>
              </dd>
            </dl>
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <div className='space-y-5 pt-2 pb-2'>
                <Image
                  src={'/static/images/avatar.png'}
                  width={160}
                  height={160}
                  alt='avatar'    
                />
              </div>
              <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                 { Math.round(size) }MB
              </div>
              <div className='prose w-full pb-8 pt-10 dark:prose-invert'>
                      { children }  
              </div>
              {siteMetadata.comments && (
                <div
                  className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300'
                  id='comment'
                > 
                  <Comments slug={slug } comment={comment}/>
                </div>
              )}
            </div>
            <footer>
                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {/* {tags && ( */}
                  <div className='py-1 xl:py-3'>
                  <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                      Tags
                  </h2>
                  <div className="flex flex-wrap">
                      {/* {tags.map((tag) => ( */}
                      <Tag key={1} text={'奇异'} />
                      <Tag key={2} text={'历史'} />
                    {/* ))} */}
                  </div>
                </div>
                {/* )} */}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Book
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Book
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the book"
                >
                  &larr; Back to the books
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
