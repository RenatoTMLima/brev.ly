import { createLink } from '@/app/services/create-link'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a link',
        tags: ['links'],
        consumes: ['application/json'],
        body: z.object({
          originalLink: z.string().url(),
          shortLink: z.string(),
        }),
        response: {
          201: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body

      const createdLink = await createLink({ originalLink, shortLink })

      if (isRight(createdLink)) {
        return reply.status(201).send({ message: 'Link created successfully' })
      }

      const error = unwrapEither(createdLink)

      return reply.status(400).send({ message: error.message })
    }
  )
}
