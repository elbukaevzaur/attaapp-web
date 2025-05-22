"use client"

import { useState, useEffect } from "react"
import {
  Trash2,
  Edit,
  FolderOpen,
  Settings,
  Plus,
  BarChart2,
  LineChart,
  PieChart,
  Search,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import styles from "./reports.module.css"
import { getReports, deleteReport } from "@/src/lib/data-service"
import type { Report } from "@/src/lib/types"
import TableCard from "@/src/components/card-view/table-card"
import ReportModal from "@/src/components/reports/report-modal"
import ReportViewModal from "@/src/components/reports/report-view-modal"
import SortHeader from "@/src/components/filter-sort/sort-header"

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    const loadReports = async () => {
      const data = await getReports()
      setReports(data)
    }

    loadReports()
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDeleteReport = async (id: number) => {
    const success = await deleteReport(id)
    if (success) {
      setReports(reports.filter((report) => report.id !== id))
    }
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsViewModalOpen(true)
  }

  const handleEditReport = (report: Report) => {
    setSelectedReport(report)
    setIsAddModalOpen(true)
  }

  const getChartIcon = (type?: string) => {
    switch (type) {
      case "bar":
        return <BarChart2 size={16} />
      case "line":
        return <LineChart size={16} />
      case "pie":
      case "doughnut":
        return <PieChart size={16} />
      default:
        return <BarChart2 size={16} />
    }
  }

  // Filter reports based on search term
  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    let comparison = 0

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "entity") {
      comparison = a.entity.localeCompare(b.entity)
    } else if (sortField === "type") {
      comparison = a.type.localeCompare(b.type)
    } else if (sortField === "updatedAt") {
      const dateA = a.updatedAt ? new Date(a.updatedAt.split(".").reverse().join("-")) : new Date(0)
      const dateB = b.updatedAt ? new Date(b.updatedAt.split(".").reverse().join("-")) : new Date(0)
      comparison = dateA.getTime() - dateB.getTime()
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Отчеты</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedReport(null)
            setIsAddModalOpen(true)
          }}
        >
          <Plus size={16} />
          <span>Добавить отчет</span>
        </button>
      </div>

      <div className={styles.searchBox}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Поиск по названию, типу или сущности"
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
              <th onClick={() => handleSort("name")} className={styles.sortableHeader}>
                <SortHeader
                  title="Название"
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
              <th onClick={() => handleSort("type")} className={styles.sortableHeader}>
                <SortHeader
                  title="Тип"
                  field="type"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th>На главной</th>
              <th>В верхнем меню</th>
              <th onClick={() => handleSort("updatedAt")} className={styles.sortableHeader}>
                <SortHeader
                  title="Обновлен"
                  field="updatedAt"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th>Тип графика</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => handleDeleteReport(report.id)} title="Удалить">
                      <Trash2 size={16} />
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleEditReport(report)} title="Редактировать">
                      <Edit size={16} />
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleViewReport(report)} title="Просмотр">
                      <FolderOpen size={16} />
                    </button>
                    <button className={styles.actionBtn} title="Настройки">
                      <Settings size={16} />
                    </button>
                  </div>
                </td>
                <td>{report.name}</td>
                <td>{report.entity}</td>
                <td>{report.type}</td>
                <td>{report.showOnMain ? "Да" : "Нет"}</td>
                <td>{report.showInTopMenu ? "Да" : "Нет"}</td>
                <td>{report.updatedAt || "—"}</td>
                <td>
                  <div className={styles.chartType}>
                    {getChartIcon(report.chartType)}
                    <span>{report.chartType || "Нет"}</span>
                  </div>
                </td>
              </tr>
            ))}
            {sortedReports.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.noData}>
                  {searchTerm ? "Отчеты не найдены" : "Нет данных об отчетах"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={`${styles.cardsContainer} ${styles.mobileOnly}`}>
        <div className={styles.sortInfo}>
          <span>
            Сортировка:{" "}
            {sortField === "name"
              ? "Название"
              : sortField === "entity"
                ? "Сущность"
                : sortField === "type"
                  ? "Тип"
                  : "Обновлен"}
          </span>
          <button
            className={styles.sortDirectionBtn}
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          >
            {sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
        </div>

        {sortedReports.map((report) => (
          <TableCard
            key={report.id}
            data={{
              name: report.name,
              entity: report.entity,
              type: report.type,
              showOnMain: report.showOnMain ? "Да" : "Нет",
              showInTopMenu: report.showInTopMenu ? "Да" : "Нет",
              updatedAt: report.updatedAt || "—",
              chartType: report.chartType || "Нет",
            }}
            columns={[
              { key: "name", title: "Название" },
              { key: "entity", title: "Сущность" },
              { key: "type", title: "Тип" },
              { key: "showOnMain", title: "На главной" },
              { key: "showInTopMenu", title: "В верхнем меню" },
              { key: "updatedAt", title: "Обновлен" },
              {
                key: "chartType",
                title: "Тип графика",
                render: (value) => (
                  <div className={styles.chartType}>
                    {getChartIcon(report.chartType)}
                    <span>{value}</span>
                  </div>
                ),
              },
            ]}
            actions={
              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => handleDeleteReport(report.id)} title="Удалить">
                  <Trash2 size={16} />
                </button>
                <button className={styles.actionBtn} onClick={() => handleEditReport(report)} title="Редактировать">
                  <Edit size={16} />
                </button>
                <button className={styles.actionBtn} onClick={() => handleViewReport(report)} title="Просмотр">
                  <FolderOpen size={16} />
                </button>
                <button className={styles.actionBtn} title="Настройки">
                  <Settings size={16} />
                </button>
              </div>
            }
            onClick={() => handleViewReport(report)}
          />
        ))}

        {sortedReports.length === 0 && (
          <div className={styles.noDataCard}>{searchTerm ? "Отчеты не найдены" : "Нет данных об отчетах"}</div>
        )}
      </div>

      {isAddModalOpen && (
        <ReportModal
          report={selectedReport}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(updatedReport) => {
            if (selectedReport) {
              setReports(reports.map((r) => (r.id === selectedReport.id ? updatedReport : r)))
            } else {
              setReports([...reports, updatedReport])
            }
            setIsAddModalOpen(false)
          }}
        />
      )}

      {isViewModalOpen && selectedReport && (
        <ReportViewModal report={selectedReport} onClose={() => setIsViewModalOpen(false)} />
      )}
    </div>
  )
}
