import { Box, Stack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
// import dynamic from 'next/dynamic'

import { px2vh } from '@/utils/px2vh'
import { GoNextPage } from './Screen-1'
import { MotionBox, MotionCenter, MotionImage } from '@/components/Motion'
import { Container } from '@/components/Container'
import logoLineImg from '@/assets/images/home/logo-line.png'
import logoNoiseImg from '@/assets/images/home/logo-noise.png'
import logoImg from '@/assets/images/home/logo.png'
import { ArrowIcon, Line285Icon } from '@/assets/svg/home/index'
import { HomeLine as LineBg } from '@/components/Three/HomeLine'

// const LineBg = dynamic(() => import('@/components/Three/HomeLine'), { ssr: false })

const delay = 1
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
      top={{
        lg: px2vh(300),
      }}
      left={'70px'}
      zIndex={0}
      flexDir={'column'}
      userSelect={'none'}
      pointerEvents={'none'}
    >
      <Line285Icon mb='3px' w='4px' h='175px' transform='rotate(180deg)' />

      <MotionCenter
        flexDir={'column'}
        variants={{
          offscreen: {
            opacity: 0,
          },
          onscreen: {
            opacity: 1,
            transition: {
              delay: delay,
            },
          },
        }}
      >
        <ArrowIcon w='32px' h='32px' />
        <Line285Icon mt='13px' w='4px' h='144px' />
      </MotionCenter>

      <MotionCenter
        flexDir={'column'}
        variants={{
          offscreen: {
            opacity: 0,
          },
          onscreen: {
            opacity: 1,
            transition: {
              delay: delay * 2,
            },
          },
        }}
      >
        <ArrowIcon w='32px' h='32px' />
        <Line285Icon mt='13px' w='4px' h='97px' />
      </MotionCenter>
    </MotionCenter>
  )
}

export const Screen2 = ({ fullpageApi }: any) => {
  const { i18n } = useLingui()

  const descArr = useMemo(() => {
    return [
      t`Hexa Hub is a platform designed to empower community members in the ever-evolving landscape of technology and innovation. Contributors get personalised support for their journey as they navigate the market landscape.`,
      t`What we do goes beyond individual support. We connect our members to world-class industry leaders, investors, service providers, and researchers who can help them realise their ambitions.`,
      t`We are a community buzzing with entrepreneurial energy, where savvy minds gather to foster a powerful ecosystem of growth and opportunity.`,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <Box h='100vh'>
      <Container
        pos='relative'
        zIndex={2}
        px={{
          lg: '162px',
        }}
        h='100%'
      >
        <GoNextPage fullpageApi={fullpageApi} />

        <LineBg m='auto' pos='absolute' left={0} right={0} top={'0'} bottom={0} />

        <ArrowLine />

        <MotionBox
          pos='absolute'
          bottom={'55px'}
          right={'80px'}
          textStyle={'h2'}
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
        >{t`Connect, Collaborate and Create`}</MotionBox>

        <LogoBox />
        <MotionCenter
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            offscreen: {
              opacity: 0,
            },
            onscreen: {
              opacity: 1,
            },
          }}
          pos='relative'
          zIndex={2}
          flexDir={'column'}
          alignItems={'flex-start'}
          maxW={{
            lg: '665px',
          }}
          h='100%'
        >
          <Text as='h2' textStyle={'ch1'}>
            {t`Building Tomorrow, Today`}
          </Text>
          <Stack
            direction={'column'}
            spacing={'5vh'}
            mt={{
              lg: '5vh',
            }}
          >
            {descArr.map((item, index) => {
              return (
                <MotionBox
                  variants={{
                    offscreen: {
                      opacity: 0,
                      x: 50,
                    },
                    onscreen: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: 'spring',
                        bounce: 0.4,
                        delay: index * delay,
                      },
                    },
                  }}
                  as='p'
                  key={index}
                  textStyle={'cp'}
                  color='#4E4E4E'
                >
                  {item}
                </MotionBox>
              )
            })}
          </Stack>
        </MotionCenter>
      </Container>
    </Box>
  )
}

const LogoBox = () => {
  return (
    <MotionBox
      initial='offscreen'
      whileInView='onscreen'
      // viewport={{ once: true, amount: 0.3 }}
      variants={{
        offscreen: {
          top: '28%',
          left: '2%',
          width: '25vh',
          height: '25vh',
          translateY: '-50%',
          zIndex: 0,
        },
        onscreen: {
          zIndex: [3, 3, 0],
          translateY: '-50%',
          width: ['60vh', '25vh'],
          height: ['60vh', '25vh'],
          top: ['50%', '28%'],
          left: ['50%', '2%'],
          transition: {
            type: 'spring',
            bounce: 0.2,
            times: [0, 0.99, 1],
            delay: 4.5,
            duration: 1,
          },
        },
      }}
      pos='absolute'
      // top='28%'
      // left={'2%'}
      // width={'25vh'}
      // height={'25vh'}
      // translateY='-50%'
      zIndex={3}
      userSelect={'none'}
      pointerEvents={'none'}
    >
      <MotionImage
        opacity={0}
        variants={{
          offscreen: {
            opacity: 0,
          },
          onscreen: {
            opacity: [0, 1, 0],
            transition: {
              ease: 'linear',
              times: [0, 0.5, 1],
              delay: 0,
              duration: 2,
            },
          },
        }}
        pos='absolute'
        zIndex={1}
        w='100%'
        h='100%'
        src={logoLineImg.src}
        alt='logo-line-img'
      />
      <MotionImage
        opacity={0}
        variants={{
          offscreen: {
            opacity: 0,
          },
          onscreen: {
            opacity: [0, 1, 0],
            transition: {
              ease: 'linear',
              times: [0, 0.5, 1],
              delay: 1,
              duration: 3,
            },
          },
        }}
        pos='absolute'
        zIndex={2}
        w='100%'
        h='100%'
        src={logoNoiseImg.src}
        alt='logo-noise-img'
      />
      <MotionImage
        opacity={0}
        variants={{
          offscreen: {
            opacity: 0,
          },
          onscreen: {
            opacity: 1,
            transition: {
              ease: 'linear',
              delay: 2.5,
              duration: 2,
            },
          },
        }}
        pos='absolute'
        zIndex={3}
        w='100%'
        h='100%'
        src={logoImg.src}
        alt='logo-img'
      />
    </MotionBox>
  )
}
