'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Editor from './editor/Editor'
import Button from './ui/Button'

export default function Comments({ slug, comment } :{ slug:any, comment:"" }) {
  const [loadComments, setLoadComments] = useState(false)
  return (
    <>
      {!loadComments && <Button onClick={() => setLoadComments(true)}>Load Comments</Button>}
      {siteMetadata.comments && loadComments && (
        <Editor slug={slug} comment={comment??''}/>     
      )}
       
    </>
  )
}

