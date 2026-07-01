export const BASE_URL = 'http://localhost:4444'

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
