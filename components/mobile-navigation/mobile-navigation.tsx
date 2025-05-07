"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Users, Calendar, Building, BarChart2 } from "lucide-react"
import styles from "./mobile-navigation.module.css"

const MobileNavigation = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className={styles.mobileNav}>
      <Link href="/profile" className={`${styles.navItem} ${isActive("/profile") ? styles.active : ""}`}>
        <User size={20} />
        <span>Профиль</span>
      </Link>

      <Link href="/clients" className={`${styles.navItem} ${isActive("/clients") ? styles.active : ""}`}>
        <Users size={20} />
        <span>Клиенты</span>
      </Link>

      <Link
        href="/payment-schedule"
        className={`${styles.navItem} ${isActive("/payment-schedule") ? styles.active : ""}`}
      >
        <Calendar size={20} />
        <span>График платежей</span>
      </Link>

      <Link href="/sponsors" className={`${styles.navItem} ${isActive("/sponsors") ? styles.active : ""}`}>
        <Building size={20} />
        <span>Спонсоры</span>
      </Link>

      <Link href="/reports" className={`${styles.navItem} ${isActive("/reports") ? styles.active : ""}`}>
        <BarChart2 size={20} />
        <span>Отчеты</span>
      </Link>
    </nav>
  )
}

export default MobileNavigation
