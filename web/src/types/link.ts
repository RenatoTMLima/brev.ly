export type LinkResponse = {
  id: string
  originalLink: string
  shortLink: string
  accessNumber: number
}

export type Link = {
  id: string
  originalLink: string
  shortLink: string
  shortLinkName: string
  accessNumber: number
}

export type GetLinksResponse = {
  links: LinkResponse[]
}
