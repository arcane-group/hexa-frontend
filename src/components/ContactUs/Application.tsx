import { Box, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Link } from '@chakra-ui/next-js'
import { utils } from 'ethers'

import { TC } from '@/components/Form/TC'
import { TextInput } from '@/components/Form/Input'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormControl } from '@/components/Form/FormControl'
import { AsyncSelect } from '@/components/Form/AsyncSelect'
import { TextTextarea } from '@/components/Form/Textarea'

const ensRegExp = /^[a-z0-9-]+\.eth$/i
export const ApplicationForm = () => {
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
      telegram: Yup.string()
        .default('')
        .test('wechat', t`Telegram or Wechat, must fill at least one`, (_value, obj: any) => {
          console.log('obj:', obj)
          return !!(obj?.parent?.wechat || obj?.parent?.telegram)
        }),
      wechat: Yup.string().default(''),
      twitter: Yup.string()
        .default('')
        .required(t`Please enter`),
      background: Yup.string()
        .default('')
        .required(t`Please select`),
      project: Yup.string().default(''),
      website: Yup.string().default(''),
      address: Yup.string()
        .default('')
        .required(t`Please enter`)
        .test(
          'address',
          t`ENS/Hexadecimal address(0x)`,
          value => utils.isAddress(value) || ensRegExp.test(value)
        ),
      introduction: Yup.string()
        .default('')
        .required(t`Please enter`),
      referral: Yup.string()
        .default('')
        .required(t`Please enter`),
      readTC: Yup.boolean()
        .default(false)
        .oneOf([true], t`Please read and agree to the terms and conditions`),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])
  const initialValues = validationSchema.getDefault()

  const getOpFn1 = useCallback(() => {
    return Promise.resolve([
      {
        id: '1',
        label: t`Founder`,
      },
      {
        id: '2',
        label: t`Developer`,
      },

      {
        id: '3',
        label: t`Service Provider`,
      },
      {
        id: '4',
        label: t`Investor`,
      },
      {
        id: '5',
        label: t`Web3 Enthusiast`,
      },
      {
        id: '6',
        label: t`Technologist`,
      },
      {
        id: '7',
        label: t`Strategist`,
      },
      {
        id: '8',
        label: t`Others`,
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
          <FormControl name='telegram' label={t`Telegram ID`}>
            <TextInput name='telegram' />
          </FormControl>
          <FormControl name='wechat' label={t` Wechat ID`}>
            <TextInput name='wechat' />
          </FormControl>
          <FormControl name='twitter' label={t`Twitter`}>
            <TextInput name='twitter' />
          </FormControl>
          <FormControl name='background' label={t`Background`}>
            <AsyncSelect
              name={'background'}
              placeholder={t`Please select`}
              valueStr='id'
              labelStr='label'
              getOpFn={getOpFn1}
            />
          </FormControl>
          <FormControl name='project' label={t`Project Deck Link (if applicable)`}>
            <TextInput name='project' />
          </FormControl>
          <FormControl name='website' label={t`Website/Linkedin/Github (if applicable)`}>
            <TextInput name='website' />
          </FormControl>
          <FormControl
            name='address'
            label={t`Wallet Address for Airdrop`}
            helperText={
              <Link
                color='#C29B60'
                href={'https://wallet.particle.network/'}
                textStyle={'smp'}
              >{t`I do not have a wallet, create one with my email`}</Link>
            }
          >
            <TextInput name='address' placeholder={t`ENS/Hexadecimal address(0x)`} />
          </FormControl>
          <FormControl name='introduction' label={t`Brief Introduction`}>
            <TextTextarea
              name='introduction'
              placeholder={t`Including past work experiences, interested verticals, contributions to the tech space, education background, etc.`}
            />
          </FormControl>
          <FormControl name='referral' label={t`How did you hear about us?`}>
            <TextTextarea name='referral' placeholder={t`Referral person name, channels`} />
          </FormControl>
          <FormControl name='readTC'>
            <TC name='readTC' />
          </FormControl>
          <SubmitButton w='100%' mt='5px'>{t`Apply`}</SubmitButton>
        </Stack>
      </Formik>
    </Box>
  )
}
