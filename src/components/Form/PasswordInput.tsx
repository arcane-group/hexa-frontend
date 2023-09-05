import { Input, InputGroup, InputRightElement, type InputProps } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useField, type FieldHookConfig } from 'formik'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

type TInputProps = {
  name: string
} & InputProps

export const PasswordInput: FC<
  TInputProps & {
    fieldCfg?: Partial<FieldHookConfig<any>>
  }
> = ({ fieldCfg, type, ...props }) => {
  const [field] = useField({
    ...fieldCfg,
    name: props.name,
  })

  const [showText, setShowText] = useState(false)

  return (
    <InputGroup>
      <Input
        type={showText ? 'text' : type || 'password'}
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
      />
      <InputRightElement
        className='hover'
        onClick={() => {
          setShowText(!showText)
        }}
        color='#155973'
      >
        {!showText ? <ViewIcon /> : <ViewOffIcon />}
      </InputRightElement>
    </InputGroup>
  )
}
