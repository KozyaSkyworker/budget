<script setup lang="ts">
  import { ref } from 'vue'

  import TransactionEdit from '@/features/transaction-edit/TransactionEdit.vue'

  import Modal from './Modal.vue'

  const { transactionID } = defineProps<{ transactionID: number }>()

  const open = ref(false)

  const toggle = () => {
    open.value = !open.value
  }
</script>

<template>
  <button @click="toggle">Редактировать</button>
  <Modal v-model="open">
    <TransactionEdit v-model="open" :transaction-i-d="transactionID" />
  </Modal>
</template>
