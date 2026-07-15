<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterView } from 'vue-router'

  import Header from '@/widgets/Header.vue'

  import { useUserStore } from '@/entities/user/store'

  const userStore = useUserStore()

  const token = computed(() => localStorage.getItem('token'))
</script>

<template>
  <div class="wrapper">
    <Header v-if="token || userStore.user?.username" />

    <main id="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>
