import { Box, Flex, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
// import dynamic from 'next/dynamic'

import { MotionCenter } from '@/components/Motion'
import { GoNextPage } from './Screen-1'
import { ThreeMoon } from '@/components/Three/Moon'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { LineButton } from '@/components/LineButton'
import { ArrowIcon, Line285Icon } from '@/assets/svg/home/index'
import { HomeLine as LineBg } from '@/components/Three/HomeLine'

// const LineBg = dynamic(() => import('@/components/Three/HomeLine'), { ssr: false })

const ArrowLine = () => {
  return (
    <MotionCenter
      initial='offscreen'
      whileInView='onscreen'
      variants={{
        offscreen: {
          opacity: 0,
        },
        onscreen: {
          opacity: 1,
        },
      }}
      pos='absolute'
      top={'-285px'}
      left={'-95px'}
      zIndex={0}
      flexDir={'column'}
      userSelect={'none'}
      pointerEvents={'none'}
    >
      <Line285Icon mb='8px' w='4px' h='285px' transform='rotate(180deg)' />
      <ArrowIcon w='32px' h='32px' transform='rotate(180deg)' />
    </MotionCenter>
  )
}

export const Screen4 = ({ fullpageApi }: any) => {
  useLingui()

  return (
    <Flex flexDir={'column'} h='100vh'>
      <Container
        pos='relative'
        zIndex={2}
        px={{
          lg: '162px',
        }}
        flex={1}
      >
        <GoNextPage fullpageApi={fullpageApi} isNext={false} />

        <LineBg
          m='auto'
          pos='absolute'
          left={'0'}
          right={0}
          top={'0'}
          bottom={0}
          transform=' scale(-1, 1)'
        />

        <Box w='85vh' h='85vh' pos='absolute' zIndex={0} top={0} right={0}>
          <ThreeMoon />
        </Box>

        <Box mt={{ lg: '40vh' }} pos='relative' zIndex={1}>
          <Text as='h2' textStyle={'ch1'}>{t`Builder’s Playground`}</Text>
          <Box
            pos='relative'
            mt={{
              lg: '3vh',
            }}
            mb={{
              lg: '7vh',
            }}
            maxW={{
              lg: '710px',
            }}
            textStyle={'cp'}
            color='#595959'
          >
            {t`Hexa Hub’s Discord channel is the nexus of the future. This is the one-stop-shop for our global community members to openly connect, discuss, and fuel their vision.`}
            <ArrowLine />
          </Box>
          <LineButton
            onClick={() => {
              // TODO: 待添加 Discord 链接
              window.open('https://discord.com/', '_blank')
            }}
          >{t`ENTER OUR DISCORD`}</LineButton>
        </Box>
      </Container>
      <Footer />
    </Flex>
  )
}
