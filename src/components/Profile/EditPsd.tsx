import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'

import { PasswordInput } from '@/components/Form/PasswordInput'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { editInfo } from '@/services/api/user'
import { useStore } from '@/stores'
import { useLogout } from '@/hooks/useLogin'

export const EditPsd = observer(() => {
  const { i18n } = useLingui()

  const { walletStore } = useStore()

  const logoutFn = useLogout()

  const validationSchema = useMemo(() => {
    return Yup.object({
      existingPassword: Yup.string()
        .default('')
        .required(t`Please enter`),
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

  return (
    <Box>
      <Text
        mb='12px'
        textStyle={'ch1'}
        color={'#595959'}
        fontWeight={400}
      >{t`Change Password`}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true)

          const res = await editInfo(`${walletStore?.userInfo?.userId}`, {
            password: values.password,
          }).catch(() => {
            return null
          })
          if (res && res?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            toast.success(t`Success`)

            logoutFn?.()
          } else {
            setFieldError('password2', res?.data?.msg || 'App error')
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'20px'}>
          <FormControl name='existingPassword' label={t`Existing Password`}>
            <PasswordInput name='existingPassword' type='password' />
          </FormControl>
          <FormControl name='password' label={t`New password`}>
            <PasswordInput name='password' type='password' />
          </FormControl>
          <FormControl name='password2' label={t`Confirm New Password`}>
            <PasswordInput name='password2' type='password' />
          </FormControl>

          <SubmitButton w='100%' mt='30px'>
            {t`Submit`}
          </SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
})
