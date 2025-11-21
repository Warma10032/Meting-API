export const stripPrefix = (request, env = {}) => {
  const prefixEnv = env?.HTTP_PREFIX || ''
  if (!prefixEnv) return request

  const url = new URL(request.url)
  if (!url.pathname.startsWith(prefixEnv)) return request

  url.pathname = url.pathname.slice(prefixEnv.length) || '/'
  return new Request(url.toString(), request)
}
