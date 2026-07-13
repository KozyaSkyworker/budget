<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import { useGetTransactions } from '../api'
  import Transaction from './Transaction.vue'

  const route = useRoute()

  const selectedUsername = computed(
    () => (route.query.username as string | undefined) || ''
  )

  const selectedSort = computed(
    () => (route.query.sort as string | undefined) || ''
  )

  const {
    data: transactions,
    error,
    loading
  } = useGetTransactions(selectedUsername, selectedSort)
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
