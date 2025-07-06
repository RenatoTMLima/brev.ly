import { incrementLinkAccess } from '@/app/services/increment-link-access'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const accessLinkRoute: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/access/:id',
    {
      schema: {
        summary: 'Increase the total amount of access a link had',
        tags: ['access'],
        consumes: ['application/json'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      await incrementLinkAccess(id)

      return reply.status(204).send()
    }
  )
}
