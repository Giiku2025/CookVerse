import type { ReactNode } from "react"
import { useForm, FormProvider } from "react-hook-form"
import styles from "./searchForm.module.css"

interface SearchFormProps {
  children: ReactNode
  gradient?: boolean
  onSubmit?: (data: any) => void
  defaultValues?: Record<string, any>
}

function SearchForm({ children, gradient = true, onSubmit, defaultValues = {} }: SearchFormProps) {
  const methods = useForm({
    defaultValues,
  })
  const { handleSubmit } = methods

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchCard}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
            <div className={`${styles.searchForm} ${gradient ? styles.withGradient : ""}`}>{children}</div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SearchForm

