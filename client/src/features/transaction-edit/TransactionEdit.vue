<script setup lang="ts">
  import { useGetTransaction } from '@/entities/transaction/api'
  import TransactionForm from '@/entities/transaction/ui/TransactionForm.vue'

  import { useTransactionEdit } from './useTransactionEdit'

  const { transactionID } = defineProps<{ transactionID: number }>()

  const open = defineModel<boolean>({ default: false })
  const toggle = () => {
    open.value = !open.value
  }

  // TODO: обработать еррор и лоадинг
  const { data } = useGetTransaction(transactionID)

  const {
    loading: updateLoading,
    error: updateError,
    update
  } = useTransactionEdit({
    transactionID,
    onSuccessCb: () => {
      toggle()
    }
  })
</script>

<template>
  <h2>Edit {{ transactionID }}</h2>

  <TransactionForm
    :loading="updateLoading"
    :error="updateError"
    :action="update"
    :form-data-prop="data"
    type-action="update"
  />
  <menu>
    <button :disabled="updateLoading" @click="toggle">Отмена</button>
  </menu>
</template>
