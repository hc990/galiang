import { useDocChange, useEditor } from 'prosekit/react'
import Toggle from './toggle'

import type { EditorExtension } from './extension'
import { useCallback, useMemo, useState } from 'react'
import { NodeJSON, createEditor, htmlFromNode } from 'prosekit/core'
import { defineBasicExtension } from 'prosekit/basic'
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { LuBold } from "react-icons/lu";
import { LuItalic } from "react-icons/lu";
import { LuSave } from "react-icons/lu";
import { LuFileImage } from "react-icons/lu";
import { ImageUploadPopover } from './image-upload-popover'
export default function Toolbar({ 
  hasUnsavedChange, setHasUnsavedChange} :{hasUnsavedChange:boolean,setHasUnsavedChange:Function}) {
  // const [key, setKey] = useState(1)

  // const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  const [defaultDoc, setDefaultDoc] = useState<NodeJSON | undefined>()
  const [records, setRecords] = useState<string[]>([])
  const editor = useEditor<EditorExtension>({ update: true })
  const handleDocChange = useCallback(() => setHasUnsavedChange(true), [])
  useDocChange(handleDocChange, { editor })

  // Save the current document as a HTML string
  const handleSave = useCallback(() => {
    const record = htmlFromNode(editor.view.state.doc)
    setRecords((records: any) => [...records, record])
    setHasUnsavedChange(false)
    alert('dfdf')
  }, [editor])  


  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Toggle
        pressed={false}
        // disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        // onClick={() => editor.commands.toggleHeading({ level: 1 })}
        onClick={handleSave}
        disabled={!hasUnsavedChange}
        // className="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <LuSave/>
      </Toggle>

      <Toggle
        pressed={false}
        disabled={!editor.commands.undo.canApply()}
        onClick={editor.commands.undo}
        tooltip="Undo"
      >
        <LuUndo2 />
      </Toggle>

      <Toggle
        pressed={false}
        disabled={!editor.commands.redo.canApply()}
        onClick={editor.commands.redo}
        tooltip="Redo"
      >
        <LuRedo2/>
      </Toggle>

      <Toggle
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={editor.commands.toggleBold}
        tooltip="Bold"  
      >
        <LuBold />
      </Toggle>

      <Toggle
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={editor.commands.toggleItalic}
        tooltip="Italic"
      >
        <LuItalic />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1})}
        tooltip="Heading 1"
       >

        H1
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
        tooltip="Heading 2"
      >

        H2
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => {editor.commands.toggleHeading({ level: 3 })}}
        tooltip="Heading 3"
      >

        H3
      </Toggle>
      <ImageUploadPopover
        disabled={!editor.commands.insertImage.canApply()}
        tooltip="Insert Image" >
       <LuFileImage/>
      </ImageUploadPopover>
    </div>  
  )
}
