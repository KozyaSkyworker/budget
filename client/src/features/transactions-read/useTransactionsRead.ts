import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useGetTransactions } from './api'

export function useTransactionsRead() {
  const route = useRoute()

  const selectedUsername = computed(
    () => (route.query.username as string | undefined) || ''
  )

  const selectedSort = computed(
    () => (route.query.sort as string | undefined) || ''
  )

  const {
    data: transactions,
    error,
    loading
  } = useGetTransactions(selectedUsername, selectedSort)

  return {
    transactions,
    error,
    loading
  }
}
