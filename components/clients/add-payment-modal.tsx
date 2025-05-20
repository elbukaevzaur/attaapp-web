"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import styles from "./add-payment-modal.module.css"
import type { Payment } from "@/lib/types"

interface AddPaymentModalProps {
  clientId: number
  dealId: number
  remainingBalance: number
  onClose: () => void
  onSave: (payment: Payment) => void
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ clientId, dealId, remainingBalance, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Payment>>({
    clientId,
    dealId,
    paymentDate: new Date().toISOString().split("T")[0],
    amount: 0,
    balance: remainingBalance,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "amount") {
      const amount = Number(value)
      const newBalance = remainingBalance - amount

      setFormData({
        ...formData,
        amount,
        balance: newBalance,
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
      ...(formData as Payment),
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление оплаты</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Дата платежа</label>
              <input
                type="date"
                name="paymentDate"
                className="form-control"
                value={formData.paymentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Сумма оплаты</label>
              <input
                type="text"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
                max={remainingBalance}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Остаток после оплаты</label>
              <input type="number" name="balance" className="form-control" value={formData.balance} readOnly />
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

export default AddPaymentModal
