import { api } from './fetcher'

type CreateLinkInput = {
  originalLink: string
  shortLink: string
}

export const createLink = async (input: CreateLinkInput) => {
  await api('link', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
