import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { env } from '@/env'

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
  transform: jsonSchemaTransform
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

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!!!')
})
