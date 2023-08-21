import { Input, type InputProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useField, type FieldHookConfig } from 'formik'

type TInputProps = {
  name: string
  maxNum?: number
  precision?: number
  tips?: string
} & InputProps

export const TextInput: FC<
  TInputProps & {
    fieldCfg?: Partial<FieldHookConfig<any>>
  }
> = ({ fieldCfg, type, ...props }) => {
  const [field] = useField({
    ...fieldCfg,
    name: props.name,
  })

  return (
    <Input
      type={type}
      placeholder={''}
      borderRadius={'0'}
      boxShadow='none !important'
      borderColor={'#155973 !important'}
      sx={{
        '::placeholder': {
          color: '#D0D0D0',
        },
      }}
      minH='40px'
      {...field}
    />
  )
}
