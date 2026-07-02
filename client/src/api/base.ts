import axios, { AxiosError } from 'axios'

export const BASE_URL = 'http://localhost:4444'

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

let isRefreshing = false
let failedQueue: {
  resolve: (token: string | null) => void
  reject: (err: AxiosError | null) => void
}[] = []

const processQueue = (error: AxiosError | null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

apiInstance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/refresh') return response
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return apiInstance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await apiInstance.post('/refresh')

        const newToken = data.token
        localStorage.setItem('token', newToken)
        apiInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`

        processQueue(null, newToken)
        return apiInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        localStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export const refresh = async () => {
  const token = localStorage.getItem('token')

  const headerAuthorization: { Authorization?: string } = {}

  if (token) {
    headerAuthorization['Authorization'] = `Bearer ${token}`
  }
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headerAuthorization
    },
    credentials: 'include'
  })

  return response
}
