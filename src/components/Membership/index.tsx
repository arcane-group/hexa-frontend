import { Box, Center, Text, SimpleGrid, Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMemo } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'
// import dynamic from 'next/dynamic'

import { Container } from '@/components/Container'
import { Screen2 } from './Screen-2'
import { Screen3 } from './Screen-3'
import { Screen4 } from './Screen-4'
import { MotionBox, MotionImage, MotionCenter } from '@/components/Motion'
import logoNoiseImg from '@/assets/images/home/logo-noise.png'
import { MembershipLine } from '@/components/Three/MembershipLine'

// const MembershipLine = dynamic(() => import('@/components/Three/MembershipLine'), { ssr: false })

export const Membership = () => {
  const { i18n } = useLingui()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const handleMouseMove = (event: any) => {
    mouseX.set(event.clientX)
    mouseY.set(event.clientY)
  }
  const xRotation = useTransform(mouseX, [0, 1440], [5, -5])
  // const yRotation = useTransform(mouseY, [0, 1080], [10, -10])
  const xTranslation = useTransform(mouseX, [0, 1440], [-5, 5])
  const yTranslation = useTransform(mouseY, [0, 1080], [-5, 5])

  const benefitsArr = useMemo(() => {
    return [
      {
        title: t`Elevations`,
        arr: [
          t`Initiate: Fundraising support, structuring, legal and compliance support and human capital support`,
          t`Innovate: Consultation on product strategy, marketing, tech development and go-to-market strategy`,
          t`Ignite: Synergies from partnerships, deal flow, ecosystem growth and macro-analysis of the market`,
        ],
      },
      {
        title: t`Events`,
        arr: [
          t`Online seminars conducted by respective specialists`,
          t`Expert industry panels and group discussions`,
          t`Offline events, such as major tech side events`,
          t`Quarterly office gatherings`,
        ],
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <>
      <Box
        as='section'
        onMouseMove={handleMouseMove}
        sx={{
          perspective: '1000px',
        }}
      >
        <Center h='0' pos='sticky' top='100vh' zIndex={1}>
          <MotionImage
            initial='offscreen'
            whileInView='onscreen'
            variants={{
              offscreen: {
                opacity: 0,
              },
              onscreen: {
                opacity: 0.8,
              },
            }}
            animate={{
              y: [0, 5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
            viewport={{ once: true, amount: 0.3 }}
            src={logoNoiseImg.src}
            alt='noise logo'
            w='50vh'
            h='50vh'
            pos='absolute'
            left={'50%'}
            top='-40vh'
            sx={{
              translate: '-50% -50%',
              transformOrigin: 'center',
            }}
            style={{
              rotateX: xRotation,
              // rotateY: yRotation,
              translateX: xTranslation,
              translateY: yTranslation,
            }}
            pointerEvents={'none'}
            userSelect={'none'}
          />
        </Center>

        <MotionBox
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.3 }}
          w='100%'
          h='100vh'
          pt='184px'
          pos='sticky'
          top={0}
        >
          <MembershipLine m='auto' pos='absolute' left={0} right={0} top={'60px'} bottom={0} />
          <MotionBox
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              offscreen: {
                opacity: 0,
                y: '-50%',
                x: '-200px',
              },
              onscreen: {
                opacity: 1,
                y: '-80%',
                x: '-200px',
              },
            }}
            pos='absolute'
            zIndex={1}
            right='50%'
            top='55%'
            w='340px'
            color={'#595959'}
            textStyle={'cp'}
          >{t`Our soulbound token Hex Arcana serves as a proof of membership to Hexa Hub. It grants entry into our networks for unparalleled community-driven experiences.`}</MotionBox>

          <MotionBox
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              offscreen: {
                opacity: 0,
                y: '-50%',
                x: '200px',
              },
              onscreen: {
                opacity: 1,
                y: '0%',
                x: '200px',
              },
            }}
            pos='absolute'
            zIndex={1}
            left='50%'
            bottom='10%'
            w='360px'
            color={'#595959'}
            textStyle={'cp'}
          >{t`Empowering individuals to express their true selves in the digital realm`}</MotionBox>

          <Title title={t`Hexa Arcana`} desc={t`A SOULBOUND TOKEN FOR UNBREAKABLE BONDS`} />
        </MotionBox>

        <Box minH='100vh' pt='167px' pos='relative'>
          <Box pos='absolute' zIndex={0} top={0} left={0} right={0} bottom={0} bgColor='#FDD9A6' />
          <Box
            className='blur-bg'
            pos='absolute'
            zIndex={2}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgColor='rgba(255, 252, 243, 0.3)'
            filter='auto'
          ></Box>
          <Title
            title={t`Benefits Unlocked`}
            desc={t`From customised support and programmes to exclusive community events, our members can gain access to a wide range of perks.`}
          />
          <SimpleGrid
            maxW='950px'
            m='auto'
            mt='50px'
            pos='relative'
            zIndex={2}
            columns={{
              base: 1,
              lg: 2,
            }}
            spacing={'180px'}
          >
            {benefitsArr.map((item, index) => {
              return <BenefitsList key={index} data={item} />
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box as='section' pt='167px'>
        <Title
          maxW='800px'
          title={t`Contributions`}
          desc={t`As a member, you get to collaborate, exchange knowledge, and shape the next big tech disruptions.`}
        />
        <Box pt='32px'>
          <Screen2 />
        </Box>
      </Box>

      <Box as='section' pt='167px'>
        <Title title={t`Collaborations`} desc={t`TRANSCENDING THE ORDINARY`} />
        <Container pt='32px'>
          <Screen3 />
        </Container>
      </Box>

      <Box as='section' pt='167px'>
        <Title
          title={t`Community Members`}
          desc={t`At Hexa Hub, we are all industry innovators, trailblazers, and engineers.`}
        />
        <Container pt='32px'>
          <Screen4 />
        </Container>
      </Box>
    </>
  )
}
export default Membership

const Title = ({ title, desc, maxW }: { title: string; desc: string; maxW?: any }) => {
  useLingui()

  return (
    <MotionCenter
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        offscreen: {
          opacity: 0,
        },
        onscreen: {
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
      }}
      flexDir={'column'}
      pos='relative'
      zIndex={2}
    >
      <Text as='h1' textStyle={'ch1'} textAlign={'center'}>
        {title}
      </Text>
      <Center
        as='p'
        textAlign={'left'}
        textStyle={'cp'}
        color='#4E4E4E'
        mt={{
          lg: '10px',
        }}
        maxW={maxW || '950px'}
      >
        {desc}
      </Center>
    </MotionCenter>
  )
}

const BenefitsList = ({
  data,
}: {
  data: {
    title: string
    arr: string[]
  }
}) => {
  return (
    <MotionBox
      w='324px'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.3 }}
    >
      <Text as='h2' textStyle={'ch2'} color='#1D1D1D'>
        {data?.title}
      </Text>

      <Stack mt='12px' direction={'column'} spacing={'20px'}>
        {data?.arr?.map((item, index) => {
          return (
            <MotionBox
              key={index}
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                offscreen: {
                  opacity: 0,
                  x: 50,
                },
                onscreen: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.5,
                  },
                },
              }}
            >
              <Text color='#4E4E4E' textStyle={'csmp'}>
                {item}
              </Text>
              <Box
                mt='20px'
                border={'1px solid #1ECADC'}
                height={'4px'}
                w='100%'
                bgGradient='linear(to-r, #1ECADC, transparent)'
              />
            </MotionBox>
          )
        })}
      </Stack>
    </MotionBox>
  )
}
