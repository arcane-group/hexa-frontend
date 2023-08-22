import { Box } from '@chakra-ui/react'

import { SignUpForm } from '@/components/Sign/SignUpForm'
import { VerifyLogin } from '@/components/Layout/VerifyLogin'
import { Container } from '@/components/Sign/Container'
import { NoSSR } from '@/components/NoSSRWrapper'

// TODO: 待判定 已绑定邮箱的情况下，是否需要跳转到首页
const Page = () => {
  return (
    <>
      <Container>
        <NoSSR>
          <VerifyLogin>
            <Box w='420px' maxW='100%' pt='80px'>
              <SignUpForm isLinkEmail />
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
      title: 'Link Email',
      headerPosition: 'relative',
    },
  }
}
