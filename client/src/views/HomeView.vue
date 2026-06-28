<script setup lang="ts">
import Transaction from '@/components/Transaction.vue';
import type { ITransaction } from '@/types';

const MOCK_DATA: ITransaction[] = [
    {
        id: 1,
        title: 'Пополнение счета',
        date: '1 июня 2026',
        type: 'Пополнение',
        category: 'Зарплата',
        amount: 45000,
        comment: 'Комментарий',
        user: 'first user'
    },
    {
        id: 2,
        title: 'Покупка продуктов',
        date: '2 июня 2026',
        type: 'Списание',
        category: 'Продукты',
        amount: 1250,
        user: 'first user'
    },
    {
        id: 3,
        title: 'Оплата VPN',
        date: '3 июня 2026',
        type: 'Списание',
        category: 'Подписка',
        amount: 222,
        comment: 'Комментарий',
        user: 'third user'
    },
    {
        id: 4,
        title: 'Перевод от клиента',
        date: '4 июня 2026',
        type: 'Пополнение',
        category: 'Услуги',
        amount: 8700,
        user: 'third user'
    },
    {
        id: 5,
        title: 'Такси до офиса',
        date: '5 июня 2026',
        type: 'Списание',
        category: 'Транспорт',
        amount: 340,
        user: 'third user'
    },
    {
        id: 6,
        title: 'Обед в кафе',
        date: '6 июня 2026',
        type: 'Списание',
        category: 'Еда',
        amount: 560,
        user: 'third user'
    },
    {
        id: 7,
        title: 'Аванс за проект',
        date: '7 июня 2026',
        type: 'Пополнение',
        category: 'Фриланс',
        amount: 15000,
        user: 'third user'
    },
    {
        id: 8,
        title: 'Покупка книг',
        date: '8 июня 2026',
        type: 'Списание',
        category: 'Образование',
        amount: 2100,
        user: 'third user'
    },
    {
        id: 9,
        title: 'Коммунальные платежи',
        date: '9 июня 2026',
        type: 'Списание',
        category: 'Коммуналка',
        amount: 3800,
        user: 'third user'
    },
    {
        id: 10,
        title: 'Кэшбэк по карте',
        date: '10 июня 2026',
        type: 'Пополнение',
        category: 'Бонус',
        amount: 500,
        user: 'first user'
    },
    {
        id: 11,
        title: 'Абонемент в спортзал',
        date: '11 июня 2026',
        type: 'Списание',
        category: 'Здоровье',
        amount: 3200,
        user: 'second user'
    },
    {
        id: 12,
        title: 'Заправка авто',
        date: '12 июня 2026',
        type: 'Списание',
        category: 'Транспорт',
        amount: 2750,
        user: 'second user'
    },
    {
        id: 13,
        title: 'Дивиденды от акций',
        date: '13 июня 2026',
        type: 'Пополнение',
        category: 'Инвестиции',
        amount: 6200,
        user: 'third user'
    },
    {
        id: 14,
        title: 'Покупка кофе',
        date: '14 июня 2026',
        type: 'Списание',
        category: 'Еда',
        amount: 180,
        user: 'third user'
    },
    {
        id: 15,
        title: 'Оплата хостинга',
        date: '15 июня 2026',
        type: 'Списание',
        category: 'Подписка',
        amount: 890,
        user: 'fourth user'
    },
    {
        id: 16,
        title: 'Зарплата за май',
        date: '16 июня 2026',
        type: 'Пополнение',
        category: 'Зарплата',
        amount: 47000,
        user: 'third user'
    },
    {
        id: 17,
        title: 'Поход в кино',
        date: '17 июня 2026',
        type: 'Списание',
        category: 'Развлечения',
        amount: 850,
        user: 'third user'
    },
    {
        id: 18,
        title: 'Ремонт телефона',
        date: '18 июня 2026',
        type: 'Списание',
        category: 'Техника',
        amount: 4200,
        user: 'third user'
    },
    {
        id: 19,
        title: 'Возврат за товар',
        date: '19 июня 2026',
        type: 'Пополнение',
        category: 'Возврат',
        amount: 2300,
        user: 'third user'
    },
    {
        id: 20,
        title: 'Покупка подарка',
        date: '20 июня 2026',
        type: 'Списание',
        category: 'Развлечения',
        amount: 1500,
        user: 'third user'
    },
    {
        id: 21,
        title: 'Оплата курсов',
        date: '21 июня 2026',
        type: 'Списание',
        category: 'Образование',
        amount: 12500,
        user: 'third user'
    },
    {
        id: 22,
        title: 'Проценты по вкладу',
        date: '22 июня 2026',
        type: 'Пополнение',
        category: 'Депозит',
        amount: 1200,
        user: 'third user'
    },
    {
        id: 23,
        title: 'Стрижка',
        date: '23 июня 2026',
        type: 'Списание',
        category: 'Услуги',
        amount: 1000,
        user: 'third user'
    },
    {
        id: 24,
        title: 'Пополнение от партнёра',
        date: '24 июня 2026',
        type: 'Пополнение',
        category: 'Другое',
        amount: 3200,
        user: 'third user'
    }
];

</script>

<template>
    <h1>Home</h1>
    <div class="main__wrappper">
        <section class="main__block transactions">
            <ul>
                <li v-for="transaction in MOCK_DATA" :key="transaction.id">
                    <Transaction v-bind="transaction" />
                </li>
            </ul>
        </section>
        <div class="main__block controls">
            <input placeholder="search" />
            <div>
                <button>filter</button>
                <button>sort</button>
            </div>
            <button>+ create</button>
        </div>
    </div>

</template>

<style scoped>
.main__wrappper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
}



.controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: flex-end;
    position: sticky;
    top: 5px;
}
</style>