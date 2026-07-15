<script setup lang="ts">
  import { computed, reactive } from 'vue'

  import type { ITransaction } from '@/types'

  import { useUserStore } from '@/entities/user/store'

  const userStore = useUserStore()

  const {
    action,
    error = '',
    loading,
    formDataProp,
    typeAction
  } = defineProps<{
    action: (formData: Omit<ITransaction, 'id'>) => Promise<void>
    typeAction: 'create' | 'update'
    loading: boolean
    error?: string
    formDataProp?: Omit<ITransaction, 'id'>
  }>()

  const resetForm = () => {
    formData.title = ''
    formData.date = new Date().toLocaleDateString()
    formData.type = 'Пополнение'
    formData.category = ''
    formData.amount = 0
    formData.comment = ''
    formData.user = userStore.user?.username ?? ''
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    await action(formData)

    if (!error) {
      resetForm()
    }
  }

  const formData = reactive<Omit<ITransaction, 'id'>>(
    formDataProp
      ? { ...formDataProp }
      : {
          title: '',
          date: new Date().toLocaleDateString(),
          type: 'Пополнение',
          category: '',
          amount: 0,
          comment: '',
          user: userStore.user?.username ?? ''
        }
  )

  const sign = computed(() => (formData.type === 'Пополнение' ? '+' : '-'))
</script>

<template>
  <form class="transaction-create" @submit="handleSubmit">
    <div class="tranaction-create__item">
      <label :for="`${typeAction}-title`">Title *</label>
      <input
        :id="`${typeAction}-title`"
        v-model="formData.title"
        type="text"
        placeholder="title"
        required
      />
    </div>
    <div class="tranaction-create__item">
      <label :for="`${typeAction}-date`">Date *</label>
      <input
        :id="`${typeAction}-date`"
        v-model="formData.date"
        type="text"
        placeholder="date"
        required
      />
    </div>

    <div class="tranaction-create__item">
      <div>Type *:</div>
      <div>
        <div>
          <input
            :id="`${typeAction}-add`"
            v-model="formData.type"
            type="radio"
            value="Пополнение"
          />
          <label :for="`${typeAction}-add`">Пополнение</label>
        </div>
        <div>
          <input
            :id="`${typeAction}-minus`"
            v-model="formData.type"
            type="radio"
            value="Списание"
          />
          <label :for="`${typeAction}-minus`">Списание</label>
        </div>
      </div>
    </div>
    <div class="tranaction-create__item">
      <label :for="`${typeAction}-category`">Category *</label>
      <input
        :id="`${typeAction}-category`"
        v-model="formData.category"
        type="text"
        placeholder="category"
        required
      />
    </div>
    <div class="tranaction-create__item amount">
      <label :for="`${typeAction}-amount`">Amount *</label>
      <div>
        <span class="sign">{{ sign }}</span>
        <input
          :id="`${typeAction}-amount`"
          v-model="formData.amount"
          type="number"
          placeholder="amount"
          required
        />
      </div>
    </div>
    <div class="tranaction-create__item">
      <label :for="`${typeAction}-username`">Username *</label>
      <input
        :id="`${typeAction}-username`"
        v-model="formData.user"
        type="text"
        placeholder="username"
        required
        disabled
      />
    </div>
    <div class="tranaction-create__item">
      <label :for="`${typeAction}-comment`">Comment</label>
      <input
        :id="`${typeAction}-comment`"
        v-model="formData.comment"
        type="text"
        placeholder="comment"
      />
    </div>
    <button
      class="tranaction-create__item button"
      type="submit"
      :disabled="loading"
    >
      {{ typeAction === 'create' ? 'Create' : 'Update' }}
    </button>

    <div v-if="error">
      {{ error }}
    </div>
  </form>
</template>

<style scoped>
  .transaction-create {
    background: rgb(216, 245, 191);
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: end;
    gap: 0.75rem;
  }

  .tranaction-create__item.amount > div {
    display: flex;
    align-items: center;
  }
  .tranaction-create__item.button {
    height: min-content;
  }

  .sign {
    width: 10px;
    display: block;
  }
</style>
