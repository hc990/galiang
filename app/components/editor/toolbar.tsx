import { useDocChange, useEditor } from 'prosekit/react'
import Toggle from './toggle'

import type { EditorExtension } from './extension'
import { useCallback, useMemo, useState } from 'react'
import { NodeJSON, createEditor, htmlFromNode,htmlFromJSON } from 'prosekit/core'
import { LuUndo2, LuRedo2,LuBold,LuSave,LuFileImage,LuItalic} from "react-icons/lu"
import { ImageUploadPopover } from './image-upload-popover'
import { markdownFromHTML, htmlFromMarkdown } from './markdown'
import { ListDOMSerializer } from 'prosekit/extensions/list'
// import axios from 'axios'
// import { axiosInstant} from '../../context/globalProvider';
import { NextResponse } from 'next/server'
// import { useGlobalState } from '@/app/context/globalProvider'
import axiosInstance from '@/app/axios/axiosInstance'

export default function Toolbar({ 
  hasUnsavedChange, setHasUnsavedChange, slug, comment} :{hasUnsavedChange:boolean,setHasUnsavedChange:Function,slug:any, comment:string}) {
  // const [key, setKey] = useState(1)
  // const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  // const [defaultDoc, setDefaultDoc] = useState<NodeJSON | undefined>()

  const editor = useEditor<EditorExtension>({ update: true })
  // const { axiosInstance } = useGlobalState();
  const handleDocChange = useCallback(() => setHasUnsavedChange(true), [])
  useDocChange(handleDocChange, { editor })
  const [records, setRecords] = useState<string[]>([comment])  
  // // Save the current document as a HTML string
  // const handleSave = useCallback(() => {
  //   // const record = htmlFromNode(editor.view.state.doc)
  //   setRecords((records: any) => [...records, editor.view.state.doc])
  //   setHasUnsavedChange(false)
  //   alert(records)
  //   alert(editor.view.state.doc.)
  // }, [editor])  
  // Save the current document as a Markdown string
  const handleSave = useCallback(async () => {
    const html = htmlFromNode(editor.view.state.doc, {
      DOMSerializer: ListDOMSerializer,
    })

    const record = markdownFromHTML(html)
    try {
      await axiosInstance.put("/api/blog",{ params: { id: slug, comment: record, status:0 }});
    } catch (error) {
      console.log("ERROR updating BOOK: ", error);
      return NextResponse.json({ error: "Error creating book", status: 500 });
    }
    setRecords((records: any) => [...records, record])
    setHasUnsavedChange(false)
  }, [editor])

  return (
    <>
    <div className='flex flex-wrap overflow-x-scroll max-w-[1100px] whitespace-nowrap overflow-hidden overflow-ellipsis text-left
     box-border gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 '>
      {records.at(-1)}
    </div>
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 '>  
      <Toggle
        pressed={false}
        // disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        // onClick={() => editor.commands.toggleHeading({ level: 1 })}
        onClick={handleSave}
        disabled={!hasUnsavedChange}
      ><LuSave />
      </Toggle>
      <Toggle
        pressed={false}
        disabled={!editor.commands.undo.canApply()}
        onClick={editor.commands.undo}
        tooltip="Undo"
      ><LuUndo2 />
      </Toggle>
      <Toggle
        pressed={false}
        disabled={!editor.commands.redo.canApply()}
        onClick={editor.commands.redo}
        tooltip="Redo"
      ><LuRedo2 />
      </Toggle>
      <Toggle
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={editor.commands.toggleBold}
        tooltip="Bold"
      ><LuBold />
      </Toggle>
      <Toggle
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={editor.commands.toggleItalic}
        tooltip="Italic"
      ><LuItalic />
      </Toggle>
      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
        tooltip="Heading 1"
      >H1
      </Toggle>
      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
        tooltip="Heading 2"
      >H2
      </Toggle>
      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => { editor.commands.toggleHeading({ level: 3 }) } }
        tooltip="Heading 3"
      >H3
      </Toggle>
      <ImageUploadPopover
        disabled={!editor.commands.insertImage.canApply()}
        tooltip="Insert Image">
        <LuFileImage />
      </ImageUploadPopover>
      </div></>
  )
}
