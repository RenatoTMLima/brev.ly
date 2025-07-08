import { api } from './fetcher'

export const incrementLinkAccess = async (id: string) => {
  await api(`access/${id}`, { method: 'PATCH' })
}
