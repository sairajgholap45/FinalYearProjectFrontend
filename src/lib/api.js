const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const parseResponse = async (response) => {
  const responseText = await response.text()

  if (!responseText) {
    return null
  }

  try {
    return JSON.parse(responseText)
  } catch {
    return responseText
  }
}

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      (typeof data === 'string' ? data : '') ||
      `Request failed (${response.status})`

    const error = new Error(message)
    error.response = response
    error.data = data
    throw error
  }

  return data
}

export const API_ROOT = API_BASE_URL
