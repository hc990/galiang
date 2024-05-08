import { ReactNode } from 'react'
import Image from '@/app/components/Image'
// import { CoreContent } from 'pliny/utils/contentlayer'
// import type { Blog } from 'contentlayer/generated'
import Comments from '@/app/components/Comments'
import Link from '@/app/components/Link'
import PageTitle from '@/app/components/PageTitle'
import SectionContainer from '@/app/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/app/components/ScrollTopAndComment'

interface LayoutProps {
  book: {size:any,name:any,bookname:any,createAt:any}
  children: ReactNode
  path: any
  // next?: { path: string; title: string }
  // prev?: { path: string; title: string }
}

export default function PostMinimal({ book, path, children }: LayoutProps) {
  const { size, name, bookname, createAt } = book
  // const displayImage =
  //   images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
  const basePath = path.split('/')[0]
  return (
    <SectionContainer>
      <ScrollTopAndComment />  
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              {/* <Bleed> */}
                <div className="relative aspect-[2/1] w-full">
                  {bookname}
                  {/* <Image src={displayImage} alt={title} fill className="object-cover" /> */}
                </div>
              {/* </Bleed> */}
            </div>
            <div className="relative pt-10">
              <PageTitle>{bookname}</PageTitle>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">{children}</div>
          {siteMetadata.comments && (
            <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              {/* <Comments slug={bookname} /> */}
            </div>
          )}
          <footer>
            {/* <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div> */}
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
