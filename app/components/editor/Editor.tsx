import 'prosekit/basic/style.css'

import {
  createEditor,
  jsonFromHTML,
  htmlFromNode,
  type NodeJSON,
} from 'prosekit/core'

import { ProseKit, useDocChange, useEditor } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'
import Button from '../common/Button'
import Toolbar from './toolbar'  
import { EditorExtension, defineExtension } from './extension'


export default function Editor({ 
  slug} :{slug:any}) {
  const [key, setKey] = useState(1)
  const [defaultDoc, setDefaultDoc] = useState<NodeJSON | undefined>()
  const editor = useMemo(() => {
    const extension = defineExtension()  
    return createEditor({ extension, defaultDoc })
  }, [key, defaultDoc])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  return (
    <ProseKit editor={editor}>
      <div className='box-border h-full min-h-32 overflow-y-auto rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <Toolbar slug={ slug } 
          hasUnsavedChange= {hasUnsavedChange}
          setHasUnsavedChange= {setHasUnsavedChange}   
          />
        <div ref={editor.mount} className=' h-full w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-left relative box-border min-h-full flex-1 bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800  '></div>
      </div>
    </ProseKit>
  )
}