import Cookies from 'js-cookie'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const { cookiePrefix } = publicRuntimeConfig

export function setCookie(
  name: string,
  value: any,
  day = 0,
  options: Cookies.CookieAttributes = {}
): void {
  if (typeof window === 'undefined') {
    return
  }
  const prefix = cookiePrefix ?? ''
  Cookies.set(prefix + name, value, {
    expires: day,
    ...options,
  })
}

export function getCookie(name: string): string | undefined {
  if (typeof window === 'undefined') {
    return
  }
  const prefix = cookiePrefix ?? ''
  return Cookies.get(prefix + name)
}

export function removeCookie(name: string, options?: Cookies.CookieAttributes): void {
  if (typeof window === 'undefined') {
    return
  }
  const prefix = cookiePrefix ?? ''
  Cookies.remove(prefix + name, options)
}
