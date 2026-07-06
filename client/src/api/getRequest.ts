import type { AxiosResponse } from 'axios'

import { type Ref, ref, toValue, watchEffect } from 'vue'

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

export function useGetRequest<T>(
  url: string | Ref<string>,
  {
    onSuccess,
    watchTo
  }: { watchTo?: Ref<string | undefined>; onSuccess?: () => void } = {}
) {
  const loading = ref(false)
  const error = ref('')
  const data = ref<T | undefined>(undefined)

  watchEffect(async () => {
    const currentUrl = toValue(url)

    if (watchTo) {
      toValue(watchTo)
    }

    loading.value = true
    error.value = ''

    try {
      const response = await getRequest<T>(currentUrl)
      data.value = response
      onSuccess?.()
    } catch (e) {
      error.value = String(e)
    } finally {
      loading.value = false
    }
  })

  return { loading, error, data }
}
