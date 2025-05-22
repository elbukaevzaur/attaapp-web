export interface Client {
  id: number
  name: string
  age: number
  residence: string
}

export interface Report {
  id: number
  name: string
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
}

export interface Investment {
  id: number
  sponsorId?: number
  amount: string
  dateFrom: string
  dateTo: string
  percentage: number
}

export interface InvestmentStats {
  id: number
  amount?: number
  dateFrom: string
  dateTo: string
  percentage: number
  totalDeals: number
  totalPayments: number
  totalProfit: number
  totalInvestorProfit: number
  totalMoyProfit: number
  totalInvestmentReturn: number
  returnOfInvestmentPercentage: number
}

export interface Deal {
  id: number
  productName: string
  productOrigin: string
  buyPrice: number
  price: number
  deposit: number
  clientId?: number
  clientName: string
  sponsorId?: number
  investmentId?: number
  sponsorName?: string
  registrationDate: string
  paymentDay: number
  monthsCount: number
}

export interface Payment {
  id: number
  clientId: number
  dealId: number
  paymentDate: string
  amount: number
  balance: number
}

export interface ScheduledPayment {
  id: number,
  dealId: number
  productName: string
  clientId: number
  clientName: string
  dueDate: string
  amount: number
  status: string
  paymentDate: string
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
