import { Box, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { px2vh } from '@/utils/px2vh'
import { MotionBox, MotionCenter } from '@/components/Motion'
import { Container } from '@/components/Container'
import { TypedBox } from '@/components/Typed'
import { PointParticle } from '@/components/PointParticle'
import { ArrowIcon, GoNextIcon, Line285Icon } from '@/assets/svg/home/index'

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
        lg: `calc(${px2vh(298)} + 54px + 10px)`,
      }}
      left={'70px'}
      zIndex={0}
      flexDir={'column'}
      userSelect={'none'}
      pointerEvents={'none'}
    >
      <ArrowIcon w='32px' h='32px' />
      <Line285Icon mt='13px' w='4px' h='244px' />
    </MotionCenter>
  )
}

export const GoNextPage = ({
  fullpageApi,
  isNext = true,
}: {
  fullpageApi: any
  isNext?: boolean
}) => {
  useLingui()

  return (
    <MotionBox
      whileHover={{
        scale: 1.2,
      }}
      pos='absolute'
      bottom={'74px'}
      left={'70px'}
      zIndex={0}
      animate={{
        y: [0, 5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      title={isNext ? t`Go Next Page` : t`Go Previous Page`}
    >
      <GoNextIcon
        transform={!isNext ? 'rotate(180deg)' : undefined}
        w='28px'
        h='50px'
        cursor={'pointer'}
        className='hover'
        onClick={() => {
          if (isNext) {
            fullpageApi.moveSectionDown()
          } else {
            fullpageApi.moveSectionUp()
          }
        }}
      />
    </MotionBox>
  )
}

export const Screen1 = ({ fullpageApi }: any) => {
  const { i18n } = useLingui()

  const propsTypejs = useMemo(() => {
    return {
      text: [
        t`Welcome to the knowledge hub of the emerging tech <br />landscape.<br />Discover resources and connect with industry leaders and insiders within.`,
      ],
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <Box h='100vh'>
      <PointParticle />
      <Container
        pos='relative'
        zIndex={2}
        px={{
          lg: '162px',
        }}
        pt={{
          lg: px2vh(298),
        }}
        h='100%'
      >
        <GoNextPage fullpageApi={fullpageApi} />
        <ArrowLine />

        <MotionBox
          initial='offscreen'
          whileInView='onscreen'
          // viewport={{ once: true, amount: 0.3 }}
          variants={{
            offscreen: {
              opacity: 0,
              translateY: 100,
            },
            onscreen: {
              opacity: 1,
              translateY: 0,
            },
          }}
          maxW={{
            lg: '665px',
          }}
        >
          <Text as='h1' textStyle={'ch1'}>
            Hexa Hub
          </Text>
          <Text
            textStyle={'cp'}
            color='#4E4E4E'
            mt={{
              lg: '10px',
            }}
            sx={{
              '.typed-cursor': {
                color: 'rgba(30, 202, 220, 1)',
              },
            }}
          >
            <TypedBox {...propsTypejs} />
          </Text>
        </MotionBox>
      </Container>
    </Box>
  )
}
