<script setup lang="ts">
  import TranscationControls from '@/entities/transaction/ui/TranscationControls.vue'
  import TranscationsList from '@/entities/transaction/ui/TranscationsList.vue'
</script>

<template>
  <div class="main__wrappper">
    <TranscationControls />
    <TranscationsList />
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
</style>
