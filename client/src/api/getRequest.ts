import type { AxiosResponse } from 'axios'

import { onMounted, ref } from 'vue'

import { apiInstance } from './base'

const getRequest = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const res = await apiInstance.get(url)
    return res
  } catch (e) {
    console.error(e)
    throw new Error(String(e)) // { error: String(e) }
  }
}

export function useGetRequest<T>(url: string) {
  const loading = ref(false)
  const error = ref('')
  const data = ref<T | undefined>(undefined)

  const request = async () => {
    loading.value = true
    const response = await getRequest<T>(url)
    data.value = response
    try {
    } catch (e) {
      error.value = String(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(request)

  return { loading, error, data }
}
