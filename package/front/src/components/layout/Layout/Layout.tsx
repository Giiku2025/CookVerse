import type { ReactNode } from "react"
import Header from "../Header/Header"
import styles from "./layout.module.css"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className="page-container">{children}</main>
    </div>
  )
}

export default Layout

