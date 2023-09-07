import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { observer } from 'mobx-react-lite'
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'

import { useStore } from '@/stores'

export const HasSBT = observer(({ children }: any) => {
  useLingui()

  const { asPath } = useRouter()

  const { walletStore } = useStore()

  if (walletStore?.userExtInfo?.whitelistStatus) {
    return <>{children}</>
  }

  if (walletStore?.userExtInfo?._id) {
    return (
      <Box textStyle={'cp'} pt='200px' textAlign={'center'}>
        {t`Oops! Looks like you aren’t a Hexa Hub member yet! Consultation services are only available to Hexa Hub members, for more info on Hexa Hub membership,`}
        <Link
          ml='4px'
          className='hover'
          color='#1ccadc'
          href='/contact-us/membership-application'
        >{t`click here`}</Link>
      </Box>
    )
  }

  return (
    <Box textStyle={'cp'} pt='200px' textAlign={'center'}>
      {t`Oops! Please`}
      <Link
        mx='4px'
        className='hover'
        color='#1ccadc'
        href={`/sign-in?redirectTo=${encodeURIComponent(asPath)}`}
      >{t`sign in`}</Link>
      {`and connect your wallet to verify membership.`}
    </Box>
  )
})
