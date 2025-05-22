"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-investment-modal.module.css"
import type { Investment } from "@/src/lib/types"

interface AddInvestmentModalProps {
  onClose: () => void
  onSave: (investment: Investment) => void
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Investment>>({
    amount: "",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: "",
    percentage: 20,
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
    let endDate = formData.dateTo
    if (!endDate && formData.dateFrom) {
      const date = new Date(formData.dateFrom)
      date.setMonth(date.getMonth() + 6) // Default to 6 months
      endDate = date.toISOString().split("T")[0]
    }

    onSave({
      ...(formData as Investment),
      dateTo: endDate || "",
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
                name="dateFrom"
                className="form-control"
                value={formData.dateFrom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Дата окончания</label>
              <input
                type="date"
                name="dateTo"
                className="form-control"
                value={formData.dateTo}
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
