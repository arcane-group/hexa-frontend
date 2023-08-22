import { Button as CBtn, type ButtonProps } from '@chakra-ui/react'

export const Button = (props: ButtonProps) => {
  return (
    <CBtn
      variant='outline'
      borderRadius={0}
      borderColor={'#155973'}
      bgColor={'transparent !important'}
      _hover={{
        borderColor: '#8AF7FC',
      }}
      _active={{
        borderColor: '#8AF7FC',
      }}
      fontWeight={400}
      {...props}
    />
  )
}
