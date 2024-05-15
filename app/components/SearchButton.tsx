
'use client'

import { KBarButton } from '@/app/components/search/KBarButton'
import { LuSearch } from "react-icons/lu";


const SearchButton = () => {
    const SearchButtonWrapper = KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <LuSearch/>
      </SearchButtonWrapper>
    )
  }


export default SearchButton
