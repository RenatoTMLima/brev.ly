import { api } from './fetcher'

export const deleteLink = async (id: string) => {
  await api(`link/${id}`, {
    method: 'DELETE',
  })
}
