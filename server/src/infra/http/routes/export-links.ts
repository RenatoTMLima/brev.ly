import { exportLinks } from '@/app/services/export-links'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/reports/links',
    {
      schema: {
        summary: 'Export links in CSV',
        tags: ['reports'],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportLinks()

      return reply.status(200).send(unwrapEither(result))
    }
  )
}
