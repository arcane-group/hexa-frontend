import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

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

          const res = await loginFn(values.username, values.password)
          if (res?.code >= 0) {
            resetForm({
              values: initialValues,
            })
          } else {
            setFieldError('password', res?.msg || t`Wrong username, email or password`)
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
})
