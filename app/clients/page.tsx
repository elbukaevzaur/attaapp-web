"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ExternalLink, Search } from "lucide-react"
import styles from "./clients.module.css"
import AddClientModal from "@/components/clients/add-client-modal"
import { getClients, addClient } from "@/lib/data-service"
import type { Client } from "@/lib/types"
import TableCard from "@/components/card-view/table-card"
import SortHeader from "@/components/filter-sort/sort-header"
import SortDropdown from "@/components/filter-sort/sort-dropdown"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    const loadClients = async () => {
      const data = await getClients()
      setClients(data)
    }

    loadClients()
  }, [])

  const handleAddClient = async (client: Client) => {
    const updatedClients = await addClient(client)
    setClients(updatedClients)
    setIsModalOpen(false)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter clients based on search term
  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.sponsor.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [clients, searchTerm])

  // Sort clients
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      let comparison = 0

      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === "entity") {
        comparison = a.entity.localeCompare(b.entity)
      } else if (sortField === "product") {
        comparison = a.product.localeCompare(b.product)
      } else if (sortField === "source") {
        comparison = a.source.localeCompare(b.source)
      } else if (sortField === "price") {
        comparison = a.price - b.price
      } else if (sortField === "contribution") {
        comparison = a.contribution - b.contribution
      } else if (sortField === "sponsor") {
        comparison = a.sponsor.localeCompare(b.sponsor)
      } else if (sortField === "id") {
        comparison = a.id - b.id
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredClients, sortField, sortDirection])

  // Sort options for mobile dropdown
  const sortOptions = [
    { field: "id", label: "#" },
    { field: "name", label: "Имя" },
    { field: "entity", label: "Сущность" },
    { field: "product", label: "Товар" },
    { field: "source", label: "Откуда" },
    { field: "price", label: "Цена" },
    { field: "contribution", label: "Взнос" },
    { field: "sponsor", label: "Спонсор" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Клиенты</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Добавить</span>
        </button>
      </div>

      <div className={styles.searchBox}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Поиск по имени, товару, спонсору..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className={styles.clearSearch} onClick={() => setSearchTerm("")}>
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className={`${styles.tableContainer} ${styles.desktopOnly}`}>
        <table className="table">
          <thead>
            <tr>
              <th>Действие</th>
              <th onClick={() => handleSort("id")} className={styles.sortableHeader}>
                <SortHeader
                  title="#"
                  field="id"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("name")} className={styles.sortableHeader}>
                <SortHeader
                  title="Имя"
                  field="name"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("entity")} className={styles.sortableHeader}>
                <SortHeader
                  title="Сущность"
                  field="entity"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("product")} className={styles.sortableHeader}>
                <SortHeader
                  title="Наимен. товара"
                  field="product"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("source")} className={styles.sortableHeader}>
                <SortHeader
                  title="Откуда"
                  field="source"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("price")} className={styles.sortableHeader}>
                <SortHeader
                  title="Цена"
                  field="price"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("contribution")} className={styles.sortableHeader}>
                <SortHeader
                  title="Взнос"
                  field="contribution"
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
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                    <Link href={`/clients/${client.id}/deals`} className={styles.actionBtn}>
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </td>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.entity}</td>
                <td>{client.product}</td>
                <td>{client.source}</td>
                <td>{client.price} ₽</td>
                <td>{client.contribution} ₽</td>
                <td>{client.sponsor}</td>
              </tr>
            ))}
            {sortedClients.length === 0 && (
              <tr>
                <td colSpan={9} className={styles.noData}>
                  {searchTerm ? "Клиенты не найдены" : "Нет данных о клиентах"}
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

        {sortedClients.map((client) => (
          <TableCard
            key={client.id}
            data={{
              id: client.id,
              name: client.name,
              entity: client.entity,
              product: client.product,
              source: client.source,
              price: `${client.price} ₽`,
              contribution: `${client.contribution} ₽`,
              sponsor: client.sponsor,
            }}
            columns={[
              { key: "name", title: "Имя" },
              { key: "product", title: "Товар" },
              { key: "price", title: "Цена" },
              { key: "contribution", title: "Взнос" },
              { key: "sponsor", title: "Спонсор" },
            ]}
            actions={
              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>
                  <Trash2 size={16} />
                </button>
                <button className={styles.actionBtn}>
                  <Edit size={16} />
                </button>
                <Link href={`/clients/${client.id}/deals`} className={styles.actionBtn}>
                  <ExternalLink size={16} />
                </Link>
              </div>
            }
          />
        ))}

        {sortedClients.length === 0 && (
          <div className={styles.noDataCard}>{searchTerm ? "Клиенты не найдены" : "Нет данных о клиентах"}</div>
        )}
      </div>

      {isModalOpen && <AddClientModal onClose={() => setIsModalOpen(false)} onSave={handleAddClient} />}
    </div>
  )
}
