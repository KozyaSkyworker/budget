import { doRequest } from '@/api'

import type { ITransaction } from '@/types'

export function useCreateTransaction() {
  const { loading, error, data, mutate } = doRequest<
    ITransaction,
    Omit<ITransaction, 'id'>
  >('/transactions', 'post')
  return { loading, error, data, mutate }
}
