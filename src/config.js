export const loadConfig = (env, requestUrl) => {
  const envSource = env ?? (typeof process !== 'undefined' ? process.env : {}) ?? {}
  const prefix = envSource.HTTP_PREFIX || ''
  const origin = new URL(requestUrl).origin
  const baseUrl = envSource.METING_URL || `${origin}${prefix}`

  return {
    http: {
      prefix
    },
    meting: {
      url: baseUrl,
      token: envSource.METING_TOKEN || 'token',
      cookie: {
        allowHosts: envSource.METING_COOKIE_ALLOW_HOSTS
          ? envSource.METING_COOKIE_ALLOW_HOSTS.split(',').map(h => h.trim().toLowerCase())
          : []
      }
    }
  }
}
