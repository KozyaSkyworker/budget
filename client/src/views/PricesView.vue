<template>
  <h1>Prices</h1>
  <p>
    Здесь будут просто текущие (последние записанные) цены на товары в магазинах
  </p>

  <!-- TODO: выбирать -->
  <div>
    <button>Хлеб Ч</button>
    <button>Хлеб Б</button>
    <button>Вода 5л</button>
    <button>Вода газ</button>
    <button>Молоко</button>
  </div>

  <article>
    <!-- TODO: подставлять -->
    <h2>Вода газ</h2>
    <ol class="list">
      <!-- TODO: сортировка по возрастанию -->
      <li class="list__item">
        <span>33.00 ₽</span>
        <span>Пятерочка</span>
        <span>13.13.2013</span>
      </li>
      <li class="list__item">
        <span>36.00 ₽</span>
        <span>Гуливер</span>
        <span>13.13.2013</span>
      </li>
      <li class="list__item">
        <span>29.00 ₽</span>
        <span>Чижик</span>
        <span>13.13.2013</span>
      </li>
      <li class="list__item">
        <span>39.00 ₽</span>
        <span>КБ</span>
        <span>13.13.2013</span>
      </li>
    </ol>
  </article>
</template>

<style scoped>
  .list__item {
    display: grid;
    grid-template-columns: repeat(3, 100px);
  }
</style>
