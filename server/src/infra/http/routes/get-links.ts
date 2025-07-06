import { createLink } from '@/app/services/create-link'
import { getLinks } from '@/app/services/get-links'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

const linkSchema = z.object({
  id: z.string(),
  originalLink: z.string(),
  shortLink: z.string(),
  accessNumber: z.number(),
})

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link',
    {
      schema: {
        summary: 'Get all links',
        tags: ['links'],
        consumes: ['application/json'],
        querystring: z.object({
          shortLink: z.string().optional(),
        }),
        response: {
          200: z.object({ links: z.array(linkSchema) }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.query

      const result = await getLinks(shortLink)

      return reply.status(200).send(unwrapEither(result))
    }
  )
}
