const generateRequestId = () => Math.random().toString(36).substring(7)

const requestLogger = async (c, next) => {
  const requestId = generateRequestId()
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now()

  c.set('logger', logger)
  c.set('requestId', requestId)
  c.header('x-request-id', requestId)

  await next()

  const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const responseTime = Math.round(endTime - startTime)

  try {
    console.log(
      '[request]',
      JSON.stringify({
        id: requestId,
        method: c.req.method,
        path: c.req.path,
        status: c.res?.status,
        responseTime
      })
    )
  } catch (e) {
    // console logging best-effort
  }
}

const logger = {
  info: (...args) => console.log(...args),
  error: (...args) => console.error(...args)
}

export { requestLogger, logger }
