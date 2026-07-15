<script setup lang="ts">
  import TransactionForm from '@/entities/transaction/ui/TransactionForm.vue'

  import { useTransactionCreate } from './useTransactionCreate'

  const { loading, error, create } = useTransactionCreate()
</script>

<template>
  <TransactionForm
    :loading="loading"
    :error="error"
    :action="create"
    typeAction="create"
  />
</template>
