<script setup lang="ts">
  import { computed, reactive } from 'vue'

  import { type ITransaction } from '@/types'

  import { useUserStore } from '@/entities/user/store'

  import { useCreateTransaction } from '../api'
  import { useTranscationsStore } from '../store'

  const { loading, error, mutate } = useCreateTransaction()

  const userStore = useUserStore()
  const transcationsStore = useTranscationsStore()

  const formData = reactive<Omit<ITransaction, 'id'>>({
    title: '',
    date: new Date().toLocaleDateString(),
    type: 'Пополнение',
    category: '',
    amount: 0,
    comment: '',
    user: userStore.user?.username ?? ''
  })

  const sign = computed(() => (formData.type === 'Пополнение' ? '+' : '-'))

  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    console.log('log', `create new t`)
    console.table(formData)
    await mutate(formData)
    // TODO: fix одинаковые не будут рефетчить?
    transcationsStore.setLastAction(
      `create new t ${formData.title} ${sign.value} ${formData.amount}`
    )
  }
</script>

<template>
  <form class="transaction-create" @submit="handleSubmit">
    <div class="tranaction-create__item">
      <label for="title">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        placeholder="title"
        required
      />
    </div>
    <div class="tranaction-create__item">
      <label for="date">Date *</label>
      <input
        id="date"
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
            id="add"
            v-model="formData.type"
            type="radio"
            value="Пополнение"
          />
          <label for="add">Пополнение</label>
        </div>
        <div>
          <input
            id="minus"
            v-model="formData.type"
            type="radio"
            value="Списание"
          />
          <label for="minus">Списание</label>
        </div>
      </div>
    </div>
    <div class="tranaction-create__item">
      <label for="category">Category *</label>
      <input
        id="category"
        v-model="formData.category"
        type="text"
        placeholder="category"
        required
      />
    </div>
    <div class="tranaction-create__item amount">
      <label for="amount">Amount *</label>
      <div>
        <span class="sign">{{ sign }}</span>
        <input
          id="amount"
          v-model="formData.amount"
          type="number"
          placeholder="amount"
          required
        />
      </div>
    </div>
    <div class="tranaction-create__item">
      <label for="username">Username *</label>
      <input
        id="username"
        v-model="formData.user"
        type="text"
        placeholder="username"
        required
        disabled
      />
    </div>
    <div class="tranaction-create__item">
      <label for="comment">Comment</label>
      <input
        id="comment"
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
      Create
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
