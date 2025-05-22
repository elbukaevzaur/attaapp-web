"use client"

import type React from "react"

import { useState } from "react"
import { X, BarChart2, LineChart, PieChart } from "lucide-react"
import styles from "./report-modal.module.css"
import type { Report } from "@/src/lib/types"

interface ReportModalProps {
  report: Report | null
  onClose: () => void
  onSave: (report: Report) => void
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Report>>(
    report || {
      name: "",
      entity: "Сделки",
      type: "По умолчанию",
      showOnMain: false,
      showInMenu: true,
      showInTopMenu: false,
      hideRecordsCount: false,
      hideCounterIfEmpty: false,
      showAsCounterOnMain: false,
      autoUpdate: false,
      description: "",
      chartType: "bar",
      dataSource: "deals",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: report?.id || Math.floor(Math.random() * 1000),
      createdAt: report?.createdAt || new Date().toLocaleDateString("ru-RU"),
      updatedAt: new Date().toLocaleDateString("ru-RU"),
      createdBy: report?.createdBy || "Ибрагим Мусаевич",
      ...(formData as Report),
    })
  }

  return (
    <div className="modal-backdrop">
      <div className={`modal ${styles.reportModal}`}>
        <div className="modal-header">
          <h2>{report ? "Редактирование отчета" : "Добавление отчета"}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Название</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Описание</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Сущность</label>
                <select name="entity" className="form-control" value={formData.entity} onChange={handleChange}>
                  <option value="Сделки">Сделки</option>
                  <option value="Клиенты">Клиенты</option>
                  <option value="Спонсоры">Спонсоры</option>
                  <option value="Платежи">Платежи</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Тип</label>
                <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                  <option value="По умолчанию">По умолчанию</option>
                  <option value="Счетчик">Счетчик</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Источник данных</label>
                <select name="dataSource" className="form-control" value={formData.dataSource} onChange={handleChange}>
                  <option value="deals">Сделки</option>
                  <option value="clients">Клиенты</option>
                  <option value="sponsors">Спонсоры</option>
                  <option value="payments">Платежи</option>
                  <option value="investments">Инвестиции</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Тип графика</label>
                <div className={styles.chartTypeSelector}>
                  <div
                    className={`${styles.chartTypeOption} ${formData.chartType === "bar" ? styles.selected : ""}`}
                    onClick={() => setFormData({ ...formData, chartType: "bar" })}
                  >
                    <BarChart2 size={24} />
                    <span>Столбцы</span>
                  </div>
                  <div
                    className={`${styles.chartTypeOption} ${formData.chartType === "line" ? styles.selected : ""}`}
                    onClick={() => setFormData({ ...formData, chartType: "line" })}
                  >
                    <LineChart size={24} />
                    <span>Линия</span>
                  </div>
                  <div
                    className={`${styles.chartTypeOption} ${formData.chartType === "pie" ? styles.selected : ""}`}
                    onClick={() => setFormData({ ...formData, chartType: "pie" })}
                  >
                    <PieChart size={24} />
                    <span>Круговая</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showOnMain" checked={formData.showOnMain} onChange={handleChange} />
                <span>Отображать на главной</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showInMenu" checked={formData.showInMenu} onChange={handleChange} />
                <span>Отображать в меню</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="showInTopMenu" checked={formData.showInTopMenu} onChange={handleChange} />
                <span>Отображать в верхнем меню</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="autoUpdate" checked={formData.autoUpdate} onChange={handleChange} />
                <span>Автообновление</span>
              </label>
            </div>

            {formData.type === "Счетчик" && (
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="hideRecordsCount"
                    checked={formData.hideRecordsCount}
                    onChange={handleChange}
                  />
                  <span>Скрыть количество записей</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="hideCounterIfEmpty"
                    checked={formData.hideCounterIfEmpty}
                    onChange={handleChange}
                  />
                  <span>Скрыть счетчик, если нет записей</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="showAsCounterOnMain"
                    checked={formData.showAsCounterOnMain}
                    onChange={handleChange}
                  />
                  <span>Отображать как счетчик на главной</span>
                </label>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              {report ? "Сохранить" : "Добавить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReportModal
