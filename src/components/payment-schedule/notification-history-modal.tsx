"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import styles from "./notification-history-modal.module.css"
import { getNotificationHistory } from "@/lib/data-service"
import type { ScheduledPayment, NotificationRecord } from "@/lib/types"

interface NotificationHistoryModalProps {
  payment: ScheduledPayment
  onClose: () => void
}

const NotificationHistoryModal: React.FC<NotificationHistoryModalProps> = ({ payment, onClose }) => {
  const [history, setHistory] = useState<NotificationRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true)
      const data = await getNotificationHistory(payment.id)
      setHistory(data)
      setLoading(false)
    }

    loadHistory()
  }, [payment.id])

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>История уведомлений</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className={styles.paymentInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Клиент:</span>
              <span className={styles.infoValue}>{payment.clientName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Сумма:</span>
              <span className={styles.infoValue}>{payment.amount} ₽</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Дата платежа:</span>
              <span className={styles.infoValue}>{payment.dueDate}</span>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>Загрузка истории уведомлений...</div>
          ) : (
            <>
              {history.length > 0 ? (
                <div className={styles.historyList}>
                  {history.map((record) => (
                    <div key={record.id} className={styles.historyItem}>
                      <div className={styles.historyHeader}>
                        <span className={styles.historyDate}>{record.date}</span>
                        <span className={styles.historyType}>{record.type}</span>
                      </div>
                      <p className={styles.historyMessage}>{record.message}</p>
                      <div className={styles.historyFooter}>
                        <span className={styles.historyUser}>{record.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noHistory}>Нет истории уведомлений для этого платежа</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationHistoryModal
