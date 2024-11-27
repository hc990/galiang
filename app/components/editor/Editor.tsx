import 'prosekit/basic/style.css'
import { createEditor, jsonFromHTML, htmlFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange, useEditor } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'
// import Button from '../common/Button'
import Toolbar from './toolbar'
import { defineExtension } from './extension'

export default function Editor({ defaultContent, slug, comment }: { defaultContent?: NodeJSON, slug: any, comment: string }) {
  // const [key, setKey] = useState(1)
  // const [defaultDoc, setDefaultDoc] = useState<NodeJSON>()
  // const updateText = (comment: string) => {
  //   if (defaultDoc) {
  //     alert(comment)
  //   } else {
  //     console.error("defaultDoc is undefined!");
  //   }
  // };
  // updateText(comment)
  // alert(defaultDoc)

  // alert(comment??'') 
  // setRecords((comment: any) => [...records, [comment??'']])
  // setRecords((records: any) => [...records, [comment??''])
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [defaultContent])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  return (
    <ProseKit editor={editor} >
      <div className='box-border h-full min-h-32 overflow-y-auto rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <Toolbar slug={slug}
          hasUnsavedChange={hasUnsavedChange}
          setHasUnsavedChange={setHasUnsavedChange}
          comment={comment}
        // records ={records}
        // setRecords ={setRecords}
        />
        <div ref={editor.mount} className='pl-4 pr-4 flex-1 overflow-y-auto h-full max-w-[1100px] whitespace-nowrap overflow-hidden overflow-ellipsis text-left relative box-border  bg-white dark:bg-neutral-900px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
      </div>
    </ProseKit>
  )
}