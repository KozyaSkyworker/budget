import { watch } from 'vue'

import { useGetRequest } from '@/api'

import type { IUser } from '@/types'

import { useUserStore } from '@/stores/userStore'

export function useGetMe() {
  const { loading, error, data } = useGetRequest<IUser>('/me')
  const userStore = useUserStore()

  watch(
    () => data.value,
    () => {
      if (data.value) {
        userStore.setUser(data.value)
      }
    }
  )

  return { loading, error, data }
}
