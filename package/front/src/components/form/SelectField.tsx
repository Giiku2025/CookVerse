import { useFormContext } from "react-hook-form";
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import {Sites, useSearchSite} from "../../hooks/search/useSearchSite.tsx";
import styles from "./selectField.module.css";

type Props = {
    name: string;
};

export function SelectField(props: Props) {
    const methods = useFormContext();
    const { register } = methods;
    const {
        selectedSiteId,
        handleSiteChange,
    }=useSearchSite()

    // 選択されたサイトを取得
    const selectedSite = Sites.find(site => site.id === selectedSiteId);

    return (
        <div className={`${styles.siteSelector}`}>
            <Select
                aria-label="サイトを選択"
                className={styles.siteSelector}
                {...register(props.name)}
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
            {methods.formState.errors[props.name] && (
                <p>{methods.formState.errors[props.name]?.message as string}</p>
            )}
        </div>
    );
}