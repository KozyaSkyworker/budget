<script setup lang="ts">
  import { getTransactions } from '@/api'
  import Transaction from '@/components/Transaction.vue'
  import type { ITransaction } from '@/types'
  import { onMounted, ref } from 'vue'

  const loading = ref(false)
  const error = ref('')

  const transactions = ref<ITransaction[]>([])

  onMounted(async () => {
    loading.value = true
    const response = await getTransactions()
    loading.value = false

    if ('error' in response) {
      error.value = response.error
    } else {
      transactions.value = response
    }
  })
</script>

<template>
  <h1>Home</h1>
  <div class="main__wrappper">
    <section class="main__block transactions">
      <p v-if="loading">Loading...</p>
      <p v-if="error">Error: {{ error }}</p>
      <ul v-if="transactions.length">
        <li v-for="transaction in transactions" :key="transaction.id">
          <Transaction v-bind="transaction" />
        </li>
      </ul>
      <p v-else>No transactions</p>
    </section>
    <div class="main__block controls">
      <div>
        <input placeholder="search" />
        <div>
          <button>filter</button>
          <button>sort</button>
        </div>
        <button>+ create</button>
      </div>
      <div class="filter">
        <button>username</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main__wrappper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: sticky;
    top: 5px;
  }

  .filter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
