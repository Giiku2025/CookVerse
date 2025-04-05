import styles from "./siteSelector.module.css"
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import { Sites, useSearchSite } from "../../../hooks/search/useSearchSite.tsx";



function SiteSelector() {
  const {selectedSiteId, setSelectedSiteId,} = useSearchSite()



  return (
    <div className={`${styles.siteSelector}`}>
      <Select
        aria-label="サイトを選択"
        selectedKey={selectedSiteId}
      >
        <Button className={styles.siteSelectorButton}>
          <SelectValue>
              {Sites[
            Sites.findIndex((site) => site.id === selectedSiteId)
                  ].name}
          </SelectValue>
        </Button>
        <Popover>
          <ListBox
            className={styles.dropdown}
            selectedKeys={selectedSiteId}
            onSelectionChange={
                (key) => {
                    setSelectedSiteId(key as string)
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

