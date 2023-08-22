import { Field } from 'formik'
import { Checkbox } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export const TC = ({ name }: { name: string }) => {
  useLingui()

  return (
    <Field name={name}>
      {({ field }: any) => {
        return (
          <Checkbox
            size='lg'
            colorScheme='yellow'
            sx={{
              '.chakra-checkbox__control': {
                color: '#000',
                borderColor: '#155973 !important',
                borderWidth: '1px',
                w: '30px',
                h: '30px',
              },
            }}
            {...field}
          >
            <Link
              target='_blank'
              href='/team-conditions'
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()

                window.open('/team-conditions', '_blank')
              }}
            >{t`T&C`}</Link>
          </Checkbox>
        )
      }}
    </Field>
  )
}
