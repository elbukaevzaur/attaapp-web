"use client"

import { useState, useEffect, useMemo } from "react"
import { Trash2, Edit, Plus, Calendar, Bell, Check, Search, X } from "lucide-react"
import styles from "./payment-schedule.module.css"
import { getPaymentSchedule, markPaymentAsPaid, markPaymentAsNotified } from "@/lib/data-service"
import type { ScheduledPayment } from "@/lib/types"
import NotificationHistoryModal from "@/components/payment-schedule/notification-history-modal"
import NotificationTypeModal from "@/components/notification/notification-type-modal"
import TableCard from "@/components/card-view/table-card"
import FilterDropdown from "@/components/filter-sort/filter-dropdown"
import SortHeader from "@/components/filter-sort/sort-header"
import SortDropdown from "@/components/filter-sort/sort-dropdown"

export default function PaymentSchedulePage() {
  const [payments, setPayments] = useState<ScheduledPayment[]>([])
  const [selectedView, setSelectedView] = useState("list")
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedPayment, setSelectedPayment] = useState<ScheduledPayment | null>(null)
  const [showNotificationHistory, setShowNotificationHistory] = useState(false)
  const [showNotificationTypeModal, setShowNotificationTypeModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filters
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [clientFilter, setClientFilter] = useState<string[]>([])
  const [sponsorFilter, setSponsorsFilter] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState<string[]>([])

  useEffect(() => {
    const loadPayments = async () => {
      getPaymentSchedule({
        startDate: "2025-02-14",
        endDate: "2025-10-31"
      }).then((resp) => {
        setPayments(resp.data)
      })
    }
    loadPayments()
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getPaymentStatus = (payment: ScheduledPayment) => {
    if (payment.status === 'PAID') return "paid"
    if (payment.status === 'UNPAID') return "UNPAID"

    const today = new Date()
    const paymentDate = new Date(payment.paymentDate)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (paymentDate < today) return "overdue"
    if (paymentDate.toDateString() === today.toDateString()) return "today"
    if (paymentDate.toDateString() === tomorrow.toDateString()) return "tomorrow"

    return "upcoming"
  }

  const getStatusLabel = (status: string) => {
    console.log(status)
    switch (status) {
      case "overdue":
        return "Просрочен"
      case "today":
        return "Сегодня"
      case "tomorrow":
        return "Завтра"
      case "paid":
        return "Оплачен"
      case "upcoming":
        return "Предстоит"
      default:
        return status
    }
  }

  const handleMarkAsPaid = async (id: number) => {
    const updatedPayments = await markPaymentAsPaid(id)
    setPayments(updatedPayments)
  }

  const handleShowNotificationModal = (payment: ScheduledPayment) => {
    setSelectedPayment(payment)
    setShowNotificationTypeModal(true)
  }

  const handleSendNotification = async (type: string, message: string) => {
    if (selectedPayment) {
      const updatedPayments = await markPaymentAsNotified(selectedPayment.dealId, type, message)
      setPayments(updatedPayments)
      setShowNotificationTypeModal(false)
    }
  }

  const handleShowNotificationHistory = (payment: ScheduledPayment) => {
    setSelectedPayment(payment)
    setShowNotificationHistory(true)
  }

  // Extract unique values for filters
  const uniqueClients = useMemo(() => [...new Set(payments.map((p) => p.clientId))].sort(), [payments])

  // const uniqueSponsors = useMemo(() => [...new Set(payments.map((p) => p.sponsor))].sort(), [payments])

  const uniqueDates = useMemo(() => [...new Set(payments.map((p) => p.paymentDate))].sort(), [payments])

  const uniqueStatuses = useMemo(
    () => [...new Set(payments.map((p) => getStatusLabel(getPaymentStatus(p))))].sort(),
    [payments],
  )

  // Apply filters and search
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const status = getStatusLabel(getPaymentStatus(payment))

      // Apply search
      if (
        searchTerm &&
        !payment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Apply filters
      if (statusFilter.length > 0 && !statusFilter.includes(status)) {
        return false
      }

      // if (clientFilter.length > 0 && !clientFilter.includes(payment.clientId)) {
      //   return false
      // }
      //
      // if (dateFilter.length > 0 && !dateFilter.includes(payment.paymentDate)) {
      //   return false
      // }

      return true
    })
  }, [payments, searchTerm, statusFilter, clientFilter, sponsorFilter, dateFilter])

  // Apply sorting
  const sortedPayments = useMemo(() => {
    return [...filteredPayments].sort((a, b) => {
      let comparison = 0

      if (sortField === "dueDate") {
        const dateA = new Date(a.dueDate.split(".").reverse().join("-"))
        const dateB = new Date(b.dueDate.split(".").reverse().join("-"))
        comparison = dateA.getTime() - dateB.getTime()
      } else if (sortField === "amount") {
        comparison = a.amount - b.amount
      } else if (sortField === "client") {
        comparison = a.clientName.localeCompare(b.clientName)
      }
      // else if (sortField === "sponsor") {
      //   comparison = a.sponsor.localeCompare(b.sponsor)
      // }
      else if (sortField === "status") {
        const statusA = getPaymentStatus(a)
        const statusB = getPaymentStatus(b)
        comparison = statusA.localeCompare(statusB)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredPayments, sortField, sortDirection])

  // Sort options for mobile dropdown
  const sortOptions = [
    { field: "status", label: "Статус" },
    { field: "client", label: "Клиент" },
    { field: "sponsor", label: "Спонсор" },
    { field: "amount", label: "Сумма" },
    { field: "date", label: "Дата" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>График платежей</h1>
        <button className="btn btn-primary">
          <Plus size={16} />
          <span>Добавить</span>
        </button>
      </div>

      <div className={styles.viewSelector}>
        <button
          className={`${styles.viewButton} ${selectedView === "list" ? styles.active : ""}`}
          onClick={() => setSelectedView("list")}
        >
          Список
        </button>
        <button
          className={`${styles.viewButton} ${selectedView === "calendar" ? styles.active : ""}`}
          onClick={() => setSelectedView("calendar")}
        >
          <Calendar size={16} />
          <span>Календарь</span>
        </button>
      </div>

      {selectedView === "list" && (
        <>
          <div className={styles.filtersContainer}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Поиск по клиенту или спонсору"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className={styles.clearSearch} onClick={() => setSearchTerm("")}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className={styles.filters}>
              <FilterDropdown
                title="Статус"
                options={uniqueStatuses}
                selectedOptions={statusFilter}
                onChange={setStatusFilter}
              />
              {/*<FilterDropdown*/}
              {/*  title="Клиент"*/}
              {/*  options={uniqueClients}*/}
              {/*  selectedOptions={clientFilter}*/}
              {/*  onChange={setClientFilter}*/}
              {/*/>*/}
              {/*<FilterDropdown*/}
              {/*  title="Спонсор"*/}
              {/*  options={uniqueSponsors}*/}
              {/*  selectedOptions={sponsorFilter}*/}
              {/*  onChange={setSponsorsFilter}*/}
              {/*/>*/}
              <FilterDropdown
                title="Дата"
                options={uniqueDates}
                selectedOptions={dateFilter}
                onChange={setDateFilter}
              />
            </div>
          </div>

          <div className={`${styles.tableContainer} ${styles.desktopOnly}`}>
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("status")} className={styles.sortableHeader}>
                    <SortHeader
                      title="Статус"
                      field="status"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </th>
                  <th onClick={() => handleSort("client")} className={styles.sortableHeader}>
                    <SortHeader
                      title="Клиент"
                      field="client"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </th>
                  <th onClick={() => handleSort("sponsor")} className={styles.sortableHeader}>
                    <SortHeader
                      title="Спонсор"
                      field="sponsor"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </th>
                  <th onClick={() => handleSort("amount")} className={styles.sortableHeader}>
                    <SortHeader
                      title="Сумма"
                      field="amount"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </th>
                  <th onClick={() => handleSort("date")} className={styles.sortableHeader}>
                    <SortHeader
                      title="Дата"
                      field="date"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </th>
                  <th>Оплачено</th>
                  <th>Уведомление</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((payment) => {
                  const status = getPaymentStatus(payment)
                  return (
                    <tr
                      key={payment.dealId + payment.dueDate}
                      className={`
                        ${status === "overdue" ? styles.overdueRow : ""}
                        ${status === "today" ? styles.todayRow : ""}
                        ${status === "tomorrow" ? styles.tomorrowRow : ""}
                        ${status === "paid" ? styles.paidRow : ""}
                      `}
                    >
                      <td>
                        <span className={styles.statusBadge}>{getStatusLabel(status)}</span>
                      </td>
                      <td>{payment.clientName}</td>
                      <td>{payment.productName}</td>
                      <td>{payment.amount} ₽</td>
                      <td>{payment.dueDate}</td>
                      <td>{payment.paymentDate}</td>
                      <td>
                        <button
                          className={`${styles.actionIconBtn} ${payment.paymentDate ? styles.actionActive : ""}`}
                          onClick={() => handleMarkAsPaid(payment.dealId)}
                          title={payment.paymentDate ? "Отметить как неоплаченный" : "Отметить как оплаченный"}
                        >
                          <Check size={18} />
                        </button>
                      </td>
                      <td>
                        <button
                          className={`${styles.actionIconBtn} ${payment.isNotified ? styles.actionActive : ""}`}
                          onClick={() => handleShowNotificationModal(payment)}
                          title={payment.isNotified ? "Отправить еще уведомление" : "Отправить уведомление"}
                        >
                          <Bell size={18} />
                        </button>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => handleShowNotificationHistory(payment)}
                            title="История уведомлений"
                          >
                            <Bell size={16} />
                          </button>
                          <button className={styles.actionBtn} title="Редактировать">
                            <Edit size={16} />
                          </button>
                          <button className={styles.actionBtn} title="Удалить">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {sortedPayments.length === 0 && (
                  <tr>
                    <td colSpan={8} className={styles.noData}>
                      {searchTerm ||
                      statusFilter.length > 0 ||
                      clientFilter.length > 0 ||
                      sponsorFilter.length > 0 ||
                      dateFilter.length > 0
                        ? "Нет платежей, соответствующих фильтрам"
                        : "Нет запланированных платежей"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={`${styles.cardsContainer} ${styles.mobileOnly}`}>
            <div className={styles.sortInfo}>
              <SortDropdown
                options={sortOptions}
                currentSortField={sortField}
                currentSortDirection={sortDirection}
                onSortFieldChange={setSortField}
                onSortDirectionChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              />
            </div>

            {sortedPayments.map((payment) => {
              const status = getPaymentStatus(payment)
              return (
                <TableCard
                  key={payment.dealId + payment.dueDate}
                  data={{
                    status: getStatusLabel(status),
                    client: payment.clientName,
                    sponsor: payment.productName,
                    amount: `${payment.amount} ₽`,
                    date: payment.dueDate,
                    isPaid: payment.paymentDate,
                    isNotified: payment.isNotified,
                  }}
                  columns={[
                    {
                      key: "status",
                      title: "Статус",
                      render: (value) => (
                        <span
                          className={`${styles.statusBadge} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}
                        >
                          {value}
                        </span>
                      ),
                    },
                    { key: "client", title: "Клиент" },
                    { key: "sponsor", title: "Спонсор" },
                    { key: "amount", title: "Сумма" },
                    { key: "date", title: "Дата" },
                    {
                      key: "isPaid",
                      title: "Оплачено",
                      render: (value) => (
                        <button
                          className={`${styles.actionIconBtn} ${value ? styles.actionActive : ""}`}
                          onClick={() => handleMarkAsPaid(payment.dealId)}
                        >
                          <Check size={18} />
                        </button>
                      ),
                    },
                    {
                      key: "isNotified",
                      title: "Уведомление",
                      render: (value) => (
                        <button
                          className={`${styles.actionIconBtn} ${value ? styles.actionActive : ""}`}
                          onClick={() => handleShowNotificationModal(payment)}
                        >
                          <Bell size={18} />
                        </button>
                      ),
                    },
                  ]}
                  actions={
                    <div className={styles.cardActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleShowNotificationHistory(payment)}
                        title="История уведомлений"
                      >
                        <Bell size={16} />
                      </button>
                      <button className={styles.actionBtn} title="Редактировать">
                        <Edit size={16} />
                      </button>
                      <button className={styles.actionBtn} title="Удалить">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  }
                  className={`
                    ${status === "overdue" ? styles.overdueCard : ""}
                    ${status === "today" ? styles.todayCard : ""}
                    ${status === "tomorrow" ? styles.tomorrowCard : ""}
                    ${status === "paid" ? styles.paidCard : ""}
                  `}
                />
              )
            })}

            {sortedPayments.length === 0 && (
              <div className={styles.noDataCard}>
                {searchTerm ||
                statusFilter.length > 0 ||
                clientFilter.length > 0 ||
                sponsorFilter.length > 0 ||
                dateFilter.length > 0
                  ? "Нет платежей, соответствующих фильтрам"
                  : "Нет запланированных платежей"}
              </div>
            )}
          </div>
        </>
      )}

      {selectedView === "calendar" && (
        <div className={styles.calendarView}>
          <div className={styles.calendarPlaceholder}>
            <Calendar size={48} />
            <p>Календарь платежей будет доступен в ближайшем обновлении</p>
          </div>
        </div>
      )}

      {showNotificationHistory && selectedPayment && (
        <NotificationHistoryModal payment={selectedPayment} onClose={() => setShowNotificationHistory(false)} />
      )}

      {showNotificationTypeModal && selectedPayment && (
        <NotificationTypeModal
          onClose={() => setShowNotificationTypeModal(false)}
          onSelect={handleSendNotification}
          paymentId={selectedPayment.dealId}
          clientName={selectedPayment.clientName}
        />
      )}
    </div>
  )
}
