"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-deal-modal.module.css"
import type { Deal } from "@/lib/types"

interface AddDealModalProps {
  onClose: () => void
  onSave: (deal: Deal) => void
  clientName: string
}

const AddDealModal: React.FC<AddDealModalProps> = ({ onClose, onSave, clientName }) => {
  const [formData, setFormData] = useState<Partial<Deal>>({
    clientName,
    entity: "Сделки",
    product: "",
    source: "",
    price: 0,
    contribution: 0,
    investor: "Халидов Б.Г.",
    registrationDate: new Date().toISOString().split("T")[0],
    monthsCount: 6,
    payment: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "contribution" || name === "monthsCount" || name === "payment") {
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
    onSave({
      id: Math.floor(Math.random() * 1000),
      ...(formData as Deal),
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление сделки</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Клиент</label>
              <input type="text" className="form-control" value={clientName} readOnly disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Товар</label>
              <input
                type="text"
                name="product"
                className="form-control"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Сущность</label>
              <select name="entity" className="form-control" value={formData.entity} onChange={handleChange}>
                <option value="Сделки">Сделки</option>
                <option value="Товар">Товар</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Цена</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Откуда</label>
              <input
                type="text"
                name="source"
                className="form-control"
                value={formData.source}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Дата оформления</label>
              <input
                type="date"
                name="registrationDate"
                className="form-control"
                value={formData.registrationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Взнос</label>
              <input
                type="number"
                name="contribution"
                className="form-control"
                value={formData.contribution}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Кол-во месяцев</label>
              <input
                type="number"
                name="monthsCount"
                className="form-control"
                value={formData.monthsCount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Оплата</label>
              <input
                type="number"
                name="payment"
                className="form-control"
                value={formData.payment}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Принять
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddDealModal
