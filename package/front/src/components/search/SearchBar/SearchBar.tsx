import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { X } from "lucide-react"; // バツアイコン用
import styles from "./searchBar.module.css";
import { Button, Input, Tag, TagGroup, TagList } from "react-aria-components";
import { useSearchSite } from "../../../hooks/search/useSearchSite.tsx";

export interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  QueryDefaultValue?: string;
  onSearch?: (query: string, siteId: string) => void;
}

function SearchBar({
                     placeholder = "キーワードを入力",
                     buttonText = "検索",
                     className = "",
                     QueryDefaultValue = "",
                     onSearch,
                   }: SearchBarProps) {
  const { handleQueryChange, getSiteUrl, selectedSiteId } = useSearchSite();
  const [currentInput, setCurrentInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (QueryDefaultValue) {
      const defaultTags = QueryDefaultValue.split(/\s+/).filter(
          (tag) => tag.trim() !== ""
      );
      setTags(defaultTags);
      handleQueryChange(defaultTags.join(" "));
    }
  }, [QueryDefaultValue, handleQueryChange]);

  useEffect(() => {
    handleQueryChange(tags.join(" "));
  }, [handleQueryChange, tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if ((event.key === " " || event.key === "Enter") && currentInput.trim()) {
      event.preventDefault();
      const newTag = currentInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setCurrentInput("");
    } else if (
        event.key === "Backspace" &&
        currentInput === "" &&
        tags.length > 0
    ) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    } else if (event.key === "Enter") {
      if (tags.length > 0) {
        handleSearch();
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleSearch = () => {
    const searchURL = getSiteUrl();
    if (!searchURL) return;
    if (onSearch) {
      const encodedQuery = btoa(encodeURIComponent(tags.join(" ")));
      onSearch(encodedQuery, selectedSiteId);
    } else {
      window.open(searchURL, "_blank", "noopener,noreferrer");
    }
  };

  return (
      <div className={`${styles.searchInputContainer} ${className}`}>
        <form
            className={styles.searchInputWrapper}
            onSubmit={(e) => e.preventDefault()}
        >
          <Input
              type="text"
              placeholder={placeholder}
              className={styles.searchInput}
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
          />

          <Button
              className={styles.searchButton}
              onPress={handleSearch}
              isDisabled={tags.length === 0}
          >
            <Search size={20} />
            <span>{buttonText}</span>
          </Button>
        </form>

        <div className={styles.tagsContainer}>
          <TagGroup>
            <TagList>
              {tags.map((tag, index) => (
                  <Tag key={index} className={styles.tag}>
                    <span>{tag}</span>
                    <Button
                        slot="remove"
                        className={styles.removeTagButton}
                        onPress={() => removeTag(index)}
                        aria-label={`${tag}を削除`}
                    >
                      <X size={14} />
                    </Button>
                  </Tag>
              ))}
            </TagList>
          </TagGroup>
        </div>
      </div>
  );
}

export default SearchBar;