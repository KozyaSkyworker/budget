<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import type { ITransaction } from '@/types'

  import { useGetTransaction, useUpdateTransaction } from '../api'
  import { useTranscationsStore } from '../store'
  import TransactionForm from './TransactionForm.vue'

  const { transactionID } = defineProps<{ transactionID: number }>()

  const open = ref(false)

  // TODO: обработать еррор и лоадинг
  const { data } = useGetTransaction(transactionID)
  const {
    loading: updateLoading,
    mutate,
    error: updateError
  } = useUpdateTransaction()

  const transcationsStore = useTranscationsStore()

  const toggle = () => {
    open.value = !open.value
  }

  const onSuccessCb = () => {
    toggle()
  }

  const handleSubmit = async (formData: Omit<ITransaction, 'id'>) => {
    console.log('log', `update t`)
    console.table(data)
    await mutate({ id: transactionID, data: formData })

    if (!updateError.value) {
      onSuccessCb()
    }

    // TODO: fix одинаковые не будут рефетчить?
    transcationsStore.setLastAction(
      `update t ${formData.title} ${formData.type} ${formData.amount} ${formData.date}`
    )
  }

  onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open.value) {
        toggle()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  })
</script>

<template>
  <button @click="toggle">Редактировать</button>
  <div v-if="open" class="modal" @click.self="toggle">
    <div class="modal__content">
      <h2>Edit {{ transactionID }}</h2>

      <TransactionForm
        :loading="updateLoading"
        :error="updateError"
        :action="handleSubmit"
        :form-data-prop="data"
        type-action="update"
      />
      <menu>
        <button :disabled="updateLoading" @click="toggle">Отмена</button>
      </menu>
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
