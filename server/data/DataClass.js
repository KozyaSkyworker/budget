const MOCK_DATA = [
  {
    id: 1,
    title: "Пополнение счета",
    date: "01.06.2026",
    type: "Пополнение",
    category: "Зарплата",
    amount: 45000,
    comment: "Комментарий",
    user: "first user",
  },
  {
    id: 2,
    title: "Покупка продуктов",
    date: "01.06.2026",
    type: "Списание",
    category: "Продукты",
    amount: 1250,
    user: "first user",
  },
  {
    id: 3,
    title: "Оплата VPN",
    date: "03.06.2026",
    type: "Списание",
    category: "Подписка",
    amount: 222,
    comment: "Комментарий",
    user: "third user",
  },
  {
    id: 4,
    title: "Перевод от клиента",
    date: "04.06.2026",
    type: "Пополнение",
    category: "Услуги",
    amount: 8700,
    user: "third user",
  },
  {
    id: 5,
    title: "Такси до офиса",
    date: "05.06.2026",
    type: "Списание",
    category: "Транспорт",
    amount: 340,
    user: "third user",
  },
  {
    id: 6,
    title: "Обед в кафе",
    date: "06.06.2026",
    type: "Списание",
    category: "Еда",
    amount: 560,
    user: "third user",
  },
  {
    id: 7,
    title: "Аванс за проект",
   date: "06.06.2026",
    type: "Пополнение",
    category: "Фриланс",
    amount: 15000,
    user: "third user",
  },
  {
    id: 8,
    title: "Покупка книг",
   date: "06.06.2026",
    type: "Списание",
    category: "Образование",
    amount: 2100,
    user: "third user",
  },
  {
    id: 9,
    title: "Коммунальные платежи",
    date: "09.06.2026",
    type: "Списание",
    category: "Коммуналка",
    amount: 3800,
    user: "third user",
  },
  {
    id: 10,
    title: "Кэшбэк по карте",
    date: "10.06.2026",
    type: "Пополнение",
    category: "Бонус",
    amount: 500,
    user: "first user",
  },
  {
    id: 11,
    title: "Абонемент в спортзал",
    date: "11.06.2026",
    type: "Списание",
    category: "Здоровье",
    amount: 3200,
    user: "second user",
  },
  {
    id: 12,
    title: "Заправка авто",
    date: "12.06.2026",
    type: "Списание",
    category: "Транспорт",
    amount: 2750,
    user: "second user",
  },
  {
    id: 13,
    title: "Дивиденды от акций",
    date: "13.06.2026",
    type: "Пополнение",
    category: "Инвестиции",
    amount: 6200,
    user: "third user",
  },
  {
    id: 14,
    title: "Покупка кофе",
    date: "14.06.2026",
    type: "Списание",
    category: "Еда",
    amount: 180,
    user: "third user",
  },
  {
    id: 15,
    title: "Оплата хостинга",
    date: "15.06.2026",
    type: "Списание",
    category: "Подписка",
    amount: 890,
    user: "fourth user",
  },
  {
    id: 16,
    title: "Зарплата за май",
    date: "16.06.2026",
    type: "Пополнение",
    category: "Зарплата",
    amount: 47000,
    user: "third user",
  },
  {
    id: 17,
    title: "Поход в кино",
    date: "17.06.2026",
    type: "Списание",
    category: "Развлечения",
    amount: 850,
    user: "third user",
  },
  {
    id: 18,
    title: "Ремонт телефона",
    date: "18.06.2026",
    type: "Списание",
    category: "Техника",
    amount: 4200,
    user: "third user",
  },
  {
    id: 19,
    title: "Возврат за товар",
    date: "19.06.2026",
    type: "Пополнение",
    category: "Возврат",
    amount: 2300,
    user: "third user",
  },
  {
    id: 20,
    title: "Покупка подарка",
    date: "20.06.2026",
    type: "Списание",
    category: "Развлечения",
    amount: 1500,
    user: "third user",
  },
  {
    id: 21,
    title: "Оплата курсов",
    date: "21.06.2026",
    type: "Списание",
    category: "Образование",
    amount: 12500,
    user: "third user",
  },
  {
    id: 22,
    title: "Проценты по вкладу",
    date: "22.06.2026",
    type: "Пополнение",
    category: "Депозит",
    amount: 1200,
    user: "third user",
  },
  {
    id: 23,
    title: "Стрижка",
    date: "23.06.2026",
    type: "Списание",
    category: "Услуги",
    amount: 1000,
    user: "third user",
  },
  {
    id: 24,
    title: "Пополнение от партнёра",
    date: "24.06.2026",
    type: "Пополнение",
    category: "Другое",
    amount: 3200,
    user: "third user",
  },
];

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('.');
  return new Date(year, month - 1, day);
};

class DataClass {
    
    constructor(data) {
        this.data = data;
    }

    deleteById (id) {
        this.data = this.data.filter(item => item.id !== id)
    }

    findById (id) {
        return this.data.find(item => item.id === id)
    }

    sortData(data, sort) {
      if (sort === 'asc') {
         return data.toSorted((a, b) => parseDate(a.date) - parseDate(b.date))
        } 

        return data.toSorted((a, b) => parseDate(b.date) - parseDate(a.date))
    }



    getTransformedData ({username, sort = 'desc'}) {
      const dateMap = new Map()
      const data = this.getData()
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        
        if (username && element.user !== username) {
          continue
        }

        if (!dateMap.has(element.date)) {
          dateMap.set(element.date, [])
        }
        dateMap.get(element.date).push(element)
      }

      const transformedData =  Array.from(dateMap.entries().map(([date, items]) => ({
        date,
        items,
      })))
      const sortedData = this.sortData(transformedData, sort)

   
      return Array.from(sortedData)
    }

    update (id, newData) {
      const index = this.data.findIndex(item => item.id === id)
      this.data[index] = newData
    }

    getData () {
      return this.data
    }
    
    append(newData) {
        this.data.push(newData)
    }
}

export default new DataClass(MOCK_DATA)