import { useGetRequest } from '@/api'

export function useGetTransactionsUsers() {
  const { loading, error, data } = useGetRequest<string[]>(
    '/transactions/users'
  )
  return { loading, error, data }
}
