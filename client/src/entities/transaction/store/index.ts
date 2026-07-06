import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useTranscationsStore = defineStore('transactions', () => {
  const lastAction = ref<string | undefined>(undefined)
  function setLastAction(newAction?: string) {
    lastAction.value = newAction
  }
  return { lastAction, setLastAction }
})
