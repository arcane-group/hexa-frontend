// 咨询服务  token 会员专属
import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { Container } from '@/components/Sign/Container'
import { SupportForm } from '@/components/ContactUs/Support'

const Page = () => {
  useLingui()

  return (
    <>
      <Container spacing='52px'>
        <Box maxW='100%' pt='40px'>
          <Text
            textStyle={'ch2'}
            color='#000000'
            mb='20px'
            fontWeight={700}
          >{t`Looking for support?`}</Text>
          <SupportForm />
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Consultation Services',
      headerPosition: 'relative',
    },
  }
}
