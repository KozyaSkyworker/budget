import type { AxiosResponse } from 'axios'

import { ref } from 'vue'

import { apiInstance } from './base'

type TMethods = 'post' | 'put' | 'delete' | 'patch'

const apiInstanceMethodRequest = (method: TMethods) => {
  switch (method) {
    case 'post':
      return apiInstance.post
    case 'put':
      return apiInstance.put
    case 'delete':
      return apiInstance.delete
    case 'patch':
      return apiInstance.patch
    default:
      return apiInstance.post
  }
}

const apiInstanceRequest = async <T>(
  url: string,
  method?: TMethods
): Promise<AxiosResponse<T>> => {
  const meth = method || 'post'

  try {
    const res = await apiInstanceMethodRequest(meth)(url)
    return res
  } catch (e) {
    console.error(e)
    throw new Error(String(e)) // { error: String(e) }
  }
}

export function doRequest<T>(url: string, method?: TMethods) {
  const loading = ref(false)
  const error = ref('')
  const data = ref<T | undefined>(undefined)

  const mutate = async () => {
    loading.value = true
    const response = await apiInstanceRequest<T>(url, method)
    data.value = response
    try {
    } catch (e) {
      error.value = String(e)
    } finally {
      loading.value = false
    }
  }

  return { loading, error, mutate }
}
