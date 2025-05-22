"use client"

import { Bell, ChevronDown, Search, Menu } from "lucide-react"
import { useState } from "react"
import styles from "./header.module.css"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.querySelector("aside")?.classList.toggle("open")
  }

  return (
    <header className={styles.header}>
      {/*<button className={styles.menuToggle} onClick={toggleMobileMenu}>*/}
      {/*  <Menu size={24} />*/}
      {/*</button>*/}

      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Найти" className={styles.searchInput} />
      </div>

      <div className={styles.userSection}>
        <button className={styles.notificationBtn}>
          <Bell size={20} />
        </button>
        {/*<div className={styles.userInfo}>*/}
        {/*  <img src="/placeholder.svg?height=40&width=40" alt="Аватар пользователя" className={styles.userAvatar} />*/}
        {/*  <span className={styles.userName}>Ибрагим Мусаевич</span>*/}
        {/*  <ChevronDown size={16} />*/}
        {/*</div>*/}
      </div>
    </header>
  )
}

export default Header
