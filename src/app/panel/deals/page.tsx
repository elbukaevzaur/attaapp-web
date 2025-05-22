"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit, Plus } from "lucide-react"
import styles from "./deals.module.css"
import AddDealModal from "@/src/components/deals/add-deal-modal"
import { getDeals, addDeal } from "@/src/lib/data-service"
import type { Deal } from "@/src/lib/types"

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadDeals = async () => {
      const data = await getDeals()
      setDeals(data)
    }

    loadDeals()
  }, [])

  const handleAddDeal = async (deal: Deal) => {
    const updatedDeals = await addDeal(deal)
    setDeals(updatedDeals)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Сделки</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Добавить</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className="table">
          <thead>
            <tr>
              <th>Действие</th>
              <th>#</th>
              <th>Имя</th>
              <th>Сущность</th>
              <th>Наимен. товара</th>
              <th>Откуда</th>
              <th>Цена</th>
              <th>Взнос</th>
              <th>Инвестор</th>
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
                  </div>
                </td>
                <td>{deal.id}</td>
                <td>{deal.clientName}</td>
                <td>{deal.entity}</td>
                <td>{deal.product}</td>
                <td>{deal.source}</td>
                <td>{deal.price} ₽</td>
                <td>{deal.contribution} ₽</td>
                <td>{deal.investor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <AddDealModal onClose={() => setIsModalOpen(false)} onSave={handleAddDeal} />}
    </div>
  )
}
