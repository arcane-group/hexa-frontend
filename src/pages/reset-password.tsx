import { Box, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { SubmitButton } from '@/components/Form/SubmitButton'
import { TextInput } from '@/components/Form/Input'
import { FormControl } from '@/components/Form/FormControl'
import { Container } from '@/components/Sign/Container'
import { resetPassword } from '@/services/user'

const Page = () => {
  const {
    query: { name, code },
  } = useRouter()

  return (
    <>
      <Container>
        <Text as='h2' textStyle={'ch2'} color='#000'>
          {name}
        </Text>
        <Box w='420px' maxW='100%' mt='30px'>
          <ResetForm code={Array.isArray(code) ? code[0] : code} />
        </Box>
      </Container>
    </>
  )
}
export default Page

const ResetForm = ({ code }: { code?: string }) => {
  const { i18n } = useLingui()

  const [isShow, setShow] = useState(false)

  // 写一个 validationSchema 需要让 password 和 password2 相等
  const validationSchema = useMemo(() => {
    return Yup.object({
      password: Yup.string()
        .default('')
        .required(t`Please enter`),
      password2: Yup.string()
        .default('')
        .required(t`Please enter`)
        .oneOf([Yup.ref('password')], t`Passwords must match`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  const initialValues = validationSchema.getDefault()

  if (isShow) {
    return (
      <Box>
        <Text textStyle={'cp'} w='max-content'>{t`You have successfully reset your password`}</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true)

          if (!code) {
            toast.error(t`Invalid link, please get it again in the mailbox`)
            return
          }

          const res = await resetPassword(code, values.password)
          if (res?.data?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            setShow(true)
          } else {
            setFieldError('password2', res?.data.msg || 'App error')
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'30px'}>
          <FormControl name='password' label={t`New password`}>
            <TextInput name='password' type='password' />
          </FormControl>
          <FormControl name='password2' label={t`Confirm new password`}>
            <TextInput name='password2' type='password' />
          </FormControl>
          <SubmitButton w='full'>{t`Reset Password`}</SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Reset Password',
      headerPosition: 'relative',
    },
  }
}
