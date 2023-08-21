import { useRouter } from 'next/router'
import { computed } from 'mobx'
import { useLayoutEffect, useMemo } from 'react'
import PubSub from 'pubsub-js'

import { useStore } from '@/stores'
import { type PageType } from '@/stores/pageStore'
import { PAGE_EVENT } from '@/constants/page'

// 需要 import { observer } from 'mobx-react-lite' 包裹
export function usePageStore<T = PageType> (key: string) {
  const { pathname } = useRouter()
  const { pageStore } = useStore()

  const pathKey = usePathKey(key)

  const curPageStore = computed(() => {
    return pageStore.getHistory(pathKey, pathname) as T
  }).get()

  return curPageStore as T
}

export function useInitSetPageScroll () {
  const { pageStore } = useStore()
  const router = useRouter()

  useLayoutEffect(() => {
    const pathKey = window.pageScrollCurKey
    // console.log('useLayoutEffect pathKey:', pathKey)
    if (pathKey) {
      const initTop = pageStore?.getPageScrollTop(pathKey)
      window.scrollTo(0, initTop)
      PubSub.publishSync(PAGE_EVENT.CHANGE_PAGE_SCROLL_NUM, initTop)
      console.log('useLayoutEffect 设置滚动条:', pathKey, initTop)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
}

export function useInitPageScroll (key: string) {
  const pathKey = usePathKey(key)

  useLayoutEffect(() => {
    window.pageScrollCurKey = pathKey

    // 页面卸载时，记录页面滚动条高度
    return () => {
      window.pageScrollCurKey = undefined
      PubSub.publishSync(PAGE_EVENT.PAGE_SCROLL, { key: pathKey })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const usePathKey = (key?: string) => {
  const { pathname } = useRouter()

  return useMemo(() => {
    return pathname + '_' + key
  }, [key, pathname])
}
