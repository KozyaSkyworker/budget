export type TTransactionType = 'Пополнение' | 'Списание'
// export type TTransactionCategory = '' | ''

export interface ITransaction {
  id: number
  title: string
  date: string
  type: TTransactionType
  category: string // пока что 'Подписка'...
  amount: number
  user: string // TODO: user {}
  comment?: string
}
