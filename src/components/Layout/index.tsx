import { type ResponsiveValue } from '@chakra-ui/react'
import type * as CSS from 'csstype'
import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useThrottleFn } from 'ahooks'
import PubSub from 'pubsub-js'

import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { NoiseBg } from '@/components/NoiseBg'
import { useAutoLogin } from '@/hooks/useLogin'
import { PAGE_EVENT } from '@/constants/page'
import { useStore } from '@/stores'

const Layout = ({
  ignoreHeader,
  headerPosition,
  ignoreFooter,
  children,
}: {
  children: any
  ignoreHeader?: boolean
  headerPosition?: ResponsiveValue<CSS.Property.Position>
  ignoreFooter?: boolean
}) => {
  const { pageStore } = useStore()

  // 自动登录
  const autoLogin = useAutoLogin()
  useEffect(() => {
    autoLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routerDataRef = useRef<{
    value: number
  }>({
    value: 0,
  })

  const { run: runScroll } = useThrottleFn(
    () => {
      routerDataRef.current.value = window.scrollY
    },
    { wait: 500 }
  )
  useEffect(() => {
    const dom = window.document
    if (dom) {
      dom.addEventListener('scroll', runScroll)
    }
    const fn = (_msg: any, { key, value = routerDataRef.current?.value || 0 }: any) => {
      console.log('记录滚动条位置 key:', key, ' value:', value)
      pageStore.setPageScrollTop(key, value)
    }
    const fn1 = (_msg: any, value: number) => {
      routerDataRef.current.value = value
    }
    PubSub.subscribe(PAGE_EVENT.PAGE_SCROLL, fn)
    PubSub.subscribe(PAGE_EVENT.CHANGE_PAGE_SCROLL_NUM, fn1)
    return () => {
      dom && dom.removeEventListener('scroll', runScroll)
      PubSub.unsubscribe(fn)
      PubSub.unsubscribe(fn1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoiseBg />
      <Box pos='relative' zIndex={1}>
        {!ignoreHeader ? <Header headerPosition={headerPosition} /> : null}
        {children}
        {!ignoreFooter ? <Footer /> : null}
      </Box>
    </>
  )
}

export default observer(Layout)
