import axiosInstance from '@/app/axios/axios';
import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound, redirect } from 'next/navigation';
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

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

interface PageProps {
  params: Promise<{ page: string }>;
}

async function getBooksCursor(id: string | null, postion: string | null): Promise<{ books: BookData[] | []; nextCursor: string | null }> {
  try {
    const response = await axiosInstance.get<BookData[]>('/api/blog', {
      params: { id,  },
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59' },
    })
    const nextCursor = response.data.length > 0 ? response.data[response.data.length - 1].id : null;
    return { books: response.data, nextCursor };
  } catch (error) {
    console.error('Error fetching book:', error);
    return { books: [], nextCursor: null };
  }
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  if (!page) {
    notFound()
  }
  const id = page.substring(0, 24)
  const data = await getBooksCursor(id, '0')
  const initialDisplayBooks = data.books
  const pageNumber = parseInt(page.substring(24, page.length))
  let currentCursor
  if (pageNumber > 2) {
    const predata = await getBooksCursor(id, '1')
    currentCursor = predata.books[0].id
  } else if (pageNumber === 2) {
    const predata = await getBooksCursor(id, '99')
    // console.info(predata.books)
    currentCursor = predata.books[0].id
  } else {
    redirect('/blog')
  }
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(8000 / POSTS_PER_PAGE),
    currentCursor: currentCursor,
    nextCursor: initialDisplayBooks[POSTS_PER_PAGE] ? initialDisplayBooks[POSTS_PER_PAGE].id : ''
  }
  return (
    <ListLayout
      // books={books}
      initialDisplayBooks={initialDisplayBooks.splice(0, POSTS_PER_PAGE) as []}
      pagination={pagination}
      title="All Books"
    />
  )
}
