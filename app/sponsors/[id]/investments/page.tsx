"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ArrowLeft, ArrowRight } from "lucide-react"
import styles from "./sponsor-investments.module.css"
import { getSponsorById, getSponsorInvestments, addInvestment } from "@/lib/data-service"
import type { Sponsor, Investment } from "@/lib/types"
import AddInvestmentModal from "@/components/sponsors/add-investment-modal"

export default function SponsorInvestmentsPage({ params }: { params: { id: string } }) {
  const sponsorId = Number.parseInt(params.id)
  const [sponsor, setSponsor] = useState<Sponsor | null>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [activeTab, setActiveTab] = useState("investments")
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const sponsorData = await getSponsorById(sponsorId)
      setSponsor(sponsorData)

      const investmentsData = await getSponsorInvestments(sponsorId)
      setInvestments(investmentsData)
    }

    loadData()
  }, [sponsorId])

  const handleAddInvestment = async (investment: Investment) => {
    const updatedInvestments = await addInvestment({
      ...investment,
      sponsorId,
    })
    setInvestments(updatedInvestments)
    setIsModalOpen(false)
  }

  const handleInvestmentClick = (investment: Investment) => {
    setSelectedInvestment(investment)
    setActiveTab("operations")
  }

  if (!sponsor) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/sponsors" className={styles.breadcrumbLink}>
          <ArrowLeft size={16} />
          <span>Спонсоры</span>
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{sponsor.name}</span>
        {activeTab === "operations" && selectedInvestment && (
          <>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>
              Инвестиция {selectedInvestment.amount} от {selectedInvestment.startDate}
            </span>
          </>
        )}
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>
          {activeTab === "investments" ? "Инвестиции спонсора" : "Операции по инвестиции"}
        </h1>
        {activeTab === "investments" && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Добавить инвестицию</span>
          </button>
        )}
      </div>

      <div className={styles.sponsorInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Спонсор:</span>
          <span className={styles.infoValue}>{sponsor.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Телефон:</span>
          <span className={styles.infoValue}>{sponsor.phone}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{sponsor.email}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Всего инвестиций:</span>
          <span className={styles.infoValue}>{sponsor.totalInvestment} ₽</span>
        </div>
      </div>

      {activeTab === "investments" && (
        <div className={styles.tableContainer}>
          <table className="table">
            <thead>
              <tr>
                <th>Действие</th>
                <th>#</th>
                <th>Инвестиции</th>
                <th>Сущность</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment.id}>
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
                  <td>{investment.id}</td>
                  <td>
                    <button className={styles.investmentLink} onClick={() => handleInvestmentClick(investment)}>
                      {investment.amount} от {investment.startDate} до {investment.endDate} {investment.percentage}%
                    </button>
                  </td>
                  <td>{investment.entity}</td>
                </tr>
              ))}
              {investments.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    У спонсора нет инвестиций
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "operations" && selectedInvestment && (
        <div className={styles.operationsContainer}>
          <div className={styles.operationsHeader}>
            <div className={styles.profitInfo}>Прибыль инвестора: 150 000 ₽</div>
            <button className={styles.payoutBtn}>
              <span>Выплатить инвестору</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className="table">
              <thead>
                <tr>
                  <th>Действие</th>
                  <th>Клиент</th>
                  <th>Наимен. товара</th>
                  <th>Взнос</th>
                  <th>Дата</th>
                  <th>Оплата</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                  <td>Ханпашев Амруди Висханович</td>
                  <td>Iphone 16 pro max</td>
                  <td>60 000 ₽</td>
                  <td>01.12.2024</td>
                  <td>90 000 ₽</td>
                  <td>09.01.2024</td>
                  <td>150 000 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddInvestmentModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddInvestment}
          sponsorName={sponsor.name}
        />
      )}
    </div>
  )
}
