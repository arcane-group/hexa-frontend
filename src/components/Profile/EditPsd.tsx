import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { toast } from 'react-toastify'

export const EditPsd = () => {
  const { i18n } = useLingui()

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

          // TODO: 没有写接口
          const fn = (p1: string, p2: string) =>
            Promise.resolve({ data: { code: 1, data: `${p1}${p2}`, msg: '' } })
          const res = await fn(values.existingPassword, values.password).catch(() => {
            return null
          })
          if (res && res?.data?.code >= 0) {
            resetForm({
              values: initialValues,
            })
            // TODO: 重新请求用户信息  或者 直接刷新本地数据
            toast.success(t`Success`)
          } else {
            setFieldError('password2', res?.data?.msg || 'App error')
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'20px'}>
          <FormControl name='existingPassword' label={t`Existing Password`}>
            <TextInput name='existingPassword' type='password' />
          </FormControl>
          <FormControl name='password' label={t`New password`}>
            <TextInput name='password' type='password' />
          </FormControl>
          <FormControl name='password2' label={t`Confirm New Password`}>
            <TextInput name='password2' type='password' />
          </FormControl>

          <SubmitButton w='100%' mt='30px'>
            {t`Submit`}
          </SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}
