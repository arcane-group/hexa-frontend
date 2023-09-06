import { Input, InputGroup, InputRightElement, type InputProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useField, type FieldHookConfig } from 'formik'

import Loading from '../Loading'

type TInputProps = {
  name: string
  isLoading?: boolean
} & InputProps

export const TextInput: FC<
  TInputProps & {
    fieldCfg?: Partial<FieldHookConfig<any>>
  }
> = ({ fieldCfg, isLoading, type, ...props }) => {
  const [field] = useField({
    ...fieldCfg,
    name: props.name,
  })

  return (
    <InputGroup>
      <Input
        type={type}
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
        minH='40px'
        {...props}
        {...field}
        onBlur={(...args) => {
          field.onBlur(...args)
          if (props?.onBlur) {
            props.onBlur(...args)
          }
        }}
      />
      {isLoading && (
        <InputRightElement>
          <Loading size='xs' />
        </InputRightElement>
      )}
    </InputGroup>
  )
}
