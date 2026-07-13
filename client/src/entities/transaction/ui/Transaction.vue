<script setup lang="ts">
  import type { ITransaction, ITransactionDTO } from '@/types'

  import { useDeleteTransaction } from '../api'
  import { useTranscationsStore } from '../store'

  const { date, items } = defineProps<ITransactionDTO>()

  const transcationsStore = useTranscationsStore()

  const { loading, mutate } = useDeleteTransaction()

  const handleDelete = async (id: number) => {
    if (!confirm('Вы действительно хотите удалить транзакцию?')) return

    console.log('log', `delete t with id ${id}`)
    await mutate(id)
    transcationsStore.setLastAction(`delete t with id ${id}`)
  }

  const getSign = (type: ITransaction['type']) =>
    type === 'Пополнение' ? '+' : '-'
</script>

<template>
  <article>
    <header>
      <h2>{{ date }}</h2>
    </header>
    <main class="transactions">
      <div v-for="item in items" :key="item.id" class="transaction">
        <h3>{{ item.user }}</h3>
        <p class="type" :data-sign="getSign(item.type)">
          <span class="badge">{{ item.type }}:</span>
          <span class="amount"
            >{{ getSign(item.type) }}{{ item.amount }} ₽</span
          >
        </p>
        <span class="badge category">
          {{ item.category }}
        </span>
        <small v-if="item.comment">Комментарий: {{ item.comment }}</small>
        <div>
          <button>Редактировать</button>
          <button :disabled="loading" @click="handleDelete(item.id)">
            Удалить
          </button>
        </div>
      </div>
    </main>
  </article>
</template>

<style scoped>
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1rem 0;
  }
  .transaction {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px dashed black;
    padding: 1rem;
  }
  .type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .type .badge {
    background: crimson;
  }
  .type .amount {
    color: crimson;
  }
  .type[data-sign='+'] .badge {
    background: seagreen;
  }
  .type[data-sign='+'] .amount {
    color: seagreen;
  }
  .amount {
    font-weight: bold;
  }
  .badge {
    background: #eee;
    border-radius: 0.45rem;
    width: max-content;
    padding: 0.25rem 0.5rem;
  }
</style>
