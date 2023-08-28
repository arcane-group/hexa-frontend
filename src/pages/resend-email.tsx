import { Box } from '@chakra-ui/react'

import { Container } from '@/components/Sign/Container'
import { ResendEmail } from '@/components/Sign/ResendEmail'

const Page = () => {
  return (
    <>
      <Container>
        <Box maxW={{ lg: '80%' }} pt='0px'>
          <ResendEmail />
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Resend Email',
      headerPosition: 'relative',
    },
  }
}
