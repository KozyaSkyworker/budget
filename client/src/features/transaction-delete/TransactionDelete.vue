<script setup lang="ts">
  import { useTranscationsStore } from '@/entities/transaction/store'

  import { useDeleteTransaction } from './api'

  const { transactionID } = defineProps<{ transactionID: number }>()

  //   TODO: error обработать
  const { loading, mutate } = useDeleteTransaction()

  const transcationsStore = useTranscationsStore()

  const handleDelete = async (id: number) => {
    if (!confirm('Вы действительно хотите удалить транзакцию?')) return

    console.log('log', `delete t with id ${id}`)
    await mutate(id)
    transcationsStore.setLastAction(`delete t with id ${id}`)
  }
</script>

<template>
  <button :disabled="loading" @click="handleDelete(transactionID)">
    Удалить
  </button>
</template>
