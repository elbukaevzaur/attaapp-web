"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-report-modal.module.css"
import type { Report } from "@/lib/types"

interface AddReportModalProps {
  onClose: () => void
  onSave: (report: Report) => void
}

const AddReportModal: React.FC<AddReportModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Report>>({
    name: "",
    entity: "Сделки",
    type: "По умолчанию",
    showOnMain: false,
    showInMenu: false,
    showInTopMenu: false,
    hideRecordsCount: false,
    hideCounterIfEmpty: false,
    showAsCounterOnMain: false,
    autoUpdate: false,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: Math.floor(Math.random() * 1000),
      ...(formData as Report),
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавить отчет</h2>
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
              <label className="form-label">Сущность</label>
              <select name="entity" className="form-control" value={formData.entity} onChange={handleChange}>
                <option value="Сделки">Сделки</option>
                <option value="Клиенты">Клиенты</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Тип</label>
              <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                <option value="По умолчанию">По умолчанию</option>
                <option value="Счетчик">Счетчик</option>
              </select>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showOnMain"
                name="showOnMain"
                checked={formData.showOnMain}
                onChange={handleChange}
              />
              <label htmlFor="showOnMain">Отображать на главной</label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showInTopMenu"
                name="showInTopMenu"
                checked={formData.showInTopMenu}
                onChange={handleChange}
              />
              <label htmlFor="showInTopMenu">Отображать в верхнем меню</label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddReportModal
