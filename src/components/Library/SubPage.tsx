import { Box, Text, Image, AspectRatio, Flex, Stack } from '@chakra-ui/react'
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
import { observer } from 'mobx-react-lite'

import { CollectBtn } from '@/components/News/CollectBtn'
import { GoSaved } from '@/components/News/index'
import { Container } from '@/components/Container'
import { MotionBox } from '@/components/Motion'
import { UserImg } from '@/components/UserImg'
import { formatTime } from '@/utils/formatTime'
import px2vw from '@/utils/px2vw'
import { useStore } from '@/stores'

const SubPage = observer(() => {
  //   useLingui()

  const {
    commonStore: { isPC },
  } = useStore()

  const data: any = null

  return (
    <Container
      py={{ base: px2vw(70), lg: '106px' }}
      px={{ base: px2vw(20), lg: '0' }}
      maxW='995px'
      pos='relative'
    >
      <GoSaved />
      <MotionBox
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
      >
        <Box w='100%'>
          <Text as='h1' textStyle={'ch1'}>
            Title of news article
          </Text>
        </Box>
        <Flex w='100%' alignItems={'flex-end'} justifyContent={'space-between'} mt='25px'>
          <Stack direction={'row'} spacing={'21px'} alignItems={'center'}>
            <UserImg src={''} w='69px' h='69px' />
            <Stack
              direction={'column'}
              color='#595959'
              textStyle={{ base: 'cp', lg: 'h2' }}
              spacing={0}
              className='ellipsis'
            >
              <Text className='ellipsis'>kring</Text>
              <Text className='ellipsis'>{formatTime(1692930902631, true)}</Text>
            </Stack>
          </Stack>
          {isPC ? (
            <Stack direction='row' spacing={'25px'}>
              <CollectBtn iconH='29px' id={data?.id} />
            </Stack>
          ) : null}
        </Flex>
        <AspectRatio w='100%' ratio={998 / 186} mt={{ base: px2vw(21), lg: '32px' }}>
          <Image src={`/images/home/screen3/1.jpg`} alt='' w='100%' objectFit='cover' />
        </AspectRatio>
        <Box mt={{ base: px2vw(6), lg: '37px' }} textStyle={'p'} color='#595959'>
          At Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you
          are a project, an investor,At Hexa Hub, we are looking for leaders within the emerging
          tech landscape. Whether you are a project, an investor,At Hexa Hub, we are looking for
          leaders within the emerging tech landscape. Whether you are a project, an investor,At Hexa
          Hub, we are looking for leaders within the emerging tech landscape. Whether you are a
          project, an investor, At Hexa Hub, we are looking for leaders within the emerging tech
          landscape. Whether you are a project, an investor,At Hexa Hub, we are looking for leaders
          within the emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we
          are looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor, At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor, At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor, At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,At Hexa Hub, we are looking for leaders within the
          emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we are
          looking for leaders within the emerging tech landscape. Whether you are a project, an
          investor,At Hexa Hub, we are looking for leaders within the emerging tech landscape.
          Whether you are a project, an investor,
        </Box>
        <Flex mt='50px'>
          <Stack direction='row' spacing={'24px'} flex={1} w={0}>
            {['#dasd', '#dasdas', '#dsada'].map(item => {
              return (
                <Text key={item} color='#000000' textStyle={'cp'}>
                  {item}
                </Text>
              )
            })}
          </Stack>
          {!isPC ? (
            <Stack direction='row'>
              <CollectBtn id={data?.id} />
            </Stack>
          ) : null}
        </Flex>
      </MotionBox>
    </Container>
  )
})
export default SubPage
