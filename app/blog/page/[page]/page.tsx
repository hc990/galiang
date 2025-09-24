'use client'

import axiosInstance from '@/app/axios/axios';
import { useGlobalState } from '@/app/context/globalProvider'
import ListLayout from '@/layouts/ListLayoutWithTags'


// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
const POSTS_PER_PAGE = 5
// export const generateStaticParams = {
//   const totalPages = Math.ceil(booksNum / POSTS_PER_PAGE)
//   const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
//   return paths
// }

// 定义类型
interface BookData {
  id: string;
  bookname: string;
  comment: string;
  createAt: string;
  extend: string;
  name: string;
  oribookname: string;
  serial: string;
  size: number;
  status: string;
  tag: string;
  structuredData?: Record<string, unknown>;
}
// 异步获取数据
async function fetchBook(id: string): Promise<BookData | null> {
  try {
    const response = await axiosInstance.get<BookData>('/api/blog', {
      params: { id },
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59' },
    });
    return response.data || null;
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}


export default async function Page( props : { params: Promise<{ page: string }> }) {
  const slug = await props.params;
  
  const totalPages = Math.ceil(allBooks.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  // const posts = allBooks
  const pageNumber = parseInt(slug.page as string)
  const initialDisplayBooks = allBooks.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allBooks.length / POSTS_PER_PAGE),
  }
  return (
    <ListLayout
      books={ allBooks }
      initialDisplayBooks={initialDisplayBooks}
      pagination={pagination}
      title="All Books"
    />
  )
}
