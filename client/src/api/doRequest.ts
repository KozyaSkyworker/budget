import type { AxiosResponse } from 'axios'

import { ref } from 'vue'

import { apiInstance } from './base'

type TMethods = 'post' | 'put' | 'delete' | 'patch'

const apiInstanceMethodRequest = <Request>(
  method: TMethods,
  url: string,
  data?: Request
) => {
  switch (method) {
    case 'post':
      return apiInstance.post(url, data)
    case 'put':
      return apiInstance.put
    case 'delete':
      return apiInstance.delete(`${url}/${data}`)
    case 'patch':
      return apiInstance.patch
    default:
      return apiInstance.post
  }
}

const apiInstanceRequest = async <Response, Request>(
  url: string,
  data?: Request,
  method?: TMethods
): Promise<AxiosResponse<Response>> => {
  const meth = method || 'post'

  try {
    const res = (await apiInstanceMethodRequest<Request>(
      meth,
      url,
      data
    )) as AxiosResponse<Response>
    return res
  } catch (e) {
    console.error(e)
    throw new Error(String(e)) // { error: String(e) }
  }
}

export function doRequest<Response, Request>(url: string, method?: TMethods) {
  const loading = ref(false)
  const error = ref('')
  const data = ref<Response | undefined>(undefined)

  const mutate = async (values: Request) => {
    loading.value = true
    try {
      const response = await apiInstanceRequest<Response, Request>(
        url,
        values,
        method
      )
      data.value = response
    } catch (e) {
      error.value = String(e)
    } finally {
      loading.value = false
    }
  }

  return { loading, error, mutate, data }
}
