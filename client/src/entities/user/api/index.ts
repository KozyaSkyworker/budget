import { useGetRequest } from '@/api'

import type { IUser } from '@/types'

import { useUserStore } from '../store'

export function useGetMe() {
  const userStore = useUserStore()

  const { loading, error, data } = useGetRequest<IUser>('/me', {
    onSuccess: () => {
      if (data.value) {
        userStore.setUser(data.value)
      }
    }
  })

  return { loading, error, data }
}
