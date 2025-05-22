"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ExternalLink, Search } from "lucide-react"
import styles from "./clients.module.css"
import AddClientModal from "@/components/clients/add-client-modal"
import {getClients, addClient, deleteClient} from "@/lib/data-service"
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
       await getClients().then((result) => {
        setClients(result.data.data)
      })
    }

    loadClients()
  }, [])

  const handleAddClient = async (client: Client) => {
    addClient(client).then((resp) => {
      setClients([...clients, resp.data])
      setIsModalOpen(false)
    })
  }

  const handleDeleteClient = (id: number) => {
    deleteClient(id).then((resp) => {
      setClients(clients.filter(f => f.id !== id));
    })
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
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
          // ||
        // client.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // client.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // client.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // client.sponsor.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [clients, searchTerm])

  // Sort clients
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      let comparison = 0

      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === "residence") {
        comparison = a.residence.localeCompare(b.residence)
      } else if (sortField === "age") {
        comparison = a.age - b.age
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
    { field: "age", label: "Возраст" },
    { field: "residence", label: "Откуда" },
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
              <th onClick={() => handleSort("age")} className={styles.sortableHeader}>
                <SortHeader
                    title="Возраст"
                    field="age"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("residence")} className={styles.sortableHeader}>
                <SortHeader
                  title="Откуда"
                  field="residence"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.age}</td>
                <td>{client.residence}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}
                    onClick={() => handleDeleteClient(client.id)}>
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                    <Link href={`/panel/clients/${client.id}/deals`} className={styles.actionBtn}>
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </td>
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
              age: client.age,
              residence: client.residence,
            }}
            columns={[
              { key: "name", title: "Имя" },
              { key: "age", title: "Возраст" },
              { key: "residence", title: "Откуда" },
            ]}
            actions={
              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>
                  <Trash2 size={16} />
                </button>
                <button className={styles.actionBtn}>
                  <Edit size={16} />
                </button>
                <Link href={`/panel/clients/${client.id}/deals`} className={styles.actionBtn}>
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
