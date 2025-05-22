import type { Client, Report, Sponsor, Investment, Deal, Payment, ScheduledPayment, NotificationRecord } from "./types"
import axiosInstance from "@/src/lib/http/axiosInstance";
import {AxiosResponse} from "axios";

// Mock data
const clients: Client[] = [
  {
    id: 370,
    name: "Умалатов Рамзан Дениевич",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    sponsor: "Халидов Б.Г.",
  },
  {
    id: 380,
    name: "Шарпудиев Магомед Хасанович",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    sponsor: "Халидов Б.Г.",
  },
  {
    id: 390,
    name: "Хамстханов Лом-Али Асланбекович",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    sponsor: "Халидов Б.Г.",
  },
]

const reports: Report[] = [
  {
    id: 1,
    name: "Отчет по сделкам",
    entity: "Сделки",
    type: "По умолчанию",
    showOnMain: true,
    showInMenu: true,
    showInTopMenu: false,
    hideRecordsCount: false,
    hideCounterIfEmpty: true,
    showAsCounterOnMain: true,
    autoUpdate: false,
    description: "Сводная информация по всем сделкам",
    createdAt: "01.01.2024",
    updatedAt: "15.05.2024",
    createdBy: "Ибрагим Мусаевич",
    chartType: "bar",
    dataSource: "deals",
  },
  {
    id: 2,
    name: "Отчет по клиентам",
    entity: "Клиенты",
    type: "Счетчик",
    showOnMain: true,
    showInMenu: true,
    showInTopMenu: true,
    hideRecordsCount: false,
    hideCounterIfEmpty: false,
    showAsCounterOnMain: false,
    autoUpdate: true,
    description: "Статистика по клиентам",
    createdAt: "05.01.2024",
    updatedAt: "10.05.2024",
    createdBy: "Ибрагим Мусаевич",
    chartType: "pie",
    dataSource: "clients",
  },
  {
    id: 3,
    name: "Финансовый отчет",
    entity: "Сделки",
    type: "По умолчанию",
    showOnMain: true,
    showInMenu: true,
    showInTopMenu: true,
    hideRecordsCount: false,
    hideCounterIfEmpty: false,
    showAsCounterOnMain: false,
    autoUpdate: true,
    description: "Финансовые показатели по сделкам",
    createdAt: "10.01.2024",
    updatedAt: "12.05.2024",
    createdBy: "Ибрагим Мусаевич",
    chartType: "line",
    dataSource: "payments",
  },
  {
    id: 4,
    name: "Отчет по спонсорам",
    entity: "Спонсоры",
    type: "По умолчанию",
    showOnMain: false,
    showInMenu: true,
    showInTopMenu: false,
    hideRecordsCount: false,
    hideCounterIfEmpty: true,
    showAsCounterOnMain: false,
    autoUpdate: false,
    description: "Информация по инвестициям спонсоров",
    createdAt: "15.01.2024",
    updatedAt: "05.05.2024",
    createdBy: "Ибрагим Мусаевич",
    chartType: "bar",
    dataSource: "investments",
  },
  {
    id: 5,
    name: "Отчет по платежам",
    entity: "Платежи",
    type: "Счетчик",
    showOnMain: true,
    showInMenu: true,
    showInTopMenu: false,
    hideRecordsCount: false,
    hideCounterIfEmpty: false,
    showAsCounterOnMain: true,
    autoUpdate: true,
    description: "График платежей и статистика",
    createdAt: "20.01.2024",
    updatedAt: "01.05.2024",
    createdBy: "Ибрагим Мусаевич",
    chartType: "line",
    dataSource: "payments",
  },
]

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Халидов Б.Г.",
    phone: "+7 (999) 123-45-67",
    email: "khalidov@example.com",
    totalInvestment: 1000000,
  },
  {
    id: 2,
    name: "Абасов Т.В.",
    phone: "+7 (999) 987-65-43",
    email: "abasov@example.com",
    totalInvestment: 500000,
  },
]

