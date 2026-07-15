import { useGetRequest } from '@/api'

import type { ITransaction } from '@/types'

export function useGetTransaction(transactionId: number) {
  const { loading, error, data } = useGetRequest<ITransaction>(
    `/transactions/${transactionId}`
  )
  return { loading, error, data }
}
