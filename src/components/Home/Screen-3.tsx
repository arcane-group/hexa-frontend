import { Box, Stack, Text, Image, AspectRatio, Center } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

import { GoNextPage } from './Screen-1'
import { MotionBox, MotionCenter } from '@/components/Motion'
import { Container } from '@/components/Container'
import { LineButton } from '@/components/LineButton'
import { ArrowIcon, Line285Icon } from '@/assets/svg/home/index'
import { HomeLine as LineBg } from '@/components/Three/HomeLine'
import { px2vw } from '@/utils/px2vw'
import { useStore } from '@/stores'

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
      top={0}
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
      <ArrowIcon w='32px' h='32px' />
      <Line285Icon mt='13px' w='4px' h='285px' />
    </MotionCenter>
  )
}

export const Screen3 = observer(({ fullpageApi }: any) => {
  const { i18n } = useLingui()

  const {
    commonStore: { isPC },
  } = useStore()

  const { push } = useRouter()

  const descArr = useMemo(() => {
    return [
      {
        title: t`Founder’s Exclusive`,
        desc: t`Guides for navigating the startup founder journey`,
        img: '1.jpg',
      },
      {
        title: t`Market Commentary`,
        desc: t`Curated in-depth analysis of the market landscape`,
        img: '2.jpg',
      },
      {
        title: t`Labs`,
        desc: t`Top-notch research by developers for developers`,
        img: '3.jpg',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <Box
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
        h='100%'
        pb={{
          base: px2vw(20),
          lg: 'inherit',
        }}
      >
        <GoNextPage fullpageApi={fullpageApi} />

        <LineBg m='auto' pos='absolute' left={0} right={0} top={'0'} bottom={0} />

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
          h='100%'
          pt={{ lg: '100px' }}
        >
          <Text as='h2' textStyle={'ch1'}>
            {t`The Library`}
          </Text>
          <Box
            pos='relative'
            mt={{
              base: px2vw(20),
              lg: '3vh',
            }}
            maxW={{
              lg: '700px',
            }}
            textStyle={'cp'}
            color='#595959'
          >
            {t`We provide an exclusive treasure trove of knowledge and insights`}
            <br />
            {t`specially made for our esteemed members.`}
            <ArrowLine />
          </Box>
          <Center
            flexDir={'column'}
            maxW={{
              lg: 'max-content',
            }}
            w='100%'
          >
            <Stack
              direction={{
                base: 'column',
                lg: 'row',
              }}
              spacing={{
                base: px2vw(20),
                lg: '60px',
                xxl: '112px',
              }}
              m='auto'
              mt={{
                base: px2vw(20),
                lg: '3vh',
              }}
              mb={{
                base: px2vw(40),
                lg: '10vh',
              }}
            >
              {descArr.map((item, index) => {
                return (
                  <MotionBox
                    key={index}
                    variants={{
                      offscreen: {
                        opacity: 0,
                        y: 50,
                      },
                      onscreen: {
                        opacity: 1,
                        y: 0,
                        scale: isPC ? (index === 1 ? 1.1 : 1) : 1,
                        transition: {
                          type: 'spring',
                          bounce: 0.4,
                          delay: index * 0.3,
                        },
                      },
                    }}
                    textStyle={'cp'}
                    color='#4E4E4E'
                    w='280px'
                    h='370px'
                    pos='relative'
                    transformOrigin={'top center'}
                  >
                    <Box
                      pos='absolute'
                      zIndex={1}
                      w='100%'
                      h='100%'
                      left={'7px'}
                      top={'5px'}
                      borderColor={'#169FAD'}
                      borderWidth={'1px'}
                      borderStyle='solid'
                      borderRadius={'2px'}
                    ></Box>
                    <AspectRatio w='100%' ratio={280 / 210}>
                      <Image
                        pos='relative'
                        zIndex={3}
                        src={`/images/home/screen3/${item.img}`}
                        alt=''
                        w='100%'
                        objectFit='cover'
                      />
                    </AspectRatio>
                    <Box
                      pos='relative'
                      zIndex={2}
                      w='100%'
                      h='160px'
                      bgGradient='linear(to-b, #8AF7FC, transparent)'
                      pt='30px'
                      px='23px'
                    >
                      <Text
                        color='#000000'
                        textStyle={{
                          base: 'p',
                          lg: 'csmp',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        color='#595959'
                        textStyle={{
                          base: 'p',
                          lg: 'csmp',
                        }}
                        mt='6px'
                      >
                        {item.desc}
                      </Text>
                    </Box>
                  </MotionBox>
                )
              })}
            </Stack>
            <LineButton
              onClick={() => {
                push({
                  pathname: '/library',
                  query: {
                    category: '1',
                  },
                })
              }}
            >{t`EXPLORE OUR LIBRARY`}</LineButton>
          </Center>
        </MotionCenter>
      </Container>
    </Box>
  )
})
