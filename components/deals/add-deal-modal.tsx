"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-deal-modal.module.css"
import type { Deal } from "@/lib/types"

interface AddDealModalProps {
  onClose: () => void
  onSave: (deal: Deal) => void
}

const AddDealModal: React.FC<AddDealModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Deal>>({
    productName: "",
    productOrigin: "",
    buyPrice: 0,
    price: 0,
    deposit: 0,
    sponsorName: "Халидов Б.Г.",
    registrationDate: new Date().toISOString().split("T")[0],
    paymentDay: 1,
    monthsCount: 6,
    sponsorId: 1,
    investmentId: 1
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "buyPrice" || name === "deposit" || name === "monthsCount") {
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
    onSave(formData as Deal)
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
              <label className="form-label">Товар</label>
              <input
                type="text"
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Магазин</label>
              <input
                  type="text"
                  name="productOrigin"
                  className="form-control"
                  value={formData.productOrigin}
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Цена покупки</label>
              <input
                  type="text"
                  name="buyPrice"
                  className="form-control"
                  value={formData.buyPrice}
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Цена продажи</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
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
              <label className="form-label">День оплаты</label>
              <input
                  type="number"
                  name="paymentDay"
                  className="form-control"
                  value={formData.paymentDay}
                  onChange={handleChange}
                  max={31}
                  min={1}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Взнос</label>
              <input
                type="number"
                name="deposit"
                className="form-control"
                value={formData.deposit}
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
              <label className="form-label">Sponsor ID</label>
              <input
                  type="number"
                  name="sponsorId"
                  className="form-control"
                  value={formData.sponsorId}
                  onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label className="form-label">Investment ID</label>
              <input
                  type="number"
                  name="investmentId"
                  className="form-control"
                  value={formData.investmentId}
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

export default AddDealModal
