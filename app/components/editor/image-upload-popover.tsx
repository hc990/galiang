import { useEditor } from 'prosekit/react'
import { PopoverContent, PopoverRoot, PopoverTrigger } from 'prosekit/react/popover'
import { useState, type FC, type ReactNode } from 'react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export const ImageUploadPopover: FC<{
  tooltip: string
  disabled: boolean
  children: ReactNode
}> = ({ tooltip, disabled, children }) => {
  const [open, setOpen] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl
  const editor = useEditor<EditorExtension>()
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      setObjectUrl(URL.createObjectURL(file))
      setWebUrl('')
    } else {
      setObjectUrl('')
    }
  }

  const handleWebUrlChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const url = event.target.value

    if (url) {
      setWebUrl(url)
      setObjectUrl('')
    } else {
      setWebUrl('')
    }
  }

  const deferResetState = () => {
    setTimeout(() => {
      setWebUrl('')
      setObjectUrl('')
    }, 300)
  }

  const handleSubmit = () => {
    editor.commands.insertImage({ src: url })
    deferResetState()
    setOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      deferResetState()
    }
    setOpen(open)
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Toggle pressed={open} disabled={disabled} tooltip={tooltip}>
          {children}
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className="w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2 z-10 box-border flex flex-col gap-y-4 rounded-lg border border-zinc-200 bg-white p-6 text-sm shadow-lg will-change-transform dark:border-zinc-800 dark:bg-neutral-900">
        {objectUrl ? null : (
          <>
            <label htmlFor="embed-link">Embed Link</label>
            <input
              className="box-border flex h-10 w-full rounded-md border border-solid border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 ring-transparent transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-neutral-900 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-300"
              id="embed-link"
              placeholder="Paste the image link..."
              type="url"
              value={webUrl}
              onChange={handleWebUrlChange}
            />
          </>
        )}

        {webUrl ? null : (
          <>
            <label htmlFor="file-upload">Upload</label>
            <input
              className="box-border flex h-10 w-full rounded-md border border-solid border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 ring-transparent transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-neutral-900 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-300"
              id="file-upload"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}

        {url ? (
          <button
            className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-neutral-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
            onClick={handleSubmit}
          >
            Insert Image
          </button>
        ) : null}
      </PopoverContent>
    </PopoverRoot>
  )
}
