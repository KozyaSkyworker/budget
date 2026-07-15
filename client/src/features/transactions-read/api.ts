import { type ComputedRef, computed, toRef } from 'vue'

import { useGetRequest } from '@/api'

import type { ITransactionDTO } from '@/types'

import { useTranscationsStore } from '@/entities/transaction/store'

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
