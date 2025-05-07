"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ArrowLeft } from "lucide-react"
import styles from "./client-deals.module.css"
import { getClientById, getClientDeals, addDeal } from "@/lib/data-service"
import type { Client, Deal } from "@/lib/types"
import AddDealModal from "@/components/deals/add-deal-modal"

export default function ClientDealsPage({ params }: { params: { id: string } }) {
  const clientId = Number.parseInt(params.id)
  const [client, setClient] = useState<Client | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const clientData = await getClientById(clientId)
      setClient(clientData)

      const dealsData = await getClientDeals(clientId)
      setDeals(dealsData)
    }

    loadData()
  }, [clientId])

  const handleAddDeal = async (deal: Deal) => {
    const updatedDeals = await addDeal({
      ...deal,
      clientId,
    })
    setDeals(updatedDeals)
    setIsModalOpen(false)
  }

  if (!client) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/clients" className={styles.breadcrumbLink}>
          <ArrowLeft size={16} />
          <span>Клиенты</span>
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{client.name}</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Сделки клиента</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Добавить сделку</span>
        </button>
      </div>

      <div className={styles.clientInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Клиент:</span>
          <span className={styles.infoValue}>{client.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Спонсор:</span>
          <span className={styles.infoValue}>{client.sponsor}</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className="table">
          <thead>
            <tr>
              <th>Действие</th>
              <th>#</th>
              <th>Наимен. товара</th>
              <th>Сущность</th>
              <th>Откуда</th>
              <th>Цена</th>
              <th>Взнос</th>
              <th>Дата оформления</th>
              <th>Кол-во месяцев</th>
              <th>Оплачено</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                    <Link href={`/clients/${clientId}/deals/${deal.id}/payments`} className={styles.actionBtn}>
                      <Plus size={16} />
                    </Link>
                  </div>
                </td>
                <td>{deal.id}</td>
                <td>{deal.product}</td>
                <td>{deal.entity}</td>
                <td>{deal.source}</td>
                <td>{deal.price} ₽</td>
                <td>{deal.contribution} ₽</td>
                <td>{deal.registrationDate}</td>
                <td>{deal.monthsCount}</td>
                <td>{deal.payment} ₽</td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr>
                <td colSpan={10} className={styles.noData}>
                  У клиента нет сделок
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddDealModal onClose={() => setIsModalOpen(false)} onSave={handleAddDeal} clientName={client.name} />
      )}
    </div>
  )
}
