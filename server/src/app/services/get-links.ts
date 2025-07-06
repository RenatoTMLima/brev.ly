import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import z from 'zod'

const getLinkInput = z.object({
  shortLink: z.string().url().optional(),
})

export type GetLinkInput = z.infer<typeof getLinkInput>

export type LinkResponse = {
  links: Array<Omit<typeof schema.links.$inferSelect, 'createdAt'>>
}

export const getLinks = async (
  shortLink?: string
): Promise<Either<never, LinkResponse>> => {
  const { links } = schema

  const result = await db
    .select({
      id: links.id,
      originalLink: links.originalLink,
      shortLink: links.shortLink,
      accessNumber: links.accessNumber,
    })
    .from(links)
    .where(shortLink ? eq(links.shortLink, shortLink) : undefined)

  return makeRight({ links: result })
}
