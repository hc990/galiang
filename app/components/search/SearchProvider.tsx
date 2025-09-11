
import { ReactNode } from 'react'
import { KBarSearchProvider } from './KBar'
import type { KBarConfig } from './KBar'

export type SearchConfig = KBarConfig
export interface SearchConfigProps {
  searchConfig: SearchConfig
  children: React.ReactNode
}

/**
 * Command palette like search component - `ctrl-k` to open the palette.
 * Or use the search context to bind toggle to an onOpen event.
 * Currently supports Algolia or Kbar (local search).
 *
 * To toggle the modal or search from child components, use the search context:
 *
 * For Algolia:
 * ```
 * import { AlgoliaSearchContext } from 'pliny/search/algolia'
 * const { query } = useContext(AlgoliaSearchContext)
 * ```
 *
 * For Kbar:
 * ```
 * import { useKBar } from 'kbar'
 * const { query } = useKBar()
 * ```
 *
 * @param {SearchConfig} searchConfig
 * @return {*}
 */
export const SearchProvider = ({ searchConfig, children }: SearchConfigProps): ReactNode => {
  // const { books } = useGlobalState();
  if (searchConfig && searchConfig.provider) {
    return <KBarSearchProvider kbarConfig={searchConfig.kbarConfig}>{children}</KBarSearchProvider>
  } else {
    return <>{children}</>
  }
}
