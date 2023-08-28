import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { observer } from 'mobx-react-lite'

import { EditAvatar } from '@/components/Profile/EditAvatar'
import { EditName } from '@/components/Profile/EditName'
import { EditPsd } from '@/components/Profile/EditPsd'
import { VerifyLogin } from '@/components/Layout/VerifyLogin'
import { NoSSR } from '@/components/NoSSRWrapper'
import { useStore } from '@/stores'
import { px2vw } from '@/utils/px2vw'

const Info = observer(() => {
  const { walletStore } = useStore()

  if (!walletStore?.userExtInfo?.name) {
    return (
      <Text mt='55px'>{t`After binding the mailbox, you can modify the user name and password`}</Text>
    )
  }

  return (
    <>
      <Box mt='55px'>
        <Text textStyle={'ch2'}>{t`Edit Profile`}</Text>
      </Box>
      <Box mt='27px'>
        <EditName />
      </Box>
      <Box mt='65px'>
        <EditPsd />
      </Box>
    </>
  )
})

const Page = () => {
  useLingui()

  return (
    <>
      <NoSSR>
        <VerifyLogin>
          <Box
            w={{ lg: '426px' }}
            minH='100vh'
            maxW='100%'
            m='auto'
            py={{
              base: px2vw(30),
              lg: '126px',
            }}
            px={{
              base: px2vw(20),
              lg: 0,
            }}
          >
            <EditAvatar />
            <Info />
          </Box>
        </VerifyLogin>
      </NoSSR>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Edit Profile',
      headerPosition: 'relative',
    },
  }
}