const investments: Investment[] = [
  {
    id: 3701,
    sponsorId: 1,
    amount: "1 000 000",
    startDate: "12.01.24",
    endDate: "12.01.25",
    percentage: 20,
    entity: "Сделки",
  },
  {
    id: 3702,
    sponsorId: 1,
    amount: "200 000",
    startDate: "10.02.25",
    endDate: "10.06.25",
    percentage: 20,
    entity: "Сделки",
  },
  {
    id: 3703,
    sponsorId: 2,
    amount: "350 000",
    startDate: "04.11.25",
    endDate: "01.04.26",
    percentage: 20,
    entity: "Сделки",
  },
]

const deals: Deal[] = [
  {
    id: 370,
    clientId: 370,
    clientName: "Умалатов Рамзан Дениевич",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    investor: "Халидов Б.Г.",
    registrationDate: "2024-01-15",
    monthsCount: 6,
    payment: 99000,
  },
  {
    id: 380,
    clientId: 380,
    clientName: "Шарпудиев Магомед Хасанович",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    investor: "Халидов Б.Г.",
    registrationDate: "2024-02-10",
    monthsCount: 6,
    payment: 99000,
  },
  {
    id: 390,
    clientId: 390,
    clientName: "Хамстханов Лом-Али Асланбекович",
    entity: "Сделки",
    product: "Iphone 16 pro max",
    source: "App store",
    price: 129000,
    contribution: 30000,
    investor: "Халидов Б.Г.",
    registrationDate: "2024-03-05",
    monthsCount: 6,
    payment: 99000,
  },
]

const payments: Payment[] = [
  {
    id: 1,
    clientId: 370,
    dealId: 370,
    date: "2024-01-20",
    amount: 30000,
    balance: 99000,
  },
  {
    id: 2,
    clientId: 380,
    dealId: 380,
    date: "2024-02-15",
    amount: 30000,
    balance: 99000,
  },
  {
    id: 3,
    clientId: 390,
    dealId: 390,
    date: "2024-03-10",
    amount: 30000,
    balance: 99000,
  },
]

const scheduledPayments: ScheduledPayment[] = [
  {
    id: 1,
    client: "Умалатов Рамзан Дениевич",
    sponsor: "Халидов Б.Г.",
    amount: 30000,
    date: "01.12.2024",
    isPaid: false,
    isNotified: true,
  },
  {
    id: 2,
    client: "Шарпудиев Магомед Хасанович",
    sponsor: "Халидов Б.Г.",
    amount: 30000,
    date: new Date().toLocaleDateString("ru-RU"),
    isPaid: false,
    isNotified: false,
  },
  {
    id: 3,
    client: "Хамстханов Лом-Али Асланбекович",
    sponsor: "Абасов Т.В.",
    amount: 30000,
    date: "01.11.2024",
    isPaid: true,
    isNotified: true,
  },
  {
    id: 4,
    client: "Абасов Тамерлан Вахаевич",
    sponsor: "Халидов Б.Г.",
    amount: 25000,
    date: (() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toLocaleDateString("ru-RU")
    })(),
    isPaid: false,
    isNotified: true,
  },
  {
    id: 5,
    client: "Ханпашев Амруди Висханович",
    sponsor: "Абасов Т.В.",
    amount: 40000,
    date: "15.10.2024",
    isPaid: false,
    isNotified: false,
  },
]

const notificationHistory: NotificationRecord[] = [
  {
    id: 1,
    paymentId: 1,
    date: "28.11.2024 14:30",
    type: "SMS",
    message: "Напоминаем о платеже 30 000 ₽ 01.12.2024",
    user: "Система",
  },
  {
    id: 2,
    paymentId: 1,
    date: "30.11.2024 10:15",
    type: "Звонок",
    message: "Клиент подтвердил оплату на завтра",
    user: "Ибрагим Мусаевич",
  },
  {
    id: 3,
    paymentId: 4,
    date: "01.12.2024 09:45",
    type: "WhatsApp",
    message: "Отправлено напоминание о платеже",
    user: "Система",
  },
]

// Clients
export async function getClients(): Promise<AxiosResponse> {
  return  axiosInstance.get('/clients');
}

