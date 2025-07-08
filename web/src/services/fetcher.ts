export const api = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (init?.body) {
    init.headers = { 'content-type': 'application/json', ...init?.headers }
  }

  const result = await fetch(
    new URL(path, import.meta.env.VITE_BACKEND_URL),
    init
  )

  if (!result.ok) throw new Error('Fetch error')

  return result.status === 200 ? (result.json() as T) : (undefined as T)
}
