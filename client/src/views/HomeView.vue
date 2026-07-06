<script setup lang="ts">
  import TransactionsUsers from '@/entities/transaction/ui/TransactionsUsers.vue'
  import TranscationsList from '@/entities/transaction/ui/TranscationsList.vue'
</script>

<template>
  <h1>Home</h1>
  <div class="main__wrappper">
    <TranscationsList />
    <div class="main__block controls">
      <div>
        <input placeholder="search" />
        <div>
          <button>filter</button>
          <button>sort</button>
        </div>
        <button>+ create</button>
      </div>
      <TransactionsUsers />
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
