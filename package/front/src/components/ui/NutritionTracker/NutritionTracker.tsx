import { Nutrition } from "../../../hooks/useCalculator";
import styles from "./nutritionTracker.module.css";

// interface NutritionTrackerProps {
//   colorScheme?: "greenToOrange" | "whiteToGreen"
// }

function NutritionTracker({ data }: { data: Nutrition }) {
  // 栄養素ごとに適切なプログレスバーのクラスを返す関数
  const getProgressBarClass = (nutrientType: string) => {
    // たんぱく質と食物繊維には白から緑のパターンを適用
    if (nutrientType === "protein" || nutrientType === "fiber") {
      return styles.progressBarWhiteToGreen;
    }
    // その他の栄養素には緑からオレンジのパターンを適用
    return styles.progressBarGreenToOrange;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>カロリー</h2>
        <div className={styles.mainValue}>
          <span className={styles.currentValue}>{data.calories}</span>
          <span className={styles.totalValue}>/ 2,053 kcal</span>
        </div>
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${getProgressBarClass(
              "calorie"
            )}`}
            style={{ width: `${(data.calories / 2053) * 100}%` }}
          ></div>
        </div>

        <div className={styles.nutrientsGrid}>
          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>たんぱく質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.protein}</span>
                <span className={styles.total}>/ 77.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "protein"
                )}`}
                style={{
                  width: `${Math.min((data.protein / 77.0) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>脂質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.fat}</span>
                <span className={styles.total}>/ 68.5 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "fat"
                )}`}
                style={{ width: `${(data.fat / 68.5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>炭水化物</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.carbohydrate}</span>
                <span className={styles.total}>/ 256.7 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "carb"
                )}`}
                style={{ width: `${(data.carbohydrate / 256.7) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>糖質</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.sugar}</span>
                <span className={styles.total}>/ 231.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "sugar"
                )}`}
                style={{ width: `${(data.sugar / 231.0) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>食物繊維</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.fiber}</span>
                <span className={styles.total}>/ 21.0 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "fiber"
                )}`}
                style={{
                  width: `${Math.min((data.fiber / 21.0) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div className={styles.nutrientItem}>
            <div className={styles.nutrientHeader}>
              <h3>塩分</h3>
              <div className={styles.valueContainer}>
                <span className={styles.value}>{data.salt}</span>
                <span className={styles.total}>/ 7.50 g</span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.progressBar} ${getProgressBarClass(
                  "salt"
                )}`}
                style={{ width: `${Math.min((data.salt / 7.5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionTracker;
