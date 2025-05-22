"use client"

import type React from "react"

import { ArrowUp, ArrowDown } from "lucide-react"
import styles from "./sort-header.module.css"

interface SortHeaderProps {
  title: string
  field: string
  currentSortField: string
  currentSortDirection: "asc" | "desc"
  onSort: (field: string) => void
}

const SortHeader: React.FC<SortHeaderProps> = ({ title, field, currentSortField, currentSortDirection, onSort }) => {
  const isActive = currentSortField === field

  return (
    <div className={styles.sortHeader} onClick={() => onSort(field)}>
      <span>{title}</span>
      {isActive && (
        <span className={styles.sortIcon}>
          {currentSortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </span>
      )}
    </div>
  )
}

export default SortHeader
