import { createLink } from '@/app/services/create-link'
import { deleteLink } from '@/app/services/delete-link'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:id',
    {
      schema: {
        summary: 'Delete a link',
        tags: ['links'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.void(),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink(id)

      if (isRight(result)) return reply.status(204).send()

      const error = unwrapEither(result)

      return reply.status(400).send({ message: error.message })
    }
  )
}
