"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Filter, X, Check } from "lucide-react"
import styles from "./filter-dropdown.module.css"

interface FilterDropdownProps {
  title: string
  options: string[]
  selectedOptions: string[]
  onChange: (selected: string[]) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleOption = (option: string) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option]
    onChange(newSelected)
  }

  const clearFilter = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
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
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={`${styles.filterButton} ${selectedOptions.length > 0 ? styles.active : ""}`}
        onClick={toggleDropdown}
      >
        <Filter size={14} />
        <span>{title}</span>
        {selectedOptions.length > 0 && (
          <span className={styles.badge} onClick={clearFilter}>
            {selectedOptions.length} <X size={12} />
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>Фильтр: {title}</span>
            {selectedOptions.length > 0 && (
              <button className={styles.clearButton} onClick={clearFilter}>
                Очистить
              </button>
            )}
          </div>
          <div className={styles.optionsList}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.option} ${selectedOptions.includes(option) ? styles.selected : ""}`}
                onClick={() => toggleOption(option)}
              >
                <div className={styles.checkbox}>{selectedOptions.includes(option) && <Check size={14} />}</div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
