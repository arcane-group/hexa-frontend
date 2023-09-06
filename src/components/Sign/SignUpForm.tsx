import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { TC } from '@/components/Form/TC'
import { PasswordInput } from '@/components/Form/PasswordInput'
import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import {
  register,
  checkUsername,
  checkEmail,
  // linkEmail
} from '@/services/api/user'
import { useRouter } from 'next/router'

export const SignUpForm = ({ isLinkEmail }: { isLinkEmail?: boolean }) => {
  const { i18n } = useLingui()

  const [apiLoading, setApiLoading] = useState(false)
  const [apiLoading2, setApiLoading2] = useState(false)
  const [apiError, setApiError] = useState('')
  const [apiError2, setApiError2] = useState('')

  const { push } = useRouter()

  const validationSchema = useMemo(() => {
    return Yup.object({
      username: Yup.string()
        .default('')
        .required(t`Please enter`), // TODO: 是否需要其他校验规则
      email: Yup.string()
        .default('')
        .email(t`Please enter a valid email address`)
        .required(t`Please enter`),
      password: Yup.string()
        .default('')
        .required(t`Please enter`),
      password2: Yup.string()
        .default('')
        .required(t`Please enter`)
        .oneOf([Yup.ref('password')], t`Passwords must match`),
      readTC: Yup.boolean()
        .default(!!isLinkEmail)
        .oneOf([true], t`Please read and agree to the terms and conditions`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale, isLinkEmail])
  const initialValues = validationSchema.getDefault()

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true)

          // let fn = isLinkEmail ? linkEmail : register
          // const res = await fn(values.username, values.email, values.password).catch(() => {
          //   return null
          // })
          const res = await register(values.username, values.email, values.password)
          if (res?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            push({
              pathname: '/resend-email',
              query: {
                email: values.email,
              },
            })
          } else {
            setFieldError('readTC', res?.msg || t`Account registration failed`)
          }

          setSubmitting(false)
        }}
      >
        {({ setFieldError }) => {
          return (
            <Stack direction={'column'} spacing={'30px'}>
              <FormControl name='username' label={t`Username`}>
                <TextInput
                  isLoading={apiLoading}
                  name='username'
                  fieldCfg={{
                    validate: () => {
                      return apiError
                    },
                  }}
                  onBlur={async e => {
                    const value = e.target.value
                    if (value) {
                      setApiLoading(true)
                      const res = await checkUsername(value)
                      if (res?.code < 0) {
                        setFieldError('username', t`Username already taken`)
                        setApiError(t`Username already taken`)
                      } else {
                        setFieldError('username', '')
                        setApiError('')
                      }
                      setApiLoading(false)
                    }
                  }}
                />
              </FormControl>
              <FormControl name='email' label={t`Email`}>
                <TextInput
                  isLoading={apiLoading2}
                  name='email'
                  type='email'
                  fieldCfg={{
                    validate: () => {
                      return apiError2
                    },
                  }}
                  onBlur={async e => {
                    const value = e.target.value
                    if (value) {
                      setApiLoading2(true)
                      const res = await await checkEmail(value)
                      if (res?.code < 0) {
                        setFieldError('email', t`Email already registered`)
                        setApiError2(t`Email already registered`)
                      } else {
                        setFieldError('email', '')
                        setApiError2('')
                      }
                      setApiLoading2(false)
                    }
                  }}
                />
              </FormControl>
              <FormControl name='password' label={t`Password`}>
                <PasswordInput name='password' type='password' />
              </FormControl>
              <FormControl name='password2' label={t`Confirm Password`}>
                <PasswordInput name='password2' type='password' />
              </FormControl>
              <FormControl name='readTC'>{isLinkEmail ? null : <TC name='readTC' />}</FormControl>
              <SubmitButton
                w='100%'
                mt='5px'
                isDisabled={apiLoading || apiLoading2 || !!apiError || !!apiError2}
              >
                {apiError || apiError2 || (isLinkEmail ? t`Confirm` : t`Sign Up`)}
              </SubmitButton>
            </Stack>
          )
        }}
      </Formik>
    </Box>
  )
}
