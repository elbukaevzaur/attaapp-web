"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus } from "lucide-react"
import styles from "./deal-payments.module.css"
import {getClientById, getDealById, getDealPayments, createDealPayment, deleteDealPayment} from "@/lib/data-service"
import type { Client, Deal, Payment } from "@/lib/types"
import AddPaymentModal from "@/components/clients/add-payment-modal"
import moment from "moment";

interface Props {
    clientId: number,
    dealId: number
}
export default function DealPaymentDetailsComponent(props: Props) {
    const {clientId, dealId} = props

    const [client, setClient] = useState<Client | null>(null)
    const [deal, setDeal] = useState<Deal | null>(null)
    const [payments, setPayments] = useState<Payment[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await getClientById(clientId).then((resp) => {
                setClient(resp.data)
            })

            await getDealById(dealId).then((resp) => {
                setDeal(resp.data)
            })

            // await getDealPayments(dealId).then((resp) => {
            //     setPayments(resp.data.data)
            // })
        }

        loadData()
    }, [clientId, dealId])

    const handleAddPayment = async (payment: Payment) => {
        createDealPayment({
            ...payment,
            dealId
        }).then((resp) => {
            setPayments([...payments, resp.data])
            setIsModalOpen(false)
        })
    }

    if (!client || !deal) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    // Calculate remaining balance
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const remainingBalance = deal.price - deal.deposit - totalPaid

    function handleDeleteDealPayment(id: number) {
        deleteDealPayment(id).then((resp) => {
            setPayments(payments.filter(f => f.id !== id))
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>
                <Link href="/clients" className={styles.breadcrumbLink}>
                    Клиенты
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={`/src/app/panel/clients/${clientId}/deals`} className={styles.breadcrumbLink}>
                    {client.name}
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>
          {deal.productName}
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
                    <span className={styles.infoValue}>{deal.productName}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Цена:</span>
                    <span className={styles.infoValue}>{deal.price} ₽</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Взнос:</span>
                    <span className={styles.infoValue}>{deal.deposit} ₽</span>
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
                        <th>Дата платежа</th>
                        <th>Сумма оплаты</th>
                        <th>Остаток</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{moment(payment.paymentDate).format('DD-MM-YYYY')}</td>
                            <td>{payment.amount} ₽</td>
                            <td>{payment.balance} ₽</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn} onClick={() => handleDeleteDealPayment(payment.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <Edit size={16} />
                                    </button>
                                </div>
                            </td>
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
