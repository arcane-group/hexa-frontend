import axios from 'axios'
import getConfig from 'next/config'
import { i18n } from '@lingui/core'

import { store } from '@/stores'

const { publicRuntimeConfig } = getConfig()

const service = axios.create({
  baseURL: publicRuntimeConfig.api.base,
  timeout: 6000,
})

service.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      config.headers = {}
    }
    config.headers['language'] = i18n?.locale || 'en'

    try {
      const { token } = store?.walletStore?.userInfo || {}
      if (token) {
        config.headers['token'] = token
      }
    } catch (e) {}

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // console.log('api error:', error)
    // return Promise.reject(error)
    return error?.response
  }
)

export default service
