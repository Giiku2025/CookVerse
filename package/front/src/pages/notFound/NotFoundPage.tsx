
import { Link } from "react-router-dom"
import { Home, Search, ArrowLeft } from "lucide-react"
import styles from "./notFoundPage.module.css"

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>ページが見つかりません</h1>
        <p className={styles.description}>
          お探しのページは存在しないか、移動された可能性があります。 別のページを探すか、ホームページに戻ってください。
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            <Home size={20} />
            ホームに戻る
          </Link>
          <Link to="/search" className={styles.secondaryButton}>
            <Search size={20} />
            レシピを検索
          </Link>
          <button onClick={() => window.history.back()} className={styles.tertiaryButton}>
            <ArrowLeft size={20} />
            前のページに戻る
          </button>
        </div>

        <div className={styles.illustration}>
          <div className={styles.plate}></div>
          <div className={styles.fork}></div>
          <div className={styles.knife}></div>
          <div className={styles.questionMark}>?</div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

