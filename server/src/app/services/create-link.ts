import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq, or } from 'drizzle-orm'
import z from 'zod'

const createLinkInput = z.object({
  originalLink: z.string().url(),
  shortLink: z.string(),
})

export type CreateLinkInput = z.infer<typeof createLinkInput>

type CreatedLink = {
  id: string
}

export const createLink = async (
  input: CreateLinkInput
): Promise<Either<Error, CreatedLink>> => {
  const { originalLink, shortLink } = createLinkInput.parse(input)

  const result = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
    })
    .from(schema.links)
    .where(eq(schema.links.shortLink, input.shortLink))

  if (result.length) return makeLeft(new Error('Link already exists'))

  const createdLink = await db
    .insert(schema.links)
    .values({
      originalLink,
      shortLink,
    })
    .returning({ id: schema.links.id })

  return makeRight({
    id: createdLink[0].id,
  })
}
