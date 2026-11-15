export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
const TOKEN_KEY = 'opot_admin_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY))

export async function api(path, { body, ...options } = {}) {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  })
  if (res.status === 401 && token && !path.startsWith('/auth')) {
    setToken(null)
    window.dispatchEvent(new Event('opot:logout'))
  }
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try { message = (await res.json()).message || message } catch { /* not JSON */ }
    throw new Error(message)
  }
  return res.status === 204 ? null : res.json()
}

export const login = (email, password) => api('/auth/login', { method: 'POST', body: { email, password } })

// Uploads a file to Cloudinary using a signature from the backend; returns the hosted URL.
export async function uploadFile(file) {
  const sig = await api('/admin/media/signature')
  const form = new FormData()
  form.append('file', file)
  form.append('api_key', sig.apiKey)
  form.append('timestamp', sig.timestamp)
  form.append('signature', sig.signature)
  form.append('folder', sig.folder)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, { method: 'POST', body: form })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Upload failed')
  return data.secure_url
}
