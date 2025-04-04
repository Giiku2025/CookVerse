import { useState } from "react"
import styles from "./siteSelector.module.css"
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import { Sites, useSearchSite } from "../../../hooks/search/useSearchSite.tsx";



function SiteSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { handleSiteChange, selectedSiteId } = useSearchSite()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // 選択されたサイトを取得
  const selectedSite = Sites.find(site => site.id === selectedSiteId);

  return (
    <div className={`${styles.siteSelector}`}>
      <Select
        aria-label="サイトを選択"
        selectedKey={selectedSiteId}
      >
        <Button className={styles.siteSelectorButton}>
          <SelectValue>
            {selectedSite ? selectedSite.name : "サイトを選択"}
          </SelectValue>
        </Button>
        <Popover>
          <ListBox
            className={styles.dropdown}
            onSelectionChange={(selectedKey) => {
              handleSiteChange(selectedKey as string);
              toggleDropdown();
            }}
          >
            {Sites.map((site) => (
              <ListBoxItem
                className={styles.dropdownItem}
                key={site.id} textValue={site.name}>
                {site.name}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  )
}

export default SiteSelector

