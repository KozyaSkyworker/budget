<script setup lang="ts">
  import { useTransactionSort } from './useTransactionSort'

  const { toggleSort, currentSort } = useTransactionSort()
</script>

<template>
  <button
    :title="currentSort === 'asc' ? 'change to desc' : 'change to asc'"
    @click="toggleSort"
  >
    sorted by {{ currentSort }}
  </button>
</template>