export async function getClientById(id: number): Promise<AxiosResponse> {
  return  axiosInstance.get(`/clients/${id}`);
}

export async function addClient(client: Client): Promise<AxiosResponse> {
  return axiosInstance.post('/clients', client);
}

export async function deleteClient(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`/clients/${id}`);
}

// Reports
export async function getReports(): Promise<Report[]> {
  return [...reports]
}

export async function getReportById(id: number): Promise<Report | null> {
  return reports.find((report) => report.id === id) || null
}

export async function addReport(report: Report): Promise<Report[]> {
  reports.push(report)
  return [...reports]
}

export async function updateReport(id: number, updatedReport: Partial<Report>): Promise<Report | null> {
  const reportIndex = reports.findIndex((report) => report.id === id)
  if (reportIndex === -1) return null

  reports[reportIndex] = {
    ...reports[reportIndex],
    ...updatedReport,
    updatedAt: new Date().toLocaleDateString("ru-RU"),
  }
  return reports[reportIndex]
}

export async function deleteReport(id: number): Promise<boolean> {
  const reportIndex = reports.findIndex((report) => report.id === id)
  if (reportIndex === -1) return false

  reports.splice(reportIndex, 1)
  return true
}

// Sponsors
export async function getSponsors(): Promise<AxiosResponse> {
  return axiosInstance.get('/sponsors')
}

export async function deleteSponsor(sponsorId: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`/sponsors/${sponsorId}`)
}

export async function getSponsorById(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/sponsors/${id}`)
}

export async function addSponsor(sponsor: Sponsor): Promise<AxiosResponse> {
  return  axiosInstance.post('/sponsors', sponsor);
}

// Investments

export async function getSponsorInvestmentsStat(sponsorId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/investments/sponsor/statistics?sponsorId=${sponsorId}`)
}

export async function getInvestmentsStat(investmentId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/investments/statistics?investmentId=${investmentId}`)
}

export async function deleteInvestment(investmentId: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`/investments/${investmentId}`)
}

export async function addInvestment(investment: Investment): Promise<AxiosResponse> {
  return axiosInstance.post('/investments', investment);
}

// Deals
export async function getDeals(): Promise<Deal[]> {
  return [...deals]
}

export async function getDealById(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/deals/${id}`)
}

export async function getClientDeals(clientId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/deals?clientId=${clientId}`)
  // return axiosInstance.get(`/deals?clientId=${clientId}`)
}

export async function createDeal(deal: Deal): Promise<AxiosResponse> {
  return axiosInstance.post(`/deals`, deal);
}

export async function getDealPayments(dealId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/deal-payments?dealId=${dealId}`)
}

export async function createDealPayment(payment: Payment): Promise<AxiosResponse> {
  return axiosInstance.post(`/deal-payments`, payment)
}

export async function deleteDealPayment(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`/deal-payments/${id}`)
}

// Payment Schedule
export async function getPaymentSchedule(body: {startDate: string, endDate: string}): Promise<AxiosResponse> {
  return axiosInstance.post(`/payment-schedule`, body);
}

export async function getScheduledPayments(): Promise<ScheduledPayment[]> {
  return [...scheduledPayments]
}

export async function markPaymentAsPaid(id: number): Promise<ScheduledPayment[]> {
  const payment = scheduledPayments.find((p) => p.id === id)
  if (payment) {
    payment.isPaid = !payment.isPaid
  }
  return [...scheduledPayments]
}

export async function markPaymentAsNotified(
  id: number,
  type = "Система",
  message = "Клиент уведомлен о платеже",
): Promise<ScheduledPayment[]> {
  const payment = scheduledPayments.find((p) => p.id === id)
  if (payment) {
    payment.isNotified = true

    // Add notification record
    notificationHistory.push({
      id: notificationHistory.length + 1,
      paymentId: id,
      date: new Date().toLocaleString("ru-RU"),
      type,
      message,
      user: "Ибрагим Мусаевич",
    })
  }
  return [...scheduledPayments]
}

export async function getNotificationHistory(paymentId: number): Promise<NotificationRecord[]> {
  return notificationHistory.filter((record) => record.paymentId === paymentId)
}
