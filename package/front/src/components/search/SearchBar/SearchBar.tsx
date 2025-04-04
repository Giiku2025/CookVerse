import type React from "react"

import { Search } from "lucide-react"
import styles from "./searchBar.module.css"
import {Button, Input} from "react-aria-components"
import { useSearchSite } from "../../../hooks/search/useSearchSite.tsx"
import SiteSelector from "../SiteSelector/SiteSelector.tsx"

export interface SearchBarProps {
    placeholder?: string
    buttonText?: string
    showSiteSelector?: boolean
    className?: string
}

function SearchBar({
                       placeholder = "キーワードを入力",
                       buttonText = "検索",
                       showSiteSelector = true,
                       className = "",
                   }: SearchBarProps) {
    const { query, handleQueryChange, getSiteUrl } = useSearchSite()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const searchURL = getSiteUrl()
            if(!searchURL)
            window.open(searchURL, "_blank", "noopener,noreferrer")
        }
    }



    return (
        <div className={`${styles.searchInputContainer} ${className}`}>
            <form className={styles.searchInputWrapper}>
                <Input
                    type="text"
                    placeholder={placeholder}
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {showSiteSelector && <SiteSelector />}

                <Button className={styles.searchButton}
                >
                    <Search size={20} />
                    <span>{buttonText}</span>
                </Button>

            </form>
            <div>
            </div>
        </div>
    )
}

export default SearchBar