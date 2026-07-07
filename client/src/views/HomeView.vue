<script setup lang="ts">
  import { ref } from 'vue'

  import TransactionCreate from '@/entities/transaction/ui/TransactionCreate.vue'
  import TransactionsUsers from '@/entities/transaction/ui/TransactionsUsers.vue'
  import TranscationsList from '@/entities/transaction/ui/TranscationsList.vue'

  const currentAction = ref<'filter' | 'create'>('filter')
  const currentSort = ref<'asc' | 'desc'>('desc')

  const toggleAction = (action: 'filter' | 'create') => {
    currentAction.value = action
  }

  const toggleSort = () => {
    currentSort.value = currentSort.value === 'asc' ? 'desc' : 'asc'
  }
</script>

<template>
  <div class="main__wrappper">
    <TranscationsList />
    <div class="main__block controls">
      <div>
        <input placeholder="search" />
        <div>
          <button @click="toggleAction('filter')">filter</button>
          <button
            :title="currentSort === 'asc' ? 'change to desc' : 'change to asc'"
            @click="toggleSort"
          >
            sorted by {{ currentSort }}
          </button>
          <button @click="toggleAction('create')">+ create</button>
        </div>
      </div>

      <TransactionsUsers v-if="currentAction === 'filter'" />
      <TransactionCreate v-if="currentAction === 'create'" />
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
</style>
