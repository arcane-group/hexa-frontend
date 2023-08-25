import { Box, type BoxProps } from '@chakra-ui/react'

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
        lg: '12px',
        xl: '24px',
        xxl: 0,
      }}
      m="auto"
      {...props}
    ></Box>
  )
}
