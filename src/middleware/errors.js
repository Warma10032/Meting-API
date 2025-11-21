import { logger as baseLogger } from './logger.js'

export default async (c, next) => {
  try {
    await next()
  } catch (err) {
    const status = err?.status || 500
    const requestLogger = c.get('logger') ?? baseLogger
    const requestId = c.get('requestId')

    const logPayload = {
      error: {
        message: err?.message,
        stack: err?.stack,
        name: err?.name,
        status
      },
      request: {
        method: c.req.method,
        path: c.req.path,
        query: c.req.query(),
        userAgent: c.req.header('user-agent'),
        ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown',
        requestId
      }
    }

    requestLogger.error(logPayload, 'request error')

    c.header('x-error-message', err?.message || 'internal error')
    return c.text('server error', status)
  }
}
