import { handle } from 'hono/adapter/vercel'
import { createApp } from '../src/app.js'
import { stripPrefix } from '../src/utils/prefix.js'

const app = createApp()

export const config = {
  runtime: 'edge'
}

export default (request) => {
  const env = typeof process !== 'undefined' ? process.env : {}
  const normalizedRequest = stripPrefix(request, env)
  return handle(app)(normalizedRequest)
}
