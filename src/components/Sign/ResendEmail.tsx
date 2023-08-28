import { Box, Text, Center } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { sendVerifyEmail } from '@/services/user'
import { CountdownButton } from './Container'

export const ResendEmail = () => {
  useLingui()

  const {
    query: { email },
  } = useRouter()
  const emailStr = Array.isArray(email) ? email[0] : email

  return (
    <Center flexDir={'column'} minH='100%' h='max-content' w={{ lg: '80%' }}>
      <Text textStyle={'ch2'} color='#000'>
        {t`We have sent a verification link to ${
          emailStr || '--'
        }, please click on the link to complete the verification process.`}
        <br />
        {t`You might need to check your spam folder.`}
      </Text>
      <Box w='100%' mt='30px'>
        <CountdownButton
          minW='180px'
          onClick={async () => {
            if (emailStr) {
              const res = await sendVerifyEmail(emailStr)
              if (res?.data?.code >= 0) {
                return true
              }
              toast.error(res?.data?.msg || 'App error')
            }
            return false
          }}
        >{t`Resend Email`}</CountdownButton>
      </Box>
    </Center>
  )
}
