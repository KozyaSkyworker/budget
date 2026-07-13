<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const currentSort = ref<'asc' | 'desc'>('desc')

  const toggleSort = () => {
    currentSort.value = currentSort.value === 'asc' ? 'desc' : 'asc'
    router.push({
      query: {
        ...router.currentRoute.value.query,
        sort: currentSort.value
      }
    })
  }
</script>

<template>
  <button
    :title="currentSort === 'asc' ? 'change to desc' : 'change to asc'"
    @click="toggleSort"
  >
    sorted by {{ currentSort }}
  </button>
</template>
