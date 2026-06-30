<script setup lang="ts">
  import type { ITransaction } from '@/types'

  const { title, date, type, category, amount, user, comment } =
    defineProps<ITransaction>()

  const sign = type === 'Пополнение' ? '+' : '-'
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
        <button>Удалить</button>
      </div>
    </footer>
  </article>
</template>

<style scoped></style>
