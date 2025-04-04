import { Utensils } from "lucide-react"
import styles from "./loadingScreen.module.css"

interface LoadingScreenProps {
  message?: string
}

function LoadingScreen({ message = "データを読み込み中..." }: LoadingScreenProps) {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.iconContainer}>
          <Utensils size={40} className={styles.icon} />
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

export default LoadingScreen

