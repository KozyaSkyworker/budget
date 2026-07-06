<script setup lang="ts">
  import type { ITransaction } from '@/types'

  import { useDeleteTransaction } from '../api'
  import { useTranscationsStore } from '../store'

  const { title, date, type, category, amount, user, comment, id } =
    defineProps<ITransaction>()

  const transcationsStore = useTranscationsStore()

  const { loading, mutate } = useDeleteTransaction()

  const sign = type === 'Пополнение' ? '+' : '-'

  const handleClick = async () => {
    console.log('log', `delete t with id ${id}`)
    await mutate(id)
    transcationsStore.setLastAction(`delete t with id ${id}`)
  }
</script>

<template>
  <article>
    <header>
      <h2>{{ title }} | {{ user }}</h2>
      <p>
        <time datetime="2026-06-28">{{ date }}</time>
        <span>{{ type }}</span>
      </p>
    </header>
    <div>
      <p>Категория: {{ category }}</p>
      <p>
        Сумма: <strong>{{ sign }}{{ amount }} ₽</strong>
      </p>
    </div>
    <footer>
      <small v-if="comment">Комментарий: {{ comment }}</small>
      <div>
        <button>Редактировать</button>
        <button :disabled="loading" @click="handleClick">Удалить</button>
      </div>
    </footer>
  </article>
</template>

<style scoped></style>
