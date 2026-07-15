import { doRequest } from '@/api'

import type { ITransaction } from '@/types'

export function useDeleteTransaction() {
  const { loading, error, data, mutate } = doRequest<ITransaction, number>(
    '/transactions',
    'delete'
  )
  return { loading, error, data, mutate }
}
