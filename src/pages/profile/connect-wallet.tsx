import { Box } from '@chakra-ui/react'

import { Container } from '@/components/Sign/Container'
import { ConnectWallet } from '@/components/Sign/ConnectWallet'
import { VerifyLogin } from '@/components/Layout/VerifyLogin'
import { NoSSR } from '@/components/NoSSRWrapper'

// TODO: 待判定 已绑定钱包的情况下，是否需要跳转到首页
const Page = () => {
  return (
    <>
      <Container>
        <NoSSR>
          <VerifyLogin>
            <Box w='420px' maxW='100%' pt='80px'>
              <ConnectWallet isLinkWallet />
            </Box>
          </VerifyLogin>
        </NoSSR>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Connect Wallet',
      headerPosition: 'relative',
    },
  }
}
