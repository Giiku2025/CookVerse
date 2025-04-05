import { Link } from "react-router-dom"
import { Calculator, Search, Apple } from "lucide-react"
import styles from "./homePage.module.css"

function HomePage() {
  return (
    <div>

      <div className={styles.heroSection}/>

      <div className={styles.featuresGrid}>
        <Link to="/search" className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Search size={32} />
          </div>
          <h3>レシピを検索</h3>
          <p>様々な健康的なレシピを検索して、栄養バランスの良い食事を見つけましょう。</p>
        </Link>

        <Link to="/ingredients" className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Apple size={32} />
          </div>
          <h3>具材からレシピを検索</h3>
          <p>冷蔵庫にある食材から作れるレシピを検索できます。</p>
        </Link>

        <Link to="/calculator" className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Calculator size={32} />
          </div>
          <h3>カロリーを計算</h3>
          <p>食事のカロリーと栄養素を計算して、健康的な食生活を維持しましょう。</p>
        </Link>
      </div>
    </div>
  )
}

export default HomePage

