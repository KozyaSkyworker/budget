<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import type { ITransaction } from '@/types/transcation.ts'

  import { useCreateTransaction } from '../api'
  import { useTranscationsStore } from '../store'
  import TransactionForm from './TransactionForm.vue'

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
</script>

<template>
  <TransactionForm
    :loading="loading"
    :error="error"
    :action="handleSubmit"
    typeAction="create"
  />
</template>
