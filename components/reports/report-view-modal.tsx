"use client"

import type React from "react"

import { useState } from "react"
import { X, Download, Share2, Printer } from "lucide-react"
import styles from "./report-view-modal.module.css"
import type { Report, ChartData } from "@/lib/types"
import { LineChart, PieChart } from "lucide-react"

interface ReportViewModalProps {
  report: Report
  onClose: () => void
}

const ReportViewModal: React.FC<ReportViewModalProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart")

  // Mock chart data based on report type
  const getChartData = (): ChartData => {
    if (report.dataSource === "deals") {
      return {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        datasets: [
          {
            label: "Сделки",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#4285f4",
            borderColor: "#4285f4",
            borderWidth: 1,
          },
        ],
      }
    } else if (report.dataSource === "clients") {
      return {
        labels: ["Новые", "Активные", "Неактивные"],
        datasets: [
          {
            label: "Клиенты",
            data: [30, 50, 20],
            backgroundColor: ["#4285f4", "#34a853", "#fbbc05"],
            borderColor: ["#4285f4", "#34a853", "#fbbc05"],
            borderWidth: 1,
          },
        ],
      }
    } else if (report.dataSource === "payments") {
      return {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        datasets: [
          {
            label: "Платежи",
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: "#34a853",
            borderColor: "#34a853",
            borderWidth: 1,
          },
        ],
      }
    } else {
      return {
        labels: ["Категория 1", "Категория 2", "Категория 3", "Категория 4", "Категория 5"],
        datasets: [
          {
            label: "Данные",
            data: [12, 19, 3, 5, 2],
            backgroundColor: ["#4285f4", "#34a853", "#fbbc05", "#ea4335", "#673ab7"],
            borderColor: ["#4285f4", "#34a853", "#fbbc05", "#ea4335", "#673ab7"],
            borderWidth: 1,
          },
        ],
      }
    }
  }

  // Mock table data
  const getTableData = () => {
    if (report.dataSource === "deals") {
      return [
        { id: 1, client: "Умалатов Р.Д.", product: "Iphone 16 pro max", price: 129000, date: "15.01.2024" },
        { id: 2, client: "Шарпудиев М.Х.", product: "Iphone 16 pro max", price: 129000, date: "10.02.2024" },
        { id: 3, client: "Хамстханов Л.А.", product: "Iphone 16 pro max", price: 129000, date: "05.03.2024" },
        { id: 4, client: "Абасов Т.В.", product: "Samsung Galaxy S24", price: 110000, date: "20.03.2024" },
        { id: 5, client: "Ханпашев А.В.", product: "MacBook Pro", price: 210000, date: "15.04.2024" },
      ]
    } else if (report.dataSource === "clients") {
      return [
        { id: 370, name: "Умалатов Р.Д.", deals: 2, totalAmount: 258000, status: "Активный" },
        { id: 380, name: "Шарпудиев М.Х.", deals: 1, totalAmount: 129000, status: "Активный" },
        { id: 390, name: "Хамстханов Л.А.", deals: 3, totalAmount: 387000, status: "Активный" },
        { id: 400, name: "Абасов Т.В.", deals: 1, totalAmount: 110000, status: "Новый" },
        { id: 410, name: "Ханпашев А.В.", deals: 2, totalAmount: 339000, status: "Активный" },
      ]
    } else if (report.dataSource === "payments") {
      return [
        { id: 1, client: "Умалатов Р.Д.", date: "20.01.2024", amount: 30000, balance: 99000 },
        { id: 2, client: "Шарпудиев М.Х.", date: "15.02.2024", amount: 30000, balance: 99000 },
        { id: 3, client: "Хамстханов Л.А.", date: "10.03.2024", amount: 30000, balance: 99000 },
        { id: 4, client: "Абасов Т.В.", date: "25.03.2024", amount: 25000, balance: 85000 },
        { id: 5, client: "Ханпашев А.В.", date: "15.04.2024", amount: 40000, balance: 170000 },
      ]
    } else {
      return [
        { id: 1, name: "Элемент 1", value: 12, category: "Категория 1" },
        { id: 2, name: "Элемент 2", value: 19, category: "Категория 2" },
        { id: 3, name: "Элемент 3", value: 3, category: "Категория 3" },
        { id: 4, name: "Элемент 4", value: 5, category: "Категория 4" },
        { id: 5, name: "Элемент 5", value: 2, category: "Категория 5" },
      ]
    }
  }

  const chartData = getChartData()
  const tableData = getTableData()

  // Render chart based on type
  const renderChart = () => {
    if (report.chartType === "bar") {
      return (
        <div className={styles.chartContainer}>
          <div className={styles.barChart}>
            {chartData.datasets[0].data.map((value, index) => (
              <div key={index} className={styles.barChartColumn}>
                <div
                  className={styles.barChartBar}
                  style={{
                    height: `${(value / Math.max(...chartData.datasets[0].data)) * 200}px`,
                    backgroundColor: Array.isArray(chartData.datasets[0].backgroundColor)
                      ? chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length]
                      : chartData.datasets[0].backgroundColor,
                  }}
                ></div>
                <div className={styles.barChartLabel}>{chartData.labels[index]}</div>
              </div>
            ))}
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{
                  backgroundColor: Array.isArray(chartData.datasets[0].backgroundColor)
                    ? chartData.datasets[0].backgroundColor[0]
                    : chartData.datasets[0].backgroundColor,
                }}
              ></div>
              <span>{chartData.datasets[0].label}</span>
            </div>
          </div>
        </div>
      )
    } else if (report.chartType === "line") {
      return (
        <div className={styles.chartContainer}>
          <div className={styles.lineChart}>
            <div className={styles.lineChartPlaceholder}>
              <LineChart size={48} />
              <p>Линейный график для {report.name}</p>
            </div>
          </div>
        </div>
      )
    } else if (report.chartType === "pie") {
      return (
        <div className={styles.chartContainer}>
          <div className={styles.pieChart}>
            <div className={styles.pieChartPlaceholder}>
              <PieChart size={48} />
              <p>Круговой график для {report.name}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  // Render table based on data source
  const renderTable = () => {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key === "id" ? "#" : key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="modal-backdrop">
      <div className={`modal ${styles.reportViewModal}`}>
        <div className="modal-header">
          <h2>{report.name}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.reportInfo}>
          <div className={styles.reportDetail}>
            <span className={styles.reportDetailLabel}>Сущность:</span>
            <span className={styles.reportDetailValue}>{report.entity}</span>
          </div>
          <div className={styles.reportDetail}>
            <span className={styles.reportDetailLabel}>Тип:</span>
            <span className={styles.reportDetailValue}>{report.type}</span>
          </div>
          <div className={styles.reportDetail}>
            <span className={styles.reportDetailLabel}>Обновлен:</span>
            <span className={styles.reportDetailValue}>{report.updatedAt || "—"}</span>
          </div>
        </div>

        {report.description && <div className={styles.reportDescription}>{report.description}</div>}

        <div className={styles.reportTabs}>
          <button
            className={`${styles.reportTab} ${activeTab === "chart" ? styles.active : ""}`}
            onClick={() => setActiveTab("chart")}
          >
            График
          </button>
          <button
            className={`${styles.reportTab} ${activeTab === "table" ? styles.active : ""}`}
            onClick={() => setActiveTab("table")}
          >
            Таблица
          </button>
        </div>

        <div className={styles.reportContent}>{activeTab === "chart" ? renderChart() : renderTable()}</div>

        <div className={styles.reportActions}>
          <button className={styles.reportAction}>
            <Download size={16} />
            <span>Экспорт</span>
          </button>
          <button className={styles.reportAction}>
            <Share2 size={16} />
            <span>Поделиться</span>
          </button>
          <button className={styles.reportAction}>
            <Printer size={16} />
            <span>Печать</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportViewModal
