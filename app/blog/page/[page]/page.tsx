import axiosInstance from '@/app/axios/axios';
import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound } from 'next/navigation';
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

async function getBooksCursor(id: string | null): Promise<{ books: BookData[] | []; nextCursor: string | null }> {
  try {
    const response = await axiosInstance.get<BookData[]>('/api/blog', {
      params: { id },
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
  const id = page.substring(0,page.length - 1)
  // const currentPage = 
  // const id = decodeURI(page.join('/'));
  const data = await getBooksCursor(id)
  if (!data) {
    notFound();
  }
  const initialDisplayBooks = data.books
  const pageNumber = parseInt(page.substring(page.length-1, page.length))+1
  // const initialDisplayBooks = (await books).slice(
  //   POSTS_PER_PAGE * (pageNumber - 1),
  //   POSTS_PER_PAGE * pageNumber
  // )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(8000/ POSTS_PER_PAGE),
    currentCursor: initialDisplayBooks[0] ? initialDisplayBooks[0].id : '',
    nextCursor: initialDisplayBooks[POSTS_PER_PAGE - 1] ? initialDisplayBooks[POSTS_PER_PAGE - 1].id : ''
  }
  return (
    <ListLayout
      // books={books}
      initialDisplayBooks={initialDisplayBooks as []}
      pagination={pagination}
      title="All Books"
    />
  )
}
