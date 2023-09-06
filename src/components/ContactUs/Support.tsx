import { Box, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useCallback, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { AsyncSelect } from '@/components/Form/AsyncSelect'
import { TextTextarea } from '@/components/Form/Textarea'
import { postConsultation } from '@/services/api/consultation'

// TODO: 客户端判断 是否已经是SBT会员  或 是否已经登录
// Oops! Please sign in and connect your wallet to verify membership.
// Oops! Looks like you aren’t a Hexa Hub member yet! Consultation services are only available to Hexa Hub members, for more info on Hexa Hub membership, click here.
export const SupportForm = observer(() => {
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
        value: 'Fundraising Support',
        label: t`Fundraising Support`,
      },
      {
        id: '2',
        value: 'Structuring',
        label: t`Structuring`,
      },

      {
        id: '3',
        value: 'Human Capital Support',
        label: t`Human Capital Support`,
      },
      {
        id: '4',
        value: 'Product Strategy',
        label: t`Product Strategy`,
      },
      {
        id: '5',
        value: 'Go-to-Market Strategy',
        label: t`Go-to-Market Strategy`,
      },
      {
        id: '6',
        value: 'Tech Development',
        label: t`Tech Development`,
      },
      {
        id: '7',
        value: 'Marketing Strategy',
        label: t`Marketing Strategy`,
      },
      {
        id: '8',
        value: 'Ecosystem Growth Strategy',
        label: t`Ecosystem Growth Strategy`,
      },
      {
        id: '9',
        value: 'Legal and Compliance Support',
        label: t`Legal and Compliance Support`,
      },
    ])
  }, [])

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

          console.log('values:', values)

          const res = await postConsultation({
            name: values?.name,
            email: values?.email,
            service: values?.service,
            message: values?.message,
          })
          if (res?.code >= 0) {
            setTips(t`We have received your request and will contact you shortly!`)
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

          <FormControl name='service' label={t`Service`}>
            <AsyncSelect
              name={'service'}
              placeholder={t`Please select`}
              valueStr='value'
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
})
