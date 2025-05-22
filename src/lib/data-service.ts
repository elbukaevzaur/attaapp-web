import type { Client, Report, Sponsor, Investment, Deal, Payment, ScheduledPayment, NotificationRecord } from "./types"
import axiosInstance from "@/lib/http/axiosInstance";
import {AxiosResponse} from "axios";

const reports: Report[] = [
  {
    id: 1,
    name: "Отчет по сделкам",
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
  },
  {
    id: 2,
    name: "Абасов Т.В.",
    phone: "+7 (999) 987-65-43",
    email: "abasov@example.com",
  },
]

const scheduledPayments: ScheduledPayment[] = [
  {
    id: 1,
    dealId: 1,
    productName: 'ttt',
    clientId: 1,
    clientName: "Умалатов Рамзан Дениевич",
    amount: 30000,
    dueDate: "01.12.2024",
    paymentDate: "01.12.2024",
    status: 'START',
    isNotified: true,
    notificationHistory: []
  }
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

export async function addInvestment(investment: Investment): Promise<AxiosResponse> {
  return axiosInstance.post('/investments', investment);
}

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


export async function deleteReport(id: number): Promise<boolean> {
  const reportIndex = reports.findIndex((report) => report.id === id)
  if (reportIndex === -1) return false

  reports.splice(reportIndex, 1)
  return true
}

export async function getDealById(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/deals/${id}`)
}

export async function getSponsorInvestmentsStat(sponsorId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/investments/sponsor/statistics?sponsorId=${sponsorId}`)
}

export async function getInvestmentsStat(investmentId: number): Promise<AxiosResponse> {
  return axiosInstance.get(`/investments/statistics?investmentId=${investmentId}`)
}

export async function deleteInvestment(investmentId: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`/investments/${investmentId}`)
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

export async function markPaymentAsPaid(id: number): Promise<ScheduledPayment[]> {
  const payment = scheduledPayments.find((p) => p.id === id)
  if (payment) {
    // payment.isPisPaidaid = !payment.isPaid
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

export async function getNotificationHistory(paymentId: number): Promise<NotificationRecord[]> {
  return notificationHistory.filter((record) => record.paymentId === paymentId)
}
