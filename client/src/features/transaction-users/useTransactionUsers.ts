import { useRouter } from 'vue-router'

import { useGetTransactionsUsers } from './api'

export function useTransactionUsers() {
  const router = useRouter()

  const {
    data: usersWithTransactions,
    error: usersWithTransactionsError,
    loading: usersWithTransactionsLoading
  } = useGetTransactionsUsers()

  const handleClick = (username: string) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        username: username
      }
    })
  }

  const reset = () => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        username: undefined
      }
    })
  }

  return {
    usersWithTransactions,
    usersWithTransactionsError,
    usersWithTransactionsLoading,
    handleClick,
    reset
  }
}
