import { Box, type BoxProps } from '@chakra-ui/react'

import px2vw from '@/utils/px2vw'

export const Container = (props: BoxProps) => {
  return (
    <Box
      w={{
        base: 'full',
        // lg: '',
        // xl: '',
        xxl: '1440px',
      }}
      px={{
        base: px2vw(20),
        lg: '12px',
        xl: '24px',
        xxl: 0,
      }}
      m='auto'
      {...props}
    ></Box>
  )
}
