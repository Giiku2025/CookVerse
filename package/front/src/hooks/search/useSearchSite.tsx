import { useState } from "react";
interface Site {
    id: string
    name: string
    url: string
}
export const Sites: Site[] = [
    { id: "cookpad", name: "Cookpad", url: "https://www.cookpad.com/search/" },
    { id: "kurashiru", name: "クラシル", url: "https://www.kurashiru.com/search?query=" },
    { id: "delish", name: "DELISH KITCHEN", url: "https://www.delishkitchen.tv/search?q=" },
]
export const useSearchSite = () => {
    const [selectedSiteId, setSelectedSiteId] = useState(Sites[0].id)
    const [query, setQuery] = useState("")
    const handleSiteChange = (siteId: string) => {
        setSelectedSiteId(siteId)
    }
    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery)
    }

    const getSiteUrl = () => {
        const site = Sites.find((site) => site.id === selectedSiteId)
        if (site) {
            return `${site.url} ${encodeURIComponent(query)}`
        }
    }

    return {
        selectedSiteId,
        setSelectedSiteId,
        query,
        handleSiteChange,
        handleQueryChange,
        getSiteUrl,
    }
}