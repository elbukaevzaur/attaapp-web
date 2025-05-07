"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-client-modal.module.css"
import type { Client } from "@/lib/types"

interface AddClientModalProps {
  onClose: () => void
  onSave: (client: Client) => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    entity: "Сделки",
    product: "",
    source: "",
    price: 0,
    contribution: 0,
    sponsor: "Халидов Б.Г.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "contribution" ? Number(value) : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: Math.floor(Math.random() * 1000),
      ...(formData as Client),
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление клиента</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Имя</label>
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
              <label className="form-label">Спонсор</label>
              <select name="sponsor" className="form-control" value={formData.sponsor} onChange={handleChange}>
                <option value="Халидов Б.Г.">Халидов Б.Г.</option>
                <option value="Абасов Т.В.">Абасов Т.В.</option>
                <option value="Другой спонсор">Другой спонсор</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Сущность</label>
              <select name="entity" className="form-control" value={formData.entity} onChange={handleChange}>
                <option value="Сделки">Сделки</option>
                <option value="Товар">Товар</option>
              </select>
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
              <label className="form-label">Взнос</label>
              <input
                type="number"
                name="contribution"
                className="form-control"
                value={formData.contribution}
                onChange={handleChange}
                required
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

export default AddClientModal
