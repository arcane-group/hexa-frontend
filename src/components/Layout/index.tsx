import { type ResponsiveValue } from '@chakra-ui/react'
import type * as CSS from 'csstype'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { NoiseBg } from '@/components/NoiseBg'
import { useAutoLogin } from '@/hooks/useLogin'

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
  // 自动登录
  const autoLogin = useAutoLogin()
  useEffect(() => {
    autoLogin()
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
