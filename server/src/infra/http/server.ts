import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { accessLinkRoute } from './routes/access-link'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { getLinksRoute } from './routes/get-links'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.register(fastifyCors, { origin: '*' })
server.register(fastifyMultipart)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error))
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    })

  // Very unexpected error: send to monitor tool (Sentry/Datadog/Grafana)
  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

// Register Routes
server.register(createLinkRoute)
server.register(deleteLinkRoute)
server.register(getLinksRoute)
server.register(accessLinkRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!!!')
})
