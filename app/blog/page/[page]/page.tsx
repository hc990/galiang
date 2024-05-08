import { useGlobalState } from '@/app/context/globalProvider';
import ListLayout from '@/layouts/ListLayoutWithTags'
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

const { allBooks } = useGlobalState();

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBooks.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  // const posts = allBooks
  const pageNumber = parseInt(params.page as string)
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
