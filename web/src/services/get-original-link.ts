import { toLink } from '../components/models/toLink'
import type { GetLinksResponse } from '../types/link'
import { api } from './fetcher'

export const getOriginalLink = async (shortLink: string) => {
  const result = await api<GetLinksResponse>(`link?shortLink=${shortLink}`)

  if (!result.links.length) throw new Error("Link doesn't exist")

  return toLink(result.links[0])
}
