"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-client-modal.module.css"
import type { Client } from "@/src/lib/types"

interface AddClientModalProps {
  onClose: () => void
  onSave: (client: Client) => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    residence: '',
    age: 0
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
              <label className="form-label">ФИО</label>
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
              <label className="form-label">Возраст</label>
              <input
                  type="text"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Откуда</label>
              <input
                type="text"
                name="residence"
                className="form-control"
                value={formData.residence}
                onChange={handleChange}
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

export default AddClientModal
