export interface Client {
  id: number
  name: string
  entity: string
  product: string
  source: string
  price: number
  contribution: number
  sponsor: string
}

export interface Report {
  id: number
  name: string
  entity: string
  type: string
  showOnMain: boolean
  showInMenu: boolean
  showInTopMenu: boolean
  hideRecordsCount: boolean
  hideCounterIfEmpty: boolean
  showAsCounterOnMain: boolean
  autoUpdate: boolean
  description?: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  chartType?: "bar" | "line" | "pie" | "doughnut" | "radar"
  dataSource?: string
}

export interface Sponsor {
  id: number
  name: string
  phone: string
  email: string
  totalInvestment: number
}

export interface Investment {
  id: number
  sponsorId?: number
  amount: string
  startDate: string
  endDate: string
  percentage: number
  entity: string
}

export interface Deal {
  id: number
  clientId?: number
  clientName: string
  entity: string
  product: string
  source: string
  price: number
  contribution: number
  investor: string
  registrationDate: string
  monthsCount: number
  payment: number
}

export interface Payment {
  id: number
  clientId: number
  dealId: number
  date: string
  amount: number
  balance: number
}

export interface ScheduledPayment {
  id: number
  client: string
  sponsor: string
  amount: number
  date: string
  isPaid: boolean
  isNotified: boolean
  notificationHistory?: NotificationRecord[]
}

export interface NotificationRecord {
  id: number
  paymentId: number
  date: string
  type: string
  message: string
  user: string
}

export interface ReportData {
  id: number
  reportId: number
  data: any
  createdAt: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
}
