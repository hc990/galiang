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
  const { allBooks, books, booksNum } = useGlobalState();

  const pageNumber = 1
  const initialDisplayBooks = books.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  // const booksNum =  books.size

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil( booksNum / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      initialDisplayBooks={initialDisplayBooks}
      pagination={pagination}
      title="All Books"
      books= { allBooks }   />
  )
}
