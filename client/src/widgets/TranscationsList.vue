<script setup lang="ts">
  import { useTransactionsRead } from '@/features/transactions-read/useTransactionsRead.ts'

  import Transaction from './Transaction.vue'

  const { transactions, loading, error } = useTransactionsRead()
</script>
<template>
  <section class="main__block transactions">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else-if="transactions?.length">
      <li v-for="transaction in transactions" :key="transaction.date">
        <Transaction v-bind="transaction" />
      </li>
    </ul>
    <p v-else>No transactions</p>
  </section>
</template>
