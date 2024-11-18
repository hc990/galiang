import 'css/prism.css'
import 'katex/dist/katex.css'
// import downloadFile from '@/app/api/download/route'
import PageTitle from '@/app/components/PageTitle'
// import { components } from '@/components/MDXComponents'
// import { MDXLayoutRenderer } from 'pliny/mdx-components'
// import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs, allAuthors } from 'contentlayer/generated'
// import { allBlogs } from 'contentlayer/generated'
// import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
// import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'  
// import { notFound } from 'next/navigation'
// import { useGlobalState } from '@/app/context/globalProvider'
// import prisma from '@/data/prisma'
import axios from 'axios'
import Button from '@/app/components/common/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DownloadButton from '@/app/components/common/DownloadButton'
import { notFound } from 'next/navigation'

type BookData = {
  id: string;
  bookname: string;
  comment: string;
  createAt: string;
  extend: string;
  name: string;
  oribookname: string;
  serial: string;
  size: string;
  status: string;
  tag: string;
  structuredData?: Record<string, unknown>;
};

// type BookResponse = {
//   data: BookData;
// };
const defaultLayout = 'PostLayout'
const layouts = {  
  PostSimple,
  PostLayout,
  PostBanner,
}

const axiosInstant = axios.create({
  baseURL: siteMetadata.siteUrl ,
  timeout: 3000
})

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] }
// }): Promise<Metadata | undefined> {
//   const slug = decodeURI(params.slug.join('/'))
//   axiosInstant.get('/api/blog', {params: {
//     id: slug
//   }}).then(res => {
//         console.log(res.data)
//     }
//   );  
  // const post = allBlogs.find((p) => p.slug === slug)
  // const authorList = post?.authors || ['default']
  // const authorDetails = authorList.map((author) => {
  //   const authorResults = allAuthors.find((p) => p.slug === author)
  //   return coreContent(authorResults as Authors)
  // })
  // if (!post) {
  //   return
  // }
  // const publishedAt = post.createAt 
  // const modifiedAt = post.createAt 
  // const authors = authorDetails.map((author) => author.name)
  // let imageList = [siteMetadata.socialBanner]
  // if (post.images) {
  //   imageList = typeof post.images === 'string' ? [post.images] : post.images
  // }
  // const ogImages = imageList.map((img) => {
  //   return {
  //     url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  //   }
  // })
  // return {
        // title: post.name,
    // description: post.bookname,
    // openGraph: {
    //   title: post.name,
    //   description: post.zize,
    //   siteName: siteMetadata.title,
    //   locale: 'en_US',
    //   type: 'article',
    //   publishedTime: publishedAt,
    //   modifiedTime: modifiedAt,
    //   url: './',
    //   images: ogImages,
    //   authors:  [siteMetadata.author],
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.bookname,
    //   description: post.name,
    //   images: imageList,
    // },
//   }
// }
// export const generateStaticParams = async () => {
//   const paths = allBlogs.map((p) => ({ slug: p.slug.split('/')}))
//   return paths
// }

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const Layout = layouts["PostLayout"]
  // const [book, setBook] = useState<BookResponse | null>(null);
  const response = await axiosInstant.get('/api/blog', { params: { id: slug } });
  const book  = response.data;
  if (!book) {
    return <div>No data available</div>;
  }
  const { bookname, name, createAt, size, status, comment, tag } = book;
  // Filter out drafts in production
  // const allBlogs = await prisma.books.findMany()
  // const postIndex =  await prisma.books.findFirst({'fdf':slug}) 
  // sortedCoreContents.findIndex((p) => p.slug === slug)
  // if (postIndex === -1) {
  //   return notFound()
  // }
  const prev = {'path':'fdfdsf',"title":"fdsf"}
  const next = {'path':'34324',"title":"fdfs"}
  // const [statusMessage, setStatusMessage] = useState('');
  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(`/api/download?slug=${encodeURIComponent(slug)}`);
  //     if (!response.ok) {
  //       const result = await response.json();
  //       setStatusMessage(result.error);
  //       return;
  //     }
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = response.headers.get('Content-Disposition')?.split('filename=')[1];
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setStatusMessage('File has been downloaded successfully');
  //   } catch (error) {
  //     setStatusMessage('Error triggering download');
  //     console.error('Error triggering download:', error);
  //   }
  // };
  // const post = allBlogs.find((p) => p.slug === slug) as Blog
  // const authorList = post?.authors || ['default']
  // const authorDetails = authorList.map((author) => {
  //   const authorResults = allAuthors.find((p) => p.slug === author)
  //   return coreContent(authorResults as Authors)
  // })
  // const mainContent = coreContent(post)
  // const jsonLd = post.structuredData
  // const jsonLd['author'] = {
  //     '@type': 'Person',
  //     name: book.name,
  //   }
  // const Layout = layouts[book.bookname || defaultLayout]
  return (
    <>
      <script
        type="application/ld+json"
        // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />  
      <Layout book={book} path="/" prev={ prev }  next={ next } slug={ slug } >
        <DownloadButton slug={slug}>
          <div className="px-1">Download</div>
        </DownloadButton>
      </Layout>
    </>
  )
}


