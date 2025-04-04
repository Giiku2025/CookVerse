import styles from "./skeletonLoader.module.css"

interface SkeletonLoaderProps {
  type: "card" | "text" | "circle" | "recipe" | "nutrition"
  count?: number
}

function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return <div className={`${styles.skeleton} ${styles.card}`}></div>
      case "text":
        return <div className={`${styles.skeleton} ${styles.text}`}></div>
      case "circle":
        return <div className={`${styles.skeleton} ${styles.circle}`}></div>
      case "recipe":
        return (
          <div className={styles.recipe}>
            <div className={`${styles.skeleton} ${styles.recipeImage}`}></div>
            <div className={styles.recipeContent}>
              <div className={`${styles.skeleton} ${styles.recipeTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.recipeDescription}`}></div>
              <div className={`${styles.skeleton} ${styles.recipeDescription}`}></div>
              <div className={styles.recipeFooter}>
                <div className={`${styles.skeleton} ${styles.recipeTag}`}></div>
                <div className={`${styles.skeleton} ${styles.recipeTag}`}></div>
              </div>
            </div>
          </div>
        )
      case "nutrition":
        return (
          <div className={styles.nutrition}>
            <div className={styles.nutritionHeader}>
              <div className={`${styles.skeleton} ${styles.nutritionTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.nutritionValue}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.nutritionBar}`}></div>
            <div className={styles.nutritionGrid}>
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={styles.nutritionItem}>
                    <div className={styles.nutritionItemHeader}>
                      <div className={`${styles.skeleton} ${styles.nutritionItemTitle}`}></div>
                      <div className={`${styles.skeleton} ${styles.nutritionItemValue}`}></div>
                    </div>
                    <div className={`${styles.skeleton} ${styles.nutritionItemBar}`}></div>
                  </div>
                ))}
            </div>
          </div>
        )
      default:
        return <div className={`${styles.skeleton} ${styles.text}`}></div>
    }
  }

  return (
    <div className={styles.container}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.item}>
            {renderSkeleton()}
          </div>
        ))}
    </div>
  )
}

export default SkeletonLoader

