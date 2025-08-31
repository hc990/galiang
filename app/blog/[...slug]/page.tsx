import 'css/prism.css'

import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
// import siteMetadata from '@/data/siteMetadata'  
// import axios from 'axios'
import DownloadButton from '@/app/components/common/DownloadButton'
import axiosInstance from '@/app/axios/axiosInstance'

// type BookData = {
//   id: string;
//   bookname: string;
//   comment: string;
//   createAt: string;
//   extend: string;
//   name: string;
//   oribookname: string;
//   serial: string;
//   size: number;
//   status: string;
//   tag: string;
//   structuredData?: Record<string, unknown>;
// };

// type BookResponse = {
//   data: BookData;
// };
const defaultLayout = 'PostLayout'
const layouts = {  
  PostSimple,
  PostLayout,
  PostBanner,
}

// const axiosInstant = axios.create({
//   baseURL: siteMetadata.siteUrl ,
//   timeout: 3000
// })
// const {  axiosInstant } = useGlobalState();
export default async function Page(
  props
: {
  params: Promise<{ slug: string[] }>;
})  {
  const { slug } =  await props.params;
  const id = decodeURI(slug.join('/'))
  const Layout = layouts["PostLayout"]   
  // let book: BookData | null = null;
  try {
    const prev = {'path':'fdfdsf',"title":"fdsf"}
    const next = {'path':'34324',"title":"fdfs"}
    const response = await axiosInstance.get('/api/blog', { params: { id: id } });
    const book = response.data;
    if (!book) {
      return <div>No data available</div>;
    }
    const { bookname, name, createAt, size, status, comment, tag } = book;
    return (
      <>
        <script
          type="application/ld+json"
          // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />  
        <Layout book={book} path="/" prev={ prev }  next={ next } slug={ id } >
          <DownloadButton slug={id}>
            <div className="px-1">Download</div>
          </DownloadButton>
        </Layout>
      </>
    )
  } catch (error) {
    console.error('Error fetching book:', error);
    return <div>Error loading data</div>;
  }

  
}


