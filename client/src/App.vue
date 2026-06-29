<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/Header.vue'
</script>

<template>
  <div class="wrapper">
    <Header />

    <main id="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>
