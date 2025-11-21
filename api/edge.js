import { createApp } from '../src/app.js'
import { stripPrefix } from '../src/utils/prefix.js'
import { Readable } from 'node:stream'

const app = createApp()

export const config = {
  runtime: 'nodejs'
}

// 将 Node 的 req/res 桥接为 Fetch 风格，便于复用 Hono 应用
export default async function handler (req, res) {
  const env = typeof process !== 'undefined' ? process.env : {}
  const url = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`

  const init = {
    method: req.method,
    headers: req.headers
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req
    // Node 的可读流作为 Request body 时需要声明 duplex
    init.duplex = 'half'
  }

  const request = new Request(url, init)
  const normalizedRequest = stripPrefix(request, env)
  const response = await app.fetch(normalizedRequest, env)

  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))

  if (!response.body) {
    res.end()
    return
  }

  // Web ReadableStream -> Node Readable 再写回响应
  const stream = Readable.fromWeb(response.body)
  stream.pipe(res)
}
