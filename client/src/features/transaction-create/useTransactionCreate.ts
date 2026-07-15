import { useRouter } from 'vue-router'

import type { ITransaction } from '@/types'

import { useTranscationsStore } from '@/entities/transaction/store'

import { useCreateTransaction } from './api'

export function useTransactionCreate() {
  const router = useRouter()

  const { loading, error, mutate } = useCreateTransaction()

  const transcationsStore = useTranscationsStore()

  const onSuccessCb = (newTransactionUser: string) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        username: newTransactionUser
      }
    })
  }

  const handleSubmit = async (formData: Omit<ITransaction, 'id'>) => {
    console.log('log', `create new t`)
    console.table(formData)
    await mutate(formData)

    if (!error.value) {
      onSuccessCb(formData.user)
    }

    // TODO: fix одинаковые не будут рефетчить?
    transcationsStore.setLastAction(
      `create new t ${formData.title} ${formData.type} ${formData.amount} ${formData.date}`
    )
  }

  return {
    loading,
    error,
    create: handleSubmit
  }
}
