"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ArrowLeft } from "lucide-react"
import styles from "./client-deals.module.css"
import {getClientById, getClientDeals, createDeal} from "@/lib/data-service"
import type { Client, Deal } from "@/lib/types"
import AddDealModal from "@/components/deals/add-deal-modal"

interface Props {
    clientId: number
}

export default function ClientDetailsComponent(props: Props) {
    const { clientId } = props
    const [client, setClient] = useState<Client | null>(null)
    const [deals, setDeals] = useState<Deal[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await getClientById(clientId).then((resp) => {
                setClient(resp.data)
            })

            await getClientDeals(clientId).then((resp) => {
                setDeals(resp.data.data)
            })
        }

        loadData()
    }, [clientId])

    const handleAddDeal = async (deal: Deal) => {
        createDeal({...deal, clientId}).then((resp) => {
            setDeals([...deals, resp.data])
            setIsModalOpen(false)
        })
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
                    <span className={styles.infoLabel}>Откуда:</span>
                    <span className={styles.infoValue}>{client.residence}</span>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Наимен. товара</th>
                        <th>Откуда товар</th>
                        <th>Цена покупки</th>
                        <th>Цена продажи</th>
                        <th>Взнос</th>
                        <th>Дата оформления</th>
                        <th>День оплаты</th>
                        <th>Кол-во месяцев</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deals.map((deal) => (
                        <tr key={deal.id}>
                            <td>{deal.id}</td>
                            <td>{deal.productName}</td>
                            <td>{deal.productOrigin}</td>
                            <td>{deal.buyPrice} ₽</td>
                            <td>{deal.price} ₽</td>
                            <td>{deal.deposit} ₽</td>
                            <td>{deal.registrationDate}</td>
                            <td>{deal.paymentDay}</td>
                            <td>{deal.monthsCount}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn}>
                                        <Trash2 size={16} />
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <Edit size={16} />
                                    </button>
                                    <Link href={`/src/app/panel/clients/${clientId}/deals/${deal.id}/payments`} className={styles.actionBtn}>
                                        <Plus size={16} />
                                    </Link>
                                </div>
                            </td>
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
                <AddDealModal onClose={() => setIsModalOpen(false)} onSave={handleAddDeal} />
            )}
        </div>
    )
}
