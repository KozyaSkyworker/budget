<script setup lang="ts">
  import { ref } from 'vue'

  import TransactionCreate from '@/entities/transaction/ui/TransactionCreate.vue'
  import TransactionSort from '@/entities/transaction/ui/TransactionSort.vue'
  import TransactionsUsers from '@/entities/transaction/ui/TransactionsUsers.vue'

  const currentAction = ref<'filter' | 'create'>('filter')

  const toggleAction = (action: 'filter' | 'create') => {
    currentAction.value = action
  }
</script>

<template>
  <div class="main__block controls">
    <div>
      <div class="filters">
        <button
          :class="currentAction === 'filter' ? 'active' : ''"
          autofocus
          @click="toggleAction('filter')"
        >
          filter
        </button>
        <TransactionSort />
        <button
          :class="currentAction === 'create' ? 'active' : ''"
          @click="toggleAction('create')"
        >
          + create
        </button>
      </div>
    </div>

    <TransactionsUsers v-if="currentAction === 'filter'" />
    <TransactionCreate v-if="currentAction === 'create'" />
  </div>
</template>

<style scoped>
  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: sticky;
    top: 5px;
    order: 2;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .controls button.active {
    background: seagreen;
  }
</style>
