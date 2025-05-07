"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-investment-modal.module.css"
import type { Investment } from "@/lib/types"

interface AddInvestmentModalProps {
  onClose: () => void
  onSave: (investment: Investment) => void
  sponsorName: string
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({ onClose, onSave, sponsorName }) => {
  const [formData, setFormData] = useState<Partial<Investment>>({
    amount: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    percentage: 20,
    entity: "Сделки",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "percentage") {
      setFormData({
        ...formData,
        [name]: Number(value),
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

    // Calculate end date if not provided
    let endDate = formData.endDate
    if (!endDate && formData.startDate) {
      const date = new Date(formData.startDate)
      date.setMonth(date.getMonth() + 6) // Default to 6 months
      endDate = date.toISOString().split("T")[0]
    }

    onSave({
      id: Math.floor(Math.random() * 1000),
      ...(formData as Investment),
      endDate: endDate || "",
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление инвестиции</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Спонсор</label>
              <input type="text" className="form-control" value={sponsorName} readOnly disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Сумма инвестиции</label>
              <input
                type="text"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Например: 1 000 000"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Дата начала</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Дата окончания</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Процент</label>
              <input
                type="number"
                name="percentage"
                className="form-control"
                value={formData.percentage}
                onChange={handleChange}
                required
                min="1"
                max="100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Сущность</label>
              <select name="entity" className="form-control" value={formData.entity} onChange={handleChange}>
                <option value="Сделки">Сделки</option>
                <option value="Товар">Товар</option>
              </select>
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

export default AddInvestmentModal
