import { Box } from '@chakra-ui/react'

import { Container } from '@/components/Sign/Container'
import { ConnectWallet, OrLine } from '@/components/Sign/ConnectWallet'
import { SignInForm } from '@/components/Sign/SignInForm'

const Page = () => {
  return (
    <>
      <Container>
        <Box w={{ lg: '420px' }} maxW='100%' pt={{ lg: '60px' }}>
          <SignInForm />
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
      title: 'Sign In',
      headerPosition: 'relative',
    },
  }
}
