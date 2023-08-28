import { Box, Flex, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
// import dynamic from 'next/dynamic'
import getConfig from 'next/config'

import { MotionCenter } from '@/components/Motion'
import { GoNextPage } from './Screen-1'
import { ThreeMoon } from '@/components/Three/Moon'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { LineButton } from '@/components/LineButton'
import { ArrowIcon, Line285Icon } from '@/assets/svg/home/index'
import { HomeLine as LineBg } from '@/components/Three/HomeLine'
import { px2vw } from '@/utils/px2vw'

const { publicRuntimeConfig } = getConfig()

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
      display={{
        base: 'none',
        lg: 'flex',
      }}
    >
      <Line285Icon mb='8px' w='4px' h='285px' transform='rotate(180deg)' />
      <ArrowIcon w='32px' h='32px' transform='rotate(180deg)' />
    </MotionCenter>
  )
}

export const Screen4 = ({ fullpageApi }: any) => {
  useLingui()

  return (
    <Flex
      flexDir={'column'}
      minH='100vh'
      h={{
        lg: '100vh',
      }}
    >
      <Container
        pos='relative'
        zIndex={2}
        px={{
          base: px2vw(20),
          lg: '162px',
        }}
        pt={{
          base: px2vw(40),
          lg: '0',
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

        <Box mt={{ lg: '40vh' }} pos='relative' zIndex={1}>
          <Text as='h2' textStyle={'ch1'}>{t`Builder’s Playground`}</Text>
          <Box
            pos='relative'
            mt={{
              base: px2vw(20),
              lg: '3vh',
            }}
            mb={{
              base: px2vw(30),
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
              window.open('https://discord.com/' + publicRuntimeConfig.discord, '_blank')
            }}
          >{t`ENTER OUR DISCORD`}</LineButton>
        </Box>

        <Box
          w={{
            base: '90vw',
            lg: '85vh',
          }}
          h={{
            base: '90vw',
            lg: '85vh',
          }}
          pos={{
            lg: 'absolute',
          }}
          zIndex={0}
          top={0}
          right={0}
        >
          <ThreeMoon />
        </Box>
      </Container>
      <Footer />
    </Flex>
  )
}
