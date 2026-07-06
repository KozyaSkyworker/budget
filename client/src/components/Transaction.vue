<script setup lang="ts">
  import type { ITransaction } from '@/types'

  import { useTranscationsStore } from '@/stores/transactionsStore'

  const transcationsStore = useTranscationsStore()

  const { title, date, type, category, amount, user, comment, id } =
    defineProps<ITransaction>()

  const sign = type === 'Пополнение' ? '+' : '-'

  const handleClick = () => {
    transcationsStore.setLastAction(`delete t with id ${id}`)
    console.log('log', `delete t with id ${id}`)
    // delete id doRequest(...)
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
        <button @click="handleClick">Удалить</button>
      </div>
    </footer>
  </article>
</template>

<style scoped></style>
