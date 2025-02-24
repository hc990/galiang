'use client'

import { slug } from 'github-slugger'
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { useGlobalState } from '@/app/context/globalProvider'



// export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
//   const tag = decodeURI(params.tag)  
//   return genPageMetadata({  
//     title: tag,
//     description: `${siteMetadata.title} ${tag} tagged content`,
//     alternates: {
//       canonical: './',
//       types: {
//         'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
//       },
//     },
//   })
// }

// export const generateStaticParams = async () => {
//   const tagCounts = tagData as Record<string, number>
//   const tagKeys = Object.keys(tagCounts)
//   const paths = tagKeys.map((tag) => ({
//     tag: encodeURI(tag),
//   }))
//   return paths
// }

export default async function TagPage( props : { params: Promise<{ tag: string }> }) {
  const slug = await props.params;
  const { books } = useGlobalState();
  const tag = decodeURI(slug.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts: never[] = []  
  
  // u need search books with tags

  return <ListLayout title={ title } books={ books } initialDisplayBooks={ books }  />
}
