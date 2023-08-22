import { Center } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/stores'

export const VerifyLogin = observer(({ children }: { children: any }) => {
  useLingui()

  const { walletStore } = useStore()

  if (!walletStore?.userInfo?.token) {
    return <Center pt='110px'>{t`Please log in first`}</Center>
  }

  return children
})
