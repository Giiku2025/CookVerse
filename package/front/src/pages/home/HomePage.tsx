import { Link } from "react-router-dom"
import { Calculator, Search, Apple } from "lucide-react"
import styles from "./homePage.module.css"

function HomePage() {
  return (
    <div>
      <h1 className="page-title">NutriTrack</h1>
      <p className="page-subtitle">あなたの健康をサポートする栄養管理アプリ</p>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2>
            健康的な食生活を
            <br />
            簡単に管理
          </h2>
          <p>NutriTrackは日々の栄養摂取を簡単に記録し、健康的な食生活をサポートします。</p>
          <Link to="/calculator" className={styles.heroButton}>
            今すぐ始める
          </Link>
        </div>
      </div>

      <div className={styles.featuresGrid}>
        <Link to="/search" className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Search size={32} />
          </div>
          <h3>レシピを検索</h3>
          <p>様々な健康的なレシピを検索して、栄養バランスの良い食事を見つけましょう。</p>
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

