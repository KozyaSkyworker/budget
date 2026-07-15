<script setup lang="ts">
  import { useTransactionUsers } from './useTransactionUsers'

  const {
    usersWithTransactions,
    handleClick,
    reset,
    usersWithTransactionsLoading,
    usersWithTransactionsError
  } = useTransactionUsers()
</script>
<template>
  <div class="filter">
    <p v-if="usersWithTransactionsLoading">Loading...</p>
    <p v-if="usersWithTransactionsError">
      Error: {{ usersWithTransactionsError }}
    </p>
    <button
      v-for="user in usersWithTransactions"
      :key="user"
      @click="handleClick(user)"
    >
      {{ user }}
    </button>
    <button @click="reset">reset</button>
  </div>
</template>

<style>
  .filter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
