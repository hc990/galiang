import 'css/prism.css'

import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
// import siteMetadata from '@/data/siteMetadata'  
// import axios from 'axios'
import DownloadButton from '@/app/components/common/DownloadButton'
import axiosInstance from '@/app/axios/axios'
import { notFound } from 'next/navigation'
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
  params: Promise<{ slug: string[] }>;
}
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};
const defaultLayout = 'PostLayout';
async function fetchBook(id: string): Promise<BookData[] | null> {// 异步获取数据
  if("page"===id){
    notFound()
  }
  try {
    const response = await axiosInstance.get<BookData[]>('/api/blog', {
      params: { id, postion:99 },
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59' },
    });
    return response.data || null;
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const id = decodeURI(slug.join('/'));
  const Layout = layouts[defaultLayout] || PostLayout; // 确保布局存在
  const book = await fetchBook(id);
  if (!book) {
    notFound();
  }
  const prev = { path: 'fdfdsf', title: 'fdsf' };// 模拟 prev/next 数据（替换为实际逻辑）
  const next = { path: '34324', title: 'fdfs' };
  return (
    <>
      <Layout book={book[0]} path="/" prev={prev} next={next} slug={id}>
        <DownloadButton slug={id}>
          <div className="px-1">Download</div>
        </DownloadButton>
      </Layout>
    </>
  );
}


