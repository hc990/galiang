'use client'
import { useState, useEffect, FC, ReactNode } from 'react'
import type { Action } from 'kbar'
import { KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation.js'
import { KBarModal } from './KBarModal'
// import axios from "axios";
import formatDate from '@/app/utils/formatDate'
import axiosInstance from '@/app/axios/axios'

// import { auth } from "@clerk/nextjs/server"

export interface KBarSearchProps {
  // searchDocumentsPath: string | false
  defaultActions?: Action[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchDocumentsLoad?: (json: any) => Action[]
}

export interface KBarConfig {
  provider: 'kbar'
  kbarConfig: KBarSearchProps
}

/**
 * Command palette like search component with kbar - `ctrl-k` to open the palette.
 *
 * Default actions can be overridden by passing in an array of actions to `defaultActions`.
 * To load actions dynamically, pass in a `searchDocumentsPath` to a JSON file.
 * `onSearchDocumentsLoad` can be used to transform the JSON into actions.
 *
 * To toggle the modal or search from child components, use the search context:
 * ```
 * import { useKBar } from 'kbar'
 * const { query } = useKBar()
 * ```
 * See https://github.com/timc1/kbar/blob/main/src/types.ts#L98-L106 for typings.
 *
 * @param {*} { kbarConfig, children }
 * @return {*}
 */
export const KBarSearchProvider: FC<{
  children: ReactNode
  kbarConfig: KBarSearchProps
}> = ({ kbarConfig, children }) => {
  const router = useRouter()
  const { defaultActions, onSearchDocumentsLoad } = kbarConfig
  const [searchActions, setSearchActions] = useState<Action[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const mapBooks = (books: { id: string; name: string; createAt: string }[]) =>
      books.map((book: { id: string; name: string; createAt: string }) => ({
        id: book.id,
        name: book.name,
        keywords: book?.name || '',
        section: 'Content',
        subtitle: formatDate(book.createAt),
        perform: () => router.push('/blog/' + book.id),
      }))

    async function fetchData() {
      try {
        const response = await axiosInstance.get('/api/search', { signal: controller.signal })
        const actions = onSearchDocumentsLoad
          ? onSearchDocumentsLoad(response.data)
          : mapBooks(response.data)
        setSearchActions(actions)
        setDataLoaded(true)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log(error)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [onSearchDocumentsLoad, router])

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  )
}
