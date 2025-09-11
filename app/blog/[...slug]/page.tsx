// app/[...slug]/page.tsx
import 'css/prism.css';
import { notFound } from 'next/navigation';
import PostSimple from '@/layouts/PostSimple';
import PostLayout from '@/layouts/PostLayout';
import PostBanner from '@/layouts/PostBanner';
import DownloadButton from '@/app/components/common/DownloadButton';
import axiosInstance from '@/app/axios/axios';

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

// 布局映射
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};
const defaultLayout = 'PostLayout';

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const id = decodeURI(slug.join('/'));
  const Layout = layouts[defaultLayout] || PostLayout; // 确保布局存在

  // 获取数据
  const book = await fetchBook(id);
  if (!book) {
    notFound(); // 使用 Next.js 的 notFound 跳转到 404 页面
  }

  // 模拟 prev/next 数据（替换为实际逻辑）
  const prev = { path: 'fdfdsf', title: 'fdsf' };
  const next = { path: '34324', title: 'fdfs' };



  return (
    <>
      <Layout book={book} path="/" prev={prev} next={next} slug={id}>
        <DownloadButton slug={id}>
          <div className="px-1">Download</div>
        </DownloadButton>
      </Layout>
    </>
  );
}


