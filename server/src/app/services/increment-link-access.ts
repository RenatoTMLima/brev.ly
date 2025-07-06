import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'
import { eq, sql } from 'drizzle-orm'

export const incrementLinkAccess = async (
  id: string
): Promise<Either<never, { accessNumber: number }>> => {
  const { links } = schema

  const result = await db
    .update(links)
    .set({
      accessNumber: sql`${links.accessNumber} + 1`,
    })
    .where(eq(links.id, id))
    .returning({
      accessNumber: links.accessNumber,
    })

  return makeRight({ accessNumber: result[0].accessNumber })
}
