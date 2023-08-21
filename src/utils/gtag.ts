import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', publicRuntimeConfig.gtag, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category?: string
  label?: string
  value?: string
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
