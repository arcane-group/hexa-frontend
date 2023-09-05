import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

import { PasswordInput } from '@/components/Form/PasswordInput'
import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { useAccountLogin } from '@/hooks/useLogin'

export const SignInForm = observer(() => {
  const { i18n } = useLingui()

  const { query } = useRouter()

  const loginFn = useAccountLogin()

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .default('')
        .email(t`Please enter a valid email`)
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

          const res = await loginFn(values.email, values.password)
          if (res?.code >= 0) {
            resetForm({
              values: initialValues,
            })
          } else {
            setFieldError('password', res?.msg || t`Email or Password error`)
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'30px'}>
          <FormControl name='email' label={t`Email`}>
            <TextInput name='email' />
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
            <PasswordInput name='password' type='password' />
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
})
