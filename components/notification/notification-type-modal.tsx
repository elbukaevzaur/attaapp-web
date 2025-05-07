"use client"

import type React from "react"

import { useState } from "react"
import { X, MessageSquare, Phone, Mail, Send } from "lucide-react"
import styles from "./notification-type-modal.module.css"

interface NotificationTypeModalProps {
  onClose: () => void
  onSelect: (type: string, message: string) => void
  paymentId: number
  clientName: string
}

const NotificationTypeModal: React.FC<NotificationTypeModalProps> = ({ onClose, onSelect, paymentId, clientName }) => {
  const [selectedType, setSelectedType] = useState<string>("SMS")
  const [message, setMessage] = useState<string>(`Уважаемый клиент, напоминаем о необходимости внести платеж.`)

  const notificationTypes = [
    { id: "SMS", icon: <MessageSquare size={20} />, label: "SMS" },
    { id: "Звонок", icon: <Phone size={20} />, label: "Звонок" },
    { id: "Email", icon: <Mail size={20} />, label: "Email" },
    { id: "WhatsApp", icon: <Send size={20} />, label: "WhatsApp" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSelect(selectedType, message)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Выберите тип уведомления</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className={styles.clientInfo}>
              <span>Клиент: {clientName}</span>
            </div>

            <div className={styles.typeSelector}>
              {notificationTypes.map((type) => (
                <div
                  key={type.id}
                  className={`${styles.typeOption} ${selectedType === type.id ? styles.selected : ""}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className={styles.typeIcon}>{type.icon}</div>
                  <span>{type.label}</span>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Сообщение</label>
              <textarea
                className={`form-control ${styles.messageInput}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              ></textarea>
            </div>

            <div className={styles.templateButtons}>
              <button
                type="button"
                className={styles.templateButton}
                onClick={() => setMessage(`Уважаемый клиент, напоминаем о необходимости внести платеж.`)}
              >
                Шаблон 1
              </button>
              <button
                type="button"
                className={styles.templateButton}
                onClick={() =>
                  setMessage(
                    `Здравствуйте! Напоминаем, что срок оплаты наступает завтра. Пожалуйста, не забудьте внести платеж.`,
                  )
                }
              >
                Шаблон 2
              </button>
              <button
                type="button"
                className={styles.templateButton}
                onClick={() =>
                  setMessage(
                    `Внимание! Срок оплаты истек. Просим вас срочно внести платеж во избежание штрафных санкций.`,
                  )
                }
              >
                Просрочка
              </button>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Отправить уведомление
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NotificationTypeModal
