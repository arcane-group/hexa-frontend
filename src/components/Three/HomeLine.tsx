import { Box, type BoxProps, Image } from '@chakra-ui/react'
import lineImg from '@/assets/svg/home/line_animated.svg'

export const HomeLine = (props: BoxProps) => {
  return (
    <Box
      pos={'relative'}
      zIndex={0}
      userSelect={'none'}
      pointerEvents={'none'}
      w='100%'
      h='100%'
      // sx={{
      //   svg: {
      //     width: '100%',
      //     height: '100%',
      //   },
      // }}
      opacity={0.5}
      {...props}
    >
      <Image src={lineImg.src} alt='' w='100%' h='100%' />
    </Box>
  )
}
export default HomeLine
