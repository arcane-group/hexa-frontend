import { memo } from 'react'
import { Center } from '@chakra-ui/react'

// eslint-disable-next-line react/display-name
export const Footer = memo(() => {
  return (
    <Center as='footer' bgColor={'#F9C271'} h='60px' w='100%' textStyle={'ssmp'}>
      2023@Hexa Hub. All rights reserved.
    </Center>
  )
})
