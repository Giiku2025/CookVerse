import React, {useEffect} from "react"

import { Search } from "lucide-react"
import styles from "./searchBar.module.css"
import { Button, Input } from "react-aria-components"
import { useSearchSite } from "../../../hooks/search/useSearchSite.tsx"

export interface SearchBarProps {
    placeholder?: string
    buttonText?: string
    className?: string
    QueryDefaultValue?: string
    onSearch?: (query: string, siteId: string) => void
}

function SearchBar({
                       placeholder = "キーワードを入力",
                       buttonText = "検索",
                       className = "",
                       QueryDefaultValue = "",
                       onSearch,
                   }: SearchBarProps) {
    const { query, handleQueryChange, getSiteUrl, selectedSiteId } = useSearchSite()

    // 初期値を設定
    useEffect(() => {
        handleQueryChange(QueryDefaultValue)
    }, [QueryDefaultValue, handleQueryChange])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const searchURL = getSiteUrl()
            if (!searchURL) return

            if (onSearch) {
                // Base64エンコードして検索関数を呼び出す
                const encodedQuery = btoa(encodeURIComponent(query))
                onSearch(encodedQuery, selectedSiteId)
            } else {
                window.open(searchURL, "_blank", "noopener,noreferrer")
            }
        }
    }

    const handleSearchClick = () => {
        const searchURL = getSiteUrl()
        if (!searchURL) return

        if (onSearch) {
            // Base64エンコードして検索関数を呼び出す
            const encodedQuery = btoa(encodeURIComponent(query))
            onSearch(encodedQuery, selectedSiteId)
        } else {
            window.open(searchURL, "_blank", "noopener,noreferrer")
        }
    }

    return (
        <div className={`${styles.searchInputContainer} ${className}`}>
            <form className={styles.searchInputWrapper} onSubmit={(e) => e.preventDefault()}>
                {/*<SiteSelector />*/}
                <Input
                    type="text"
                    placeholder={placeholder}
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <Button
                    className={styles.searchButton}
                    onPress={handleSearchClick}
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