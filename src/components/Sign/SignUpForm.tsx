import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { TC } from '@/components/Form/TC'
import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { register, checkUsername, checkEmail, linkEmail } from '@/services/user'
import { useRouter } from 'next/router'

export const SignUpForm = ({ isLinkEmail }: { isLinkEmail?: boolean }) => {
  const { i18n } = useLingui()

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

          let fn = isLinkEmail ? linkEmail : register
          const res = await fn(values.username, values.email, values.password).catch(() => {
            return null
          })
          if (res?.data?.code >= 0) {
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
            setFieldError('readTC', res?.data?.msg || t`Account registration failed`)
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'30px'}>
          <FormControl name='username' label={t`Username`}>
            <TextInput
              name='username'
              fieldCfg={{
                validate: async value => {
                  let errorMsg: string | undefined = undefined
                  if (value) {
                    const isAvailable = await checkUsername(value)
                    if (!isAvailable) {
                      errorMsg = t`Username already taken`
                    }
                  }
                  return errorMsg
                },
              }}
            />
          </FormControl>
          <FormControl name='email' label={t`Email`}>
            <TextInput
              name='email'
              type='email'
              fieldCfg={{
                validate: async value => {
                  let errorMsg: string | undefined = undefined
                  if (value) {
                    const isAvailable = await checkEmail(value)
                    if (!isAvailable) {
                      errorMsg = t`Email already registered`
                    }
                  }
                  return errorMsg
                },
              }}
            />
          </FormControl>
          <FormControl name='password' label={t`Password`}>
            <TextInput name='password' type='password' />
          </FormControl>
          <FormControl name='readTC'>{isLinkEmail ? null : <TC name='readTC' />}</FormControl>
          <SubmitButton w='100%' mt='5px'>
            {isLinkEmail ? t`Confirm` : t`Sign Up`}
          </SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}
