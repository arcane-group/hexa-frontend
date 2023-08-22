import { Box, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { AsyncSelect } from '@/components/Form/AsyncSelect'
import { TextTextarea } from '@/components/Form/Textarea'

export const SupportForm = () => {
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
      service: Yup.string()
        .default('')
        .required(t`Please select`),
      message: Yup.string()
        .default('')
        .required(t`Please enter`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])
  const initialValues = validationSchema.getDefault()

  const getOpFn1 = useCallback(() => {
    return Promise.resolve([
      {
        id: '1',
        label: t`Fundraising Support`,
      },
      {
        id: '2',
        label: t`Structuring`,
      },

      {
        id: '3',
        label: t`Human Capital Support`,
      },
      {
        id: '4',
        label: t`Product Strategy`,
      },
      {
        id: '5',
        label: t`GO-to-Market Strategy`,
      },
      {
        id: '6',
        label: t`Tech Development`,
      },
      {
        id: '7',
        label: t`Marketing Strategy`,
      },
      {
        id: '8',
        label: t`Ecosystem Growth Strategy`,
      },
      {
        id: '9',
        label: t`Legal and Compliance Support`,
      },
    ])
  }, [])

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

          <FormControl name='service' label={t`Service`}>
            <AsyncSelect
              name={'service'}
              placeholder={t`Please select`}
              valueStr='id'
              labelStr='label'
              getOpFn={getOpFn1}
            />
          </FormControl>

          <FormControl name='message' label={t`Message`}>
            <TextTextarea name='message' placeholder={t`Details of the service you require`} />
          </FormControl>

          <SubmitButton w='100%' mt='5px'>{t`Submit`}</SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}
