import { useGetRequest } from '@/api'

import type { ITransaction } from '@/types'

export function useGetTransactions() {
  const { loading, error, data } =
    useGetRequest<ITransaction[]>('/transactions')
  return { loading, error, data }
}
