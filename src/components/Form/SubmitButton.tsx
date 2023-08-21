import { ButtonProps } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { FC } from 'react'

import { LineButton } from '@/components/LineButton'

export type SubmitButtonProps = ButtonProps & {
  childrenRender?: any
}

export const SubmitButton: FC<SubmitButtonProps> = props => {
  const { children, childrenRender, isLoading, ...rest } = props
  const { isSubmitting, handleSubmit, values } = useFormikContext()

  return (
    <LineButton
      type='submit'
      onClick={() => handleSubmit()}
      isLoading={isSubmitting || isLoading}
      {...rest}
    >
      {childrenRender ? childrenRender(values) : children}
    </LineButton>
  )
}
