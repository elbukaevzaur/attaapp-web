"use client"

import type React from "react"
import { useState } from "react"
import { X, Search } from "lucide-react"
import styles from "./report-info-modal.module.css"
import type { Report } from "@/src/lib/types"

interface ReportInfoModalProps {
  report: Report
  onClose: () => void
}

const ReportInfoModal: React.FC<ReportInfoModalProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    ...report,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className="modal-backdrop">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Информация об отчете</h2>
          <div className={styles.headerActions}>
            <button onClick={onClose} className={styles.minimizeBtn}>
              <span>—</span>
            </button>
            <button onClick={onClose} className={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "basic" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            Основная информация
          </button>
          <button
            className={`${styles.tab} ${activeTab === "counter" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("counter")}
          >
            Отображать как счетчик
          </button>
          <button
            className={`${styles.tab} ${activeTab === "topMenu" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("topMenu")}
          >
            Верхнее меню
          </button>
        </div>

        <div className={styles.modalBody}>
          {activeTab === "basic" && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Сущность</label>
                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.formControl}
                      name="entity"
                      value={formData.entity}
                      onChange={handleChange}
                    >
                      <option value="Сделки">Сделки</option>
                      <option value="Клиенты">Клиенты</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Тип</label>
                  <div className={styles.selectWrapper}>
                    <select className={styles.formControl} name="type" value={formData.type} onChange={handleChange}>
                      <option value="По умолчанию">По умолчанию</option>
                      <option value="Счетчик">Счетчик</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Имя</label>
                <input
                  type="text"
                  name="name"
                  className={styles.formControl}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Иконка меню</label>
                  <div className={styles.colorPickerWrapper}>
                    <div className={styles.colorPicker}>
                      <div className={styles.colorPreview}></div>
                      <Search size={16} className={styles.searchIcon} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Цвет</label>
                  <div className={styles.colorRow}>
                    <div className={styles.colorPickerWrapper}>
                      <div className={styles.colorPicker}>
                        <div className={styles.colorPreview}></div>
                      </div>
                      <span>Иконка</span>
                    </div>

                    <div className={styles.colorPickerWrapper}>
                      <div className={styles.colorPicker}>
                        <div className={styles.colorPreview}></div>
                      </div>
                      <span>Фон</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="showInMenu" checked={formData.showInMenu} onChange={handleChange} />
                  Отображать в меню
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="showOnMain" checked={formData.showOnMain} onChange={handleChange} />
                  Отображать на главной
                </label>
              </div>
            </>
          )}

          {activeTab === "counter" && (
            <>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="hideRecordsCount"
                    checked={formData.hideRecordsCount}
                    onChange={handleChange}
                  />
                  Скрыть количество записей
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="hideCounterIfEmpty"
                    checked={formData.hideCounterIfEmpty}
                    onChange={handleChange}
                  />
                  Скрыть счетчик, если нет записей
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="showAsCounterOnMain"
                    checked={formData.showAsCounterOnMain}
                    onChange={handleChange}
                  />
                  Отображать как счетчик на главной
                </label>
              </div>
            </>
          )}

          {activeTab === "topMenu" && (
            <>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="showInTopMenu"
                    checked={formData.showInTopMenu}
                    onChange={handleChange}
                  />
                  Отображать в верхнем меню
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="autoUpdate" checked={formData.autoUpdate} onChange={handleChange} />
                  Автообновление
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportInfoModal
