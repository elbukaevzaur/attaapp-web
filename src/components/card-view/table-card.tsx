"use client"

import type React from "react"
import styles from "./table-card.module.css"

interface TableCardProps {
  data: Record<string, any>
  columns: {
    key: string
    title: string
    render?: (value: any, record: Record<string, any>) => React.ReactNode
  }[]
  actions?: React.ReactNode
  onClick?: () => void
  className?: string
}

const TableCard: React.FC<TableCardProps> = ({ data, columns, actions, onClick, className }) => {
  return (
    <div className={`${styles.card} ${className || ""}`} onClick={onClick}>
      {columns.map((column) => (
        <div key={column.key} className={styles.row}>
          <div className={styles.label}>{column.title}</div>
          <div className={styles.value}>{column.render ? column.render(data[column.key], data) : data[column.key]}</div>
        </div>
      ))}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}

export default TableCard
