<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterView } from 'vue-router'

  import Header from '@/components/Header.vue'

  const token = computed(() => localStorage.getItem('token'))
</script>

<template>
  <div class="wrapper">
    <Header v-if="token" />

    <main id="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>
