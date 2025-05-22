"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ArrowLeft, ArrowRight } from "lucide-react"
import styles from "./sponsor-investments.module.css"
import {
    getSponsorById,
    addInvestment,
    getSponsorInvestmentsStat,
    getInvestmentsStat,
    deleteInvestment
} from "@/lib/data-service"
import {Sponsor, Investment, InvestmentStats} from "@/lib/types"
import AddInvestmentModal from "@/components/sponsors/add-investment-modal"

interface Props {
    sponsorId: number
}

export default function SponsorInvestmentsComponent(props: Props) {
    const { sponsorId } = props;
    const [sponsor, setSponsor] = useState<Sponsor | null>(null)
    const [investments, setInvestments] = useState<InvestmentStats[]>([])
    const [activeTab, setActiveTab] = useState("investments")
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            getSponsorById(sponsorId).then((resp) => {
                setSponsor(resp.data)
            })
            getSponsorInvestmentsStat(sponsorId).then((resp) => {
                setInvestments(resp.data)
            })
            // const investmentsData = await getSponsorInvestments(sponsorId)
            // setInvestments(investmentsData)
        }

        loadData()
    }, [sponsorId])

    const handleAddInvestment = async (investment: Investment) => {
        addInvestment({
            ...investment,
            sponsorId,
        }).then((resp) => {
            getInvestmentsStat(resp.data.id).then((statResp) => {
                console.log(statResp.data)
                setInvestments([...investments, statResp.data])
                setIsModalOpen(false)
            })
        })
    }

    const handleInvestmentClick = (investment: Investment) => {
        setSelectedInvestment(investment)
        setActiveTab("operations")
    }

    const handleDeleteInvestment = (investmentId: number) => {
        deleteInvestment(investmentId).then((resp) => {
            setInvestments(investments.filter(f => f.id !== investmentId));
        })
    }

    if (!sponsor) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>
                <Link href="/panel/sponsors" className={styles.breadcrumbLink}>
                    <ArrowLeft size={16} />
                    <span>Спонсоры</span>
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{sponsor.name}</span>
                {activeTab === "operations" && selectedInvestment && (
                    <>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={styles.breadcrumbCurrent}>
              Инвестиция {selectedInvestment.amount} от {selectedInvestment.dateFrom}
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
                    <span className={styles.infoValue}>test ₽</span>
                </div>
            </div>

            {activeTab === "investments" && (
                <div className={styles.tableContainer}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Инвестиции</th>
                            <th>Текущий баланс портфеля</th>
                            <th>ROI</th>
                            <th>Начало</th>
                            <th>Конец</th>
                            <th>Процент прибыли</th>
                            <th>Всего сделок</th>
                            <th>Сумма совершенных оплат</th>
                            <th>Текущий общий доход</th>
                            <th>Текущий доход инвестора</th>
                            <th>Текущий доход мой</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {investments.map((investment) => (
                            <tr key={investment.id}>
                                <td>{investment.id}</td>
                                <td>{investment.amount}</td>
                                <td>{investment.totalInvestmentReturn}</td>
                                <td>{investment.returnOfInvestmentPercentage}</td>
                                <td>{investment.dateFrom}</td>
                                <td>{investment.dateTo}</td>
                                <td>{investment.percentage}</td>
                                <td>{investment.totalDeals}</td>
                                <td>{investment.totalPayments}</td>
                                <td>{investment.totalProfit}</td>
                                <td>{investment.totalInvestorProfit}</td>
                                <td>{investment.totalMoyProfit}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.actionBtn} onClick={() => handleDeleteInvestment(investment.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                        <button className={styles.actionBtn}>
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </td>
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
                />
            )}
        </div>
    )
}
