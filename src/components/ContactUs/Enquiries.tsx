import { Box, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { TextTextarea } from '@/components/Form/Textarea'
import { postEnquiry } from '@/services/api/enquiry'

export const EnquiriesForm = () => {
  const { i18n } = useLingui()

  const [showTips, setTips] = useState('')

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

  if (showTips) {
    return (
      <Box pt='200px'>
        <Text textStyle={'cp'}>{showTips}</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setSubmitting(true)

          const res = await postEnquiry({
            name: values?.name,
            email: values?.email,
            message: values?.message,
          })
          if (res?.code >= 0) {
            setTips(t`Thank you, we have received your enquiry and will respond shortly.`)
          } else {
            setFieldError('message', res?.msg || t`API Error`)
          }

          setSubmitting(false)
        }}
      >
        <Stack direction={'column'} spacing={'20px'} w={{ lg: '420px' }}>
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
