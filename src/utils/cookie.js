/**
 * 从环境变量读取指定平台的 cookie。
 * 优先读取 METING_COOKIE_<SERVER>，其次 METING_COOKIE。
 */
export function readCookie (server, env) {
  const envSource = env ?? (typeof process !== 'undefined' ? process.env : {}) ?? {}
  const envKey = `METING_COOKIE_${server.toUpperCase()}`
  const value = envSource[envKey] || envSource.METING_COOKIE || ''
  return value.trim()
}

/**
 * 验证 referrer 是否在允许的主机列表。
 */
export function isAllowedHost (referrer, allowHosts = []) {
  if (!allowHosts || allowHosts.length === 0) return true
  if (!referrer) return false

  try {
    const url = new URL(referrer)
    const hostname = url.hostname.toLowerCase()
    return allowHosts.includes(hostname)
  } catch (error) {
    return false
  }
}
