import { type ComputedRef, computed, toRef } from 'vue'

import { doRequest, useGetRequest } from '@/api'

import type { ITransaction, ITransactionDTO } from '@/types'

import { useTranscationsStore } from '../store'

export function useGetTransactions(
  selectedUsername: ComputedRef<string>,
  selectedSort: ComputedRef<string>
) {
  const transactionStore = useTranscationsStore()
  const lastActionRef = toRef(transactionStore, 'lastAction')
  const url = computed(() => {
    const url = new URL(`/transactions`, 'http://localhost:3000')

    if (selectedSort.value) {
      url.searchParams.set('sort', selectedSort.value)
    }
    if (selectedUsername.value) {
      url.searchParams.set('username', selectedUsername.value)
    }

    return `${url.pathname}${url.search}`
  })
  const { loading, error, data } = useGetRequest<ITransactionDTO[]>(url, {
    watchTo: lastActionRef
  })

  return { loading, error, data }
}

export function useGetTransaction(transactionId: number) {
  const { loading, error, data } = useGetRequest<ITransaction>(
    `/transactions/${transactionId}`
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
export function useUpdateTransaction() {
  const { loading, error, data, mutate } = doRequest<
    ITransaction,
    { id: number; data: Omit<ITransaction, 'id'> }
  >('/transactions', 'put')
  return { loading, error, data, mutate }
}

export function useCreateTransaction() {
  const { loading, error, data, mutate } = doRequest<
    ITransaction,
    Omit<ITransaction, 'id'>
  >('/transactions', 'post')
  return { loading, error, data, mutate }
}

export function useGetTransactionsUsers() {
  const { loading, error, data } = useGetRequest<string[]>(
    '/transactions/users'
  )
  return { loading, error, data }
}
