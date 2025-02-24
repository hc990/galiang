'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Editor from './editor/Editor'


export default function Comments({ slug, comment } :{ slug:any, comment:"" }) {
  const [loadComments, setLoadComments] = useState(false)
  return (
    <>
      {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
      {siteMetadata.comments && loadComments && (
        <Editor slug={slug} comment={comment??''}/>     
      )}
       
    </>
  )
}

