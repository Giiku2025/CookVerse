import styles from "./nutritionTracker.module.css"

interface NutritionTrackerProps {
  colorScheme?: "greenToOrange" | "whiteToGreen"
}

function NutritionTracker({ colorScheme }: NutritionTrackerProps) {
  // 栄養素ごとに適切なプログレスバーのクラスを返す関数
  const getProgressBarClass = (nutrientType: string) => {
    // たんぱく質と食物繊維には白から緑のパターンを適用
    if (nutrientType === "protein" || nutrientType === "fiber") {
      return styles.progressBarWhiteToGreen
    }
    // その他の栄養素には緑からオレンジのパターンを適用
    return styles.progressBarGreenToOrange
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>カロリー</h2>
        <div className={styles.mainValue}>
          <span className={styles.currentValue}>1,940</span>
          <span className={styles.totalValue}>/ 2,053 kcal</span>
        </div>
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${getProgressBarClass("calorie")}`}
            style={{ width: `${(1940 / 2053) * 100}%` }}
          ></div>
        </div>

        <div className={styles.nutrientsGrid}>
          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>たんぱく質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>90.7</span>
                <span className={styles.total}>/ 77.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("protein")}`}
                style={{ width: `${Math.min((90.7 / 77.0) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>脂質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>59.9</span>
                <span className={styles.total}>/ 68.5 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("fat")}`}
                style={{ width: `${(59.9 / 68.5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>炭水化物</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>250.1</span>
                <span className={styles.total}>/ 256.7 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("carb")}`}
                style={{ width: `${(250.1 / 256.7) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>糖質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>228.6</span>
                <span className={styles.total}>/ 231.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("sugar")}`}
                style={{ width: `${(228.6 / 231.0) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>食物繊維</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>21.6</span>
                <span className={styles.total}>/ 21.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("fiber")}`}
                style={{ width: `${Math.min((21.6 / 21.0) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>塩分</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>8.61</span>
                <span className={styles.total}>/ 7.50 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass("salt")}`}
                style={{ width: `${Math.min((8.61 / 7.5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionTracker

