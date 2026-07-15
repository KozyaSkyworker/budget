import type { ITransaction } from '@/types'

import { useTranscationsStore } from '@/entities/transaction/store'

import { useUpdateTransaction } from './api'

interface ITransactionEditProps {
  transactionID: number
  onSuccessCb?: () => void
}

export function useTransactionEdit({
  transactionID,
  onSuccessCb
}: ITransactionEditProps) {
  const { loading, mutate, error } = useUpdateTransaction()

  const transcationsStore = useTranscationsStore()

  const handleSubmit = async (formData: Omit<ITransaction, 'id'>) => {
    console.log('log', `update t`)
    console.table(formData)
    await mutate({ id: transactionID, data: formData })

    if (!error.value) {
      onSuccessCb?.()
    }

    // TODO: fix одинаковые не будут рефетчить?
    transcationsStore.setLastAction(
      `update t ${formData.title} ${formData.type} ${formData.amount} ${formData.date}`
    )
  }

  return {
    loading,
    error,
    update: handleSubmit
  }
}
