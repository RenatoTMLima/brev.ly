import { toLink } from '../components/models/toLink'
import type { GetLinksResponse } from '../types/link'
import { api } from './fetcher'

export const getLinks = async () => {
  const result = await api<GetLinksResponse>('link')

  return result.links.map(link => toLink(link))
}
