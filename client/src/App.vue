<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div class="wrapper">

    <Header />

    <main>
      <div class="container">
        <RouterView />
      </div>

    </main>
    <footer>
      <div class="container">footer</div>
    </footer>
  </div>

</template>
