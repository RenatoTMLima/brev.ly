import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

export const deleteLink = async (
  id: string
): Promise<Either<Error, { id: string }>> => {
  const { links } = schema

  const result = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning({ id: links.id })

  if (result.length) return makeRight({ id: result[0].id })

  return makeLeft(new Error('Link not found'))
}
