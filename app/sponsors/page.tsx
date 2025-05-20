"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Trash2, Edit, Plus, ExternalLink, Search } from "lucide-react"
import styles from "./sponsors.module.css"
import {getSponsors, addSponsor, deleteSponsor} from "@/lib/data-service"
import type { Sponsor } from "@/lib/types"
import AddSponsorModal from "@/components/sponsors/add-sponsor-modal"
import TableCard from "@/components/card-view/table-card"
import SortHeader from "@/components/filter-sort/sort-header"
import SortDropdown from "@/components/filter-sort/sort-dropdown"

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    const loadSponsors = async () => {
      getSponsors().then((resp) => {
        setSponsors(resp.data.data)
      })
    }

    loadSponsors()
  }, [])

  const handleAddSponsor = async (sponsor: Sponsor) => {
    addSponsor(sponsor).then((resp) => {
      setSponsors([...sponsors, resp.data])
      setIsModalOpen(false)
    })
  }

  const handleDeleteSponsor = (sponsorId: number) => {
    deleteSponsor(sponsorId).then((resp) => {
      setSponsors(sponsors.filter(f => f.id !== sponsorId))
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

  // Filter sponsors based on search term
  const filteredSponsors = useMemo(() => {
    return sponsors.filter(
      (sponsor) =>
        sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsor.phone.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [sponsors, searchTerm])

  // Sort sponsors
  const sortedSponsors = useMemo(() => {
    return [...filteredSponsors].sort((a, b) => {
      let comparison = 0

      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === "email") {
        comparison = a.email.localeCompare(b.email)
      } else if (sortField === "phone") {
        comparison = a.phone.localeCompare(b.phone)
      } else if (sortField === "investmentAmount") {
        comparison = a.investmentAmount - b.investmentAmount
      } else if (sortField === "id") {
        comparison = a.id - b.id
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredSponsors, sortField, sortDirection])

  // Sort options for mobile dropdown
  const sortOptions = [
    { field: "id", label: "#" },
    { field: "name", label: "Имя" },
    { field: "phone", label: "Телефон" },
    { field: "email", label: "Email" },
    { field: "investmentAmount", label: "Инвестиции" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Спонсоры</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Добавить</span>
        </button>
      </div>

      <div className={styles.searchBox}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Поиск по имени, email или телефону"
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
              <th onClick={() => handleSort("phone")} className={styles.sortableHeader}>
                <SortHeader
                  title="Телефон"
                  field="phone"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("email")} className={styles.sortableHeader}>
                <SortHeader
                  title="Email"
                  field="email"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th onClick={() => handleSort("totalInvestment")} className={styles.sortableHeader}>
                <SortHeader
                  title="Инвестиции"
                  field="totalInvestment"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {sortedSponsors.map((sponsor) => (
              <tr key={sponsor.id}>
                <td>{sponsor.id}</td>
                <td>{sponsor.name}</td>
                <td>{sponsor.phone}</td>
                <td>{sponsor.email}</td>
                <td>{sponsor.investmentAmount} ₽</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => handleDeleteSponsor(sponsor.id)}>
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                    <Link href={`/sponsors/${sponsor.id}/investments`} className={styles.actionBtn}>
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {sortedSponsors.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.noData}>
                  {searchTerm ? "Спонсоры не найдены" : "Нет данных о спонсорах"}
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

        {sortedSponsors.map((sponsor) => (
          <TableCard
            key={sponsor.id}
            data={{
              id: sponsor.id,
              name: sponsor.name,
              phone: sponsor.phone,
              email: sponsor.email,
              investmentAmount: `${sponsor.investmentAmount} ₽`,
            }}
            columns={[
              { key: "name", title: "Имя" },
              { key: "phone", title: "Телефон" },
              { key: "email", title: "Email" },
              { key: "investmentAmount", title: "Инвестиции" },
            ]}
            actions={
              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>
                  <Trash2 size={16} />
                </button>
                <button className={styles.actionBtn}>
                  <Edit size={16} />
                </button>
                <Link href={`/sponsors/${sponsor.id}/investments`} className={styles.actionBtn}>
                  <ExternalLink size={16} />
                </Link>
              </div>
            }
          />
        ))}

        {sortedSponsors.length === 0 && (
          <div className={styles.noDataCard}>{searchTerm ? "Спонсоры не найдены" : "Нет данных о спонсорах"}</div>
        )}
      </div>

      {isModalOpen && <AddSponsorModal onClose={() => setIsModalOpen(false)} onSave={handleAddSponsor} />}
    </div>
  )
}
