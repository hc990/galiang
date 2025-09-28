'use client'

import ListLayout from '@/layouts/ListLayoutWithTags'
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
// import { genPageMetadata } from 'app/seo'
// import prisma from '@/data/prisma'
import { useGlobalState } from '@/app/context/globalProvider'

const POSTS_PER_PAGE = 5

// export const metadata = genPageMetadata({ title: 'Blog' })

export default function BookPage() {
  const { books } = useGlobalState();
  const pageNumber = 1
  const initialDisplayBooks = books.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(8000 / POSTS_PER_PAGE),
    currentCursor: initialDisplayBooks[0] ? initialDisplayBooks[0].id : '',
    nextCursor: initialDisplayBooks[POSTS_PER_PAGE - 1] ? initialDisplayBooks[POSTS_PER_PAGE - 1].id : ''
  }
  return (
    <ListLayout
      initialDisplayBooks={initialDisplayBooks}
      pagination={pagination}
      title="All Books"
    />
  )
}
