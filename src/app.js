import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { requestLogger } from './middleware/logger.js'
import errors from './middleware/errors.js'
import apiService from './service/api.js'
import demoService from './service/demo.js'

export const createApp = () => {
  const app = new Hono()
    .use(cors())
    .use(requestLogger)
    .use(errors)

  app.get('/api', apiService)
  app.get('/demo', demoService)

  return app
}

export default createApp
