import type { ReactNode } from "react"
import styles from "./searchForm.module.css"

interface SearchFormProps {
  children: ReactNode
  gradient?: boolean
}

function SearchForm({ children, gradient = true }: SearchFormProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchCard}>
        <div className={`${styles.searchForm} ${gradient ? styles.withGradient : ""}`}>{children}</div>
      </div>
    </div>
  )
}

export default SearchForm

