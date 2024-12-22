export type Transaction = {
  id: number
  name: string
  type: 'sent' | 'received'
  amount: number
  date: Date
}

export type BottomTabsProps = {
  activeTab: string
  onTabChange: (tab: string) => void
  paymentRequests: Transaction[]
}

export type ActivityPageProps = {
  paymentRequests: Transaction[]
  transactions: Transaction[]
}
