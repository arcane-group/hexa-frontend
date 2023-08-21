import { Button, type ButtonProps } from '@chakra-ui/react'

export const LineButton = (props: ButtonProps) => {
  return (
    <Button
      className='line-style-btn'
      alignSelf={'center'}
      variant='outline'
      borderRadius={0}
      borderColor={'#8AF7FC'}
      borderWidth={'2px'}
      height={'50px'}
      bgGradient='linear(to-b, #8AF7FC, transparent)'
      _hover={{
        bgColor: 'rgba(108, 234, 240, 1)',
      }}
      _active={{
        bgColor: 'rgba(108, 234, 240, 1)',
      }}
      px='12px'
      fontSize={'18px'}
      {...props}
    />
  )
}
