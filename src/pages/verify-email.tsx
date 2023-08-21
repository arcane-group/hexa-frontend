import { Center, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'

import { Container } from '@/components/Sign/Container'
import { LineButton } from '@/components/LineButton'

const Page = () => {
  useLingui()

  const {
    replace,
    query: { redirectTo },
  } = useRouter()

  const email = '--'

  return (
    <>
      <Container>
        <Center flexDir={'column'} minH='100%' h='max-content' w='80%'>
          <Text as='h2' textStyle={'ch1'} color='#000'>{t`Verify your email address`}</Text>
          <Text textStyle={'ch2'} color='#616161'>
            {t`you have entered ${email} as the email address for your Hexa account, please verify the email by clicking the below.`}
          </Text>
          <LineButton
            minW='200px'
            mt='30px'
            color='#000'
            onClick={() => {
              console.log('verify email')

              // TODO: 用 code 去登录的逻辑

              const redirectToUri = (Array.isArray(redirectTo) ? redirectTo[0] : redirectTo) || '/'
              console.log('run 已登录，重定向跳转:', redirectToUri)

              replace(redirectToUri)
            }}
          >{t`Verify your Email`}</LineButton>
        </Center>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Verify Email',
      headerPosition: 'relative',
    },
  }
}
