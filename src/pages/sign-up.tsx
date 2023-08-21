import { Box } from '@chakra-ui/react'

import { Container } from '@/components/Sign/Container'
import { ConnectWallet, OrLine } from '@/components/Sign/ConnectWallet'
import { SignUpForm } from '@/components/Sign/SignUpForm'

const Page = () => {
  return (
    <>
      <Container>
        <Box w='420px' maxW='100%' pt='0px'>
          <SignUpForm />
          <OrLine />
          <ConnectWallet />
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Sign Up',
      headerPosition: 'relative',
    },
  }
}
