import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'

import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { checkUsername, editInfo } from '@/services/api/user'
import { useStore } from '@/stores'

export const EditName = observer(() => {
  const { i18n } = useLingui()

  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const { walletStore } = useStore()

  const validationSchema = useMemo(() => {
    return Yup.object({
      existingUsername: Yup.string().default(undefined),
      username: Yup.string()
        .default('')
        .required(t`Please enter`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])
  const initialValues = {
    ...validationSchema.getDefault(),
    existingUsername: walletStore?.userExtInfo?.username,
  }

  if (!walletStore?.userInfo?.userId) {
    return null
  }

  return (
    <Box>
      <Text
        mb='12px'
        textStyle={'ch1'}
        color={'#595959'}
        fontWeight={400}
      >{t`Change Username`}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true)

          const res = await editInfo(`${walletStore?.userInfo?.userId}`, {
            username: values.username,
          }).catch(() => {
            return null
          })
          if (res && res?.code >= 0) {
            walletStore?.setUserExtInfo(
              walletStore?.userExtInfo
                ? {
                    ...walletStore?.userExtInfo,
                    username: values.username,
                  }
                : null
            )
            resetForm({
              values: { ...initialValues, existingUsername: values.username },
            })
            toast.success(t`Success`)
          } else {
            setFieldError('username', res?.data?.msg || 'App error')
          }

          setSubmitting(false)
        }}
      >
        {({ setFieldError }) => (
          <Stack direction={'column'} spacing={'20px'}>
            <FormControl name='existingUsername' label={t`Existing Username`}>
              <TextInput name='existingUsername' isDisabled={true} />
            </FormControl>

            <FormControl name='username' label={t`New Username`}>
              <TextInput
                name='username'
                isLoading={apiLoading}
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

            <SubmitButton w='100%' mt='30px' isDisabled={apiLoading || !!apiError}>
              {apiError || t`Submit`}
            </SubmitButton>
          </Stack>
        )}
      </Formik>
    </Box>
  )
})
