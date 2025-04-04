import styles from "./loadingSpinner.module.css"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  color?: "primary" | "secondary" | "white"
  text?: string
}

function LoadingSpinner({ size = "medium", color = "primary", text }: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  )
}

export default LoadingSpinner

