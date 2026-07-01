import type { IApiError, IUserData, IUserDto } from '@/types'

import { BASE_URL } from './base'

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
