
import { useState } from "react"
import { Link } from "react-router-dom"
import { Calculator, Search, Apple, Home, Menu, X } from "lucide-react"
import styles from "./header.module.css"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileNavOpen : ""}`}>
          <Link to="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            <Home size={20} />
            <span>ホーム</span>
          </Link>
          <Link to="/search" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            <Search size={20} />
            <span>レシピを検索</span>
          </Link>
          <Link to="/ingredients" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            <Apple size={20} />
            <span>具材から検索</span>
          </Link>
          <Link to="/calculator" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            <Calculator size={20} />
            <span>カロリー計算</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

