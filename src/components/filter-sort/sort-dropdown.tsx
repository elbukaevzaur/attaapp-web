"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUp, ArrowDown, ChevronDown } from "lucide-react"
import styles from "./sort-dropdown.module.css"

interface SortDropdownProps {
  options: { field: string; label: string }[]
  currentSortField: string
  currentSortDirection: "asc" | "desc"
  onSortFieldChange: (field: string) => void
  onSortDirectionChange: () => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  currentSortField,
  currentSortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (field: string) => {
    onSortFieldChange(field)
    setIsOpen(false)
  }

  const getCurrentLabel = () => {
    const option = options.find((opt) => opt.field === currentSortField)
    return option ? option.label : "Сортировка"
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.sortDropdownContainer} ref={dropdownRef}>
      <div className={styles.sortControls}>
        <button className={styles.sortFieldButton} onClick={toggleDropdown}>
          <span>{getCurrentLabel()}</span>
          <ChevronDown size={16} className={isOpen ? styles.rotated : ""} />
        </button>
        <button className={styles.sortDirectionButton} onClick={onSortDirectionChange}>
          {currentSortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>Сортировать по</div>
          <div className={styles.optionsList}>
            {options.map((option) => (
              <div
                key={option.field}
                className={`${styles.option} ${currentSortField === option.field ? styles.selected : ""}`}
                onClick={() => handleOptionClick(option.field)}
              >
                <span>{option.label}</span>
                {currentSortField === option.field && (
                  <span className={styles.currentDirection}>
                    {currentSortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SortDropdown
