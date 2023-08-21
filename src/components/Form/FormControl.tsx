import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { useField, useFormikContext } from 'formik'
import React, { FC } from 'react'

import { px2vw } from '@/utils/px2vw'

export interface BaseProps extends FormControlProps {
  name: string
  label?: string
  helperText?: React.ReactNode | string
  restLabel?: any
}

export const FormControl: FC<BaseProps> = (props: BaseProps) => {
  const { children, name, label, helperText, restLabel, ...rest } = props
  const [, { error, touched }] = useField(name)
  const { isSubmitting } = useFormikContext()

  return (
    <ChakraFormControl isInvalid={!!error && touched} size='xl' {...rest} isDisabled={isSubmitting}>
      {label && (
        <FormLabel
          className='clearfix'
          htmlFor={name}
          mb={{ base: px2vw(6), lg: '6px' }}
          {...restLabel}
        >
          <Text
            textStyle={'p'}
            lineHeight={1.5}
            color={'#000'}
            display='inline-block'
            verticalAlign={'middle'}
          >
            {label}
          </Text>
        </FormLabel>
      )}
      {children}
      {error && (
        <FormErrorMessage mt='6px' color='#E04949' textStyle={'smp'} fontSize={'14px'}>
          {error}
        </FormErrorMessage>
      )}
      {helperText && (
        <FormHelperText mt='6px' color='#C29B60' textStyle={'smp'}>
          {helperText}
        </FormHelperText>
      )}
    </ChakraFormControl>
  )
}
