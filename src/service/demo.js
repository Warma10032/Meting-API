import { html } from 'hono/html'
import { loadConfig } from '../config.js'

export default async (c) => {
  const config = loadConfig(c.env, c.req.url)
  const baseUrl = config.meting.url || new URL(c.req.url).origin

  const query = c.req.query()
  const server = query.server || 'netease'
  const type = query.type || 'search'
  const id = query.id || 'hello'

  return c.html(html`
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/meting@2.0.2/dist/Meting.min.js"></script>
</head>
<body>
  <meting-js
    server="${server}"
    type="${type}"
    id="${id}"
    api="${baseUrl}/api?server=:server&type=:type&id=:id&r=:r"
  />
</body>
</html>
  `)
}
