import { Box, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import { useMemo, useRef, useState } from 'react'

import { TextInput } from '@/components/Form/Input'
import { FormControl } from '@/components/Form/FormControl'
import { Container, CountdownButton } from '@/components/Sign/Container'
import { forgotPasswordByEmail } from '@/services/user'
import px2vw from '@/utils/px2vw'

const Page = () => {
  useLingui()

  return (
    <>
      <Container>
        <Text
          w={{ lg: '80%' }}
          as='h2'
          textStyle={'ch2'}
          color='#000'
        >{t`Forgot your password? Please enter your email below to receive a password reset link.`}</Text>
        <Box w={{ lg: '420px' }} maxW='100%' mt={{ base: px2vw(30), lg: '30px' }}>
          <ForgotForm />
        </Box>
      </Container>
    </>
  )
}
export default Page

const ForgotForm = () => {
  const { i18n } = useLingui()

  const [isShow, setShow] = useState(false)

  const ref = useRef<{
    setCountdown: any
  }>(null)

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .default('')
        .email(t`Please enter a valid email`)
        .required(t`Please enter`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])
  const initialValues = validationSchema.getDefault()

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true)

          const res = await forgotPasswordByEmail(values.email)
          if (res?.data?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            ref.current?.setCountdown()
            setShow(true)
          } else {
            setFieldError('email', res?.data.msg || 'App error')
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'30px'}>
          <FormControl name='email' label={t`Email`}>
            <TextInput name='email' type='email' />
          </FormControl>
          <Field>
            {({ form: { isSubmitting, handleSubmit } }: any) => {
              return (
                <CountdownButton
                  ref={ref}
                  onClick={() => {
                    handleSubmit()
                    return false
                  }}
                  isLoading={isSubmitting}
                  w='100%'
                  mt='5px'
                  type='submit'
                >{t`Submit`}</CountdownButton>
              )
            }}
          </Field>
        </Stack>
      </Formik>
      {isShow ? (
        <Box
          mt='20px'
          w='max-content'
          textStyle={'p'}
        >{t`Please check your email for the reset link (maybe in spam).`}</Box>
      ) : null}
    </Box>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Forgot Password',
      headerPosition: 'relative',
    },
  }
}
