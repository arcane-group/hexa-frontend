import { Box, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { TextTextarea } from '@/components/Form/Textarea'

// TODO: pop text
// Thank you, we have received your enquiry and will respond shortly.
export const EnquiriesForm = () => {
  const { i18n } = useLingui()

  const validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .default('')
        .required(t`Please enter`),
      email: Yup.string()
        .default('')
        .email(t`Please enter a valid email address`)
        .required(t`Please enter`),
      message: Yup.string()
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

          // TODO: 提交申请接口
          // const res = await loginFn(values.username, values.password)
          // if (res?.code >= 0) {
          //   resetForm({
          //     values: initialValues,
          //   })
          // } else {
          //   setFieldError('password', res?.msg || t`Wrong username, email or password`)
          // }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'20px'} w='420px'>
          <FormControl name='name' label={t`Name`}>
            <TextInput name='name' />
          </FormControl>
          <FormControl name='email' label={t`Email`}>
            <TextInput name='email' type='email' />
          </FormControl>

          <FormControl name='message' label={t`Message`}>
            <TextTextarea name='message' />
          </FormControl>

          <SubmitButton w='100%' mt='5px'>{t`Submit`}</SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}
