import { Textarea, type TextareaProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useField, type FieldHookConfig } from 'formik'

type TInputProps = {
  name: string
} & TextareaProps

export const TextTextarea: FC<
  TInputProps & {
    fieldCfg?: Partial<FieldHookConfig<any>>
  }
> = ({ fieldCfg, ...props }) => {
  const [field] = useField({
    ...fieldCfg,
    name: props.name,
  })

  return (
    <Textarea
      autoComplete={'off'}
      placeholder={''}
      borderRadius={'0'}
      boxShadow='none !important'
      borderColor={'#155973 !important'}
      sx={{
        '::placeholder': {
          color: 'blackAlpha.500',
        },
      }}
      minH='128px'
      {...props}
      {...field}
    />
  )
}
