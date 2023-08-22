import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { EditAvatar } from '@/components/Profile/EditAvatar'
import { EditName } from '@/components/Profile/EditName'
import { EditPsd } from '@/components/Profile/EditPsd'
import { VerifyLogin } from '@/components/Layout/VerifyLogin'
import { NoSSR } from '@/components/NoSSRWrapper'
import { useStore } from '@/stores'
import { observer } from 'mobx-react-lite'

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
        <Text textStyle={'ch2'}>{t`Edit profile`}</Text>
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
          <Box w='426px' minH='100vh' maxW='100%' m='auto' py='126px'>
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
