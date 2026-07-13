<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { useGetTransactionsUsers } from '../api'

  const router = useRouter()

  const {
    data: usersWithTransactions,
    error: usersWithTransactionsErrorLoading,
    loading: usersWithTransactionsLoading
  } = useGetTransactionsUsers()

  const handleClick = (username: string) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        username: username
      }
    })
  }

  const reset = () => {
    router.push({
      query: {}
    })
  }
</script>
<template>
  <div class="filter">
    <p v-if="usersWithTransactionsLoading">Loading...</p>
    <p v-if="usersWithTransactionsErrorLoading">
      Error: {{ usersWithTransactionsErrorLoading }}
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
    gap: 1rem;
  }
</style>
