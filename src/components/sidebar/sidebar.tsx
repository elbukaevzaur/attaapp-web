"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Users, Calendar, Building, BarChart2 } from "lucide-react"
import styles from "./sidebar.module.css"

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoText}>ATTA</span>
        <span className={styles.logoHighlight}>APP</span>
      </div>

      <nav className={styles.nav}>
        <Link href="profile" className={`${styles.navItem} ${isActive("/panel/profile") ? styles.active : ""}`}>
          <User size={20} />
          <span>Профиль</span>
        </Link>

        <Link href="clients" className={`${styles.navItem} ${isActive("/panel/clients") ? styles.active : ""}`}>
          <Users size={20} />
          <span>Клиенты</span>
        </Link>

        <Link
          href="payment-schedule"
          className={`${styles.navItem} ${isActive("/panel/payment-schedule") ? styles.active : ""}`}
        >
          <Calendar size={20} />
          <span>График платежей</span>
        </Link>

        <Link href="sponsors" className={`${styles.navItem} ${isActive("/panel/sponsors") ? styles.active : ""}`}>
          <Building size={20} />
          <span>Спонсоры</span>
        </Link>

        <Link href="reports" className={`${styles.navItem} ${isActive("/panel/reports") ? styles.active : ""}`}>
          <BarChart2 size={20} />
          <span>Отчеты</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
