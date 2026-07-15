<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  const open = defineModel<boolean>({ default: false })

  const toggle = () => {
    open.value = !open.value
  }

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) {
      toggle()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleEscape)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
</script>

<template>
  <div v-if="open" class="modal" @click.self="toggle">
    <div class="modal__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: min-content;
    height: fit-content;
    background: teal;
  }
</style>
