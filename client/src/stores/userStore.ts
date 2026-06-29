import type { IUser } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | undefined>(undefined)

  function setUser(newUser?: IUser) {
    user.value = newUser
  }

  function clearUser() {
    user.value = undefined
  }

  return { user, setUser, clearUser }
})
