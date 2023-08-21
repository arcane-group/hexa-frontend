import { i18n } from '@lingui/core'
import { useEffect } from 'react'

import { messages } from '../locale/en/messages.js'

export const DEFAULT_LOCALE = 'en'

const LOCAL_STORE_KEY = 'HEXA_HUB_LOCALE_LANG'

i18n.loadAndActivate({ locale: DEFAULT_LOCALE, messages })

export async function dynamicActivateLanguage (locale: string) {
  const { messages } = await import(`../locale/${locale}/messages.js`)
  i18n.loadAndActivate({ locale, messages })
  localStorage.setItem(LOCAL_STORE_KEY, locale)
}

export function useLinguiInit () {
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCAL_STORE_KEY) || getPCLang() || DEFAULT_LOCALE
    localStorage.setItem(LOCAL_STORE_KEY, savedLocale)
    if (savedLocale !== i18n.locale) {
      dynamicActivateLanguage(savedLocale).catch(e => console.error(e))
    }
  }, [])

  return i18n
}

function getPCLang () {
  if (typeof window === 'undefined') {
    return ''
  }
  let lang = window?.navigator?.language || (window?.navigator as any)?.userLanguage
  return lang ? `${lang}`?.split('-')?.[0] || '' : ''
}
