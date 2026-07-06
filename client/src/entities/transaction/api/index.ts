import { type ComputedRef, computed, toRef } from 'vue'

import { doRequest, useGetRequest } from '@/api'

import type { ITransaction } from '@/types'

import { useTranscationsStore } from '../store'

export function useGetTransactions(selectedUsername: ComputedRef<string>) {
  const transactionStore = useTranscationsStore()
  const lastActionRef = toRef(transactionStore, 'lastAction')
  const url = computed(() =>
    selectedUsername.value
      ? `/transactions?username=${selectedUsername.value}`
      : '/transactions'
  )
  const { loading, error, data } = useGetRequest<ITransaction[]>(url, {
    watchTo: lastActionRef
  })

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
