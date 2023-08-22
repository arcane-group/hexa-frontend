import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { Container } from '@/components/Sign/Container'
import { ApplicationForm } from '@/components/ContactUs/Application'

const Page = () => {
  useLingui()

  return (
    <>
      <Container spacing='52px'>
        <Box w='100%' maxW='100%' pt='0px'>
          <Text
            textStyle={'ch2'}
            color='#000000'
            mb='20px'
            fontWeight={700}
          >{t`Hexa Hub Membership Application`}</Text>
          <ApplicationForm />
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Membership Application',
      headerPosition: 'relative',
    },
  }
}
