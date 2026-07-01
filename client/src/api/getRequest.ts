import { onMounted, ref } from 'vue'

import { router } from '@/router'

import { BASE_URL, refresh } from './base'

const getRequest = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem('token')

  const headerAuthorization: { Authorization?: string } = {}

  if (token) {
    headerAuthorization['Authorization'] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        ...headerAuthorization,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (res.status === 401) {
      const responseRefresh = await refresh()

      if (responseRefresh.status !== 200) {
        localStorage.removeItem('token')
        router.replace({ name: 'Login' })
        console.error('error refresh')
        throw new Error('Error refresh') // { error: 'Error refresh' }
      }

      const { token } = await responseRefresh.json()
      localStorage.setItem('token', token)
      return getRequest(url)
    }

    const response = await res.json()
    return response
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
