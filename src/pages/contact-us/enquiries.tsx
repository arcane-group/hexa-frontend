import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { Container } from '@/components/Sign/Container'
import { EnquiriesForm } from '@/components/ContactUs/Enquiries'
import px2vw from '@/utils/px2vw'

const Page = () => {
  useLingui()

  return (
    <>
      <Container
        spacing={{
          base: px2vw(20),
          lg: '52px',
        }}
      >
        <Box maxW='100%' pt={{ lg: '80px' }}>
          <Text textStyle={'ch2'} color='#000000' mb='20px' fontWeight={700}>{t`Enquiries`}</Text>
          <EnquiriesForm />
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Enquiries',
      headerPosition: 'relative',
    },
  }
}
