import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useTransactionSort() {
  const router = useRouter()

  const currentSort = ref<'asc' | 'desc'>('desc')

  const toggleSort = () => {
    currentSort.value = currentSort.value === 'asc' ? 'desc' : 'asc'
    router.push({
      query: {
        ...router.currentRoute.value.query,
        sort: currentSort.value
      }
    })
  }

  return {
    currentSort,
    toggleSort
  }
}
