import { toRef } from 'vue'

import { doRequest, useGetRequest } from '@/api'

import type { ITransaction } from '@/types'

import { useTranscationsStore } from '@/stores/transactionsStore'

export function useGetTransactions() {
  const transactionStore = useTranscationsStore()
  const lastActionRef = toRef(transactionStore, 'lastAction')
  const { loading, error, data } = useGetRequest<ITransaction[]>(
    '/transactions',
    lastActionRef
  )

  return { loading, error, data }
}

export function useDeleteTransaction() {
  const { loading, error, data, mutate } = doRequest<ITransaction, number>(
    '/transactions',
    'delete'
  )
  return { loading, error, data, mutate }
}

export function useGetTransactionsUsers() {
  const { loading, error, data } = useGetRequest<string[]>(
    '/transactions/users'
  )
  return { loading, error, data }
}
