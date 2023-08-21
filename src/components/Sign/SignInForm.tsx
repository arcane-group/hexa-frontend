import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { login } from '@/services/user'

export const SignInForm = () => {
  const { i18n } = useLingui()

  const { query } = useRouter()

  const validationSchema = useMemo(() => {
    return Yup.object({
      username: Yup.string()
        .default('')
        .required(t`Please enter`),
      password: Yup.string()
        .default('')
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

          const res = await login(values.username, values.password).catch(() => {
            return null
          })
          if (res?.data?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            toast.success(t`Login success`)
          } else {
            setFieldError('password', res?.data?.msg || t`Wrong username, email or password`)
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'30px'}>
          <FormControl name='username' label={t`Username or Email`}>
            <TextInput name='username' />
          </FormControl>
          <FormControl
            name='password'
            label={t`Password`}
            helperText={
              <Link
                color='#C29B60'
                href={{
                  pathname: '/sign-up',
                  query: query,
                }}
                textStyle={'smp'}
              >{t`Don’t have an account yet? Sign up here`}</Link>
            }
          >
            <TextInput name='password' type='password' />
          </FormControl>
          <SubmitButton w='100%' mt='5px'>{t`Sign In`}</SubmitButton>
        </Stack>
      </Formik>
      <Box mt='10px'>
        <Link
          w='max-content'
          color='#C29B60'
          href='/forgot-password'
          textStyle={'smp'}
        >{t`Forgot your password?`}</Link>
      </Box>
    </Box>
  )
}
