import { createApp } from './app.js'
import { stripPrefix } from './utils/prefix.js'

const app = createApp()

export default {
  async fetch (request, env, ctx) {
    const normalizedRequest = stripPrefix(request, env)
    return app.fetch(normalizedRequest, env, ctx)
  }
}
