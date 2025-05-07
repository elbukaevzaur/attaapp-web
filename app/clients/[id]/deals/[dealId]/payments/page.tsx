"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus } from "lucide-react"
import styles from "./deal-payments.module.css"
import { getClientById, getDealById, getDealPayments, addPayment } from "@/lib/data-service"
import type { Client, Deal, Payment } from "@/lib/types"
import AddPaymentModal from "@/components/clients/add-payment-modal"

export default function DealPaymentsPage({
  params,
}: {
  params: { id: string; dealId: string }
}) {
  const clientId = Number.parseInt(params.id)
  const dealId = Number.parseInt(params.dealId)

  const [client, setClient] = useState<Client | null>(null)
  const [deal, setDeal] = useState<Deal | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const clientData = await getClientById(clientId)
      setClient(clientData)

      const dealData = await getDealById(dealId)
      setDeal(dealData)

      const paymentsData = await getDealPayments(dealId)
      setPayments(paymentsData)
    }

    loadData()
  }, [clientId, dealId])

  const handleAddPayment = async (payment: Payment) => {
    const updatedPayments = await addPayment({
      ...payment,
      dealId,
    })
    setPayments(updatedPayments)
    setIsModalOpen(false)
  }

  if (!client || !deal) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  // Calculate remaining balance
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const remainingBalance = deal.price - deal.contribution - totalPaid

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/clients" className={styles.breadcrumbLink}>
          Клиенты
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href={`/clients/${clientId}/deals`} className={styles.breadcrumbLink}>
          {client.name}
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>
          Оплата #{dealId} {deal.product}
        </span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Оплаты по сделке</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Добавить оплату</span>
        </button>
      </div>

      <div className={styles.dealInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Клиент:</span>
          <span className={styles.infoValue}>{client.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Товар:</span>
          <span className={styles.infoValue}>{deal.product}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Цена:</span>
          <span className={styles.infoValue}>{deal.price} ₽</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Взнос:</span>
          <span className={styles.infoValue}>{deal.contribution} ₽</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Остаток:</span>
          <span className={`${styles.infoValue} ${remainingBalance > 0 ? styles.textDanger : styles.textSuccess}`}>
            {remainingBalance} ₽
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className="table">
          <thead>
            <tr>
              <th>Действие</th>
              <th>Дата платежа</th>
              <th>Сумма оплаты</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
                <td>{payment.date}</td>
                <td>{payment.amount} ₽</td>
                <td>{payment.balance} ₽</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.noData}>
                  Нет данных об оплатах
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddPaymentModal
          clientId={clientId}
          dealId={dealId}
          remainingBalance={remainingBalance}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddPayment}
        />
      )}
    </div>
  )
}
