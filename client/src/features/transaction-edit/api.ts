import { doRequest } from '@/api'

import type { ITransaction } from '@/types'

export function useUpdateTransaction() {
  const { loading, error, data, mutate } = doRequest<
    ITransaction,
    { id: number; data: Omit<ITransaction, 'id'> }
  >('/transactions', 'put')
  return { loading, error, data, mutate }
}
