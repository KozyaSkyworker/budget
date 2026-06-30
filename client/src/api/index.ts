import { router } from '@/router'

import type {
  IApiError,
  ITransaction,
  IUser,
  IUserData,
  IUserDto
} from '@/types'

const BASE_URL = 'http://localhost:4444'

export const login = async ({
  username,
  password
}: IUserData): Promise<IUserDto | IApiError> => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })

    const response = await res.json()
    return response
  } catch (e) {
    console.error(e)
    return { error: String(e) }
  }
}

export const registration = async ({
  username,
  password
}: IUserData): Promise<IUserDto | IApiError> => {
  try {
    const res = await fetch(`${BASE_URL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })
    const response = await res.json()
    return response
  } catch (e) {
    console.error(e)
    return { error: String(e) }
  }
}

export const getUser = async (): Promise<IUser | IApiError> => {
  const token = localStorage.getItem('token')

  const headerAuthorization: { Authorization?: string } = {}

  if (token) {
    headerAuthorization['Authorization'] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${BASE_URL}/me`, {
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
        return { error: 'Error refresh' }
      }

      const { token } = await responseRefresh.json()
      localStorage.setItem('token', token)
      return getUser()
    }

    const response = await res.json()
    return response
  } catch (e) {
    console.error(e)
    return { error: String(e) }
  }
}

export const getTransactions = async (): Promise<
  ITransaction[] | IApiError
> => {
  const token = localStorage.getItem('token')

  const headerAuthorization: { Authorization?: string } = {}

  if (token) {
    headerAuthorization['Authorization'] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${BASE_URL}/transactions`, {
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
        return { error: 'Error refresh' }
      }

      const { token } = await responseRefresh.json()
      localStorage.setItem('token', token)
      return getTransactions()
    }

    const response = await res.json()
    return response
  } catch (e) {
    console.error(e)
    return { error: String(e) }
  }
}

const refresh = async () => {
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
