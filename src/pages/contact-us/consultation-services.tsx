import { Box, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { Container } from '@/components/Sign/Container'
import { SupportForm } from '@/components/ContactUs/Support'
import px2vw from '@/utils/px2vw'
import { HasSBT } from '@/components/Layout/HasSBT'

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
        <HasSBT tips={t`Consultation services`}>
          <Box maxW='100%' pt={{ lg: '40px' }}>
            <Text
              textStyle={'ch2'}
              color='#000000'
              mb='20px'
              fontWeight={700}
            >{t`Looking for support?`}</Text>

            <SupportForm />
          </Box>
        </HasSBT>
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
