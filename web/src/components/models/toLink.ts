import type { Link, LinkResponse } from '../../types/link'
import { pathToShort } from '../../utils/pathToShort'

export const toLink = (link: LinkResponse): Link => {
  const shortLinkUrl = new URL(
    link.shortLink,
    import.meta.env.VITE_FRONTEND_URL
  )

  return {
    ...link,
    shortLink: shortLinkUrl.href,
    shortLinkName: pathToShort(shortLinkUrl.pathname),
  }
}
