import { Center, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { Container } from '@/components/Sign/Container'
import { LineButton } from '@/components/LineButton'
import { verifyEmail } from '@/services/user'

const Page = () => {
  useLingui()

  const {
    replace,
    query: { redirectTo, code },
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
            onClick={async () => {
              const codeStr = Array.isArray(code) ? code[0] : code
              if (!codeStr) {
                toast.error(t`Invalid link, please get it again in the mailbox`)
                return
              }

              const res = await verifyEmail(codeStr)
              if (res.data?.code >= 0) {
                const redirectToUri =
                  (Array.isArray(redirectTo) ? redirectTo[0] : redirectTo) || '/'
                console.log('run 已登录，重定向跳转:', redirectToUri)

                replace(redirectToUri)
                return
              }
              toast.error(res?.data?.msg || t`Failed to bind mailbox`)
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
