import { Box, Text, Image, AspectRatio, Flex, Stack } from '@chakra-ui/react'
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
import { observer } from 'mobx-react-lite'

import { LikeBtn } from './LikeBtn'
import { CollectBtn } from './CollectBtn'
import { GoSaved } from './index'
import { Container } from '@/components/Container'
import { MotionBox } from '@/components/Motion'
import { UserImg } from '@/components/UserImg'
import { formatTime } from '@/utils/formatTime'

const SubPage = observer(() => {
  //   useLingui()

  const data: any = null

  return (
    <Container py='106px' px='0' maxW='995px' pos='relative'>
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
              textStyle={'h2'}
              spacing={0}
              className='ellipsis'
            >
              <Text className='ellipsis'>kring</Text>
              <Text className='ellipsis'>{formatTime(1692930902631, true)}</Text>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={'25px'}>
            <LikeBtn iconH='29px' id={data?.id} />
            <CollectBtn iconH='29px' id={data?.id} />
          </Stack>
        </Flex>
        <AspectRatio w='100%' ratio={998 / 186} mt='32px'>
          <Image src={`/images/home/screen3/1.jpg`} alt='' w='100%' objectFit='cover' />
        </AspectRatio>
        <Box mt='37px' textStyle={'p'} color='#595959'>
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
        <Stack direction='row' spacing={'24px'} mt='50px'>
          {['#dasd', '#dasdas', '#dsada'].map(item => {
            return (
              <Text key={item} color='#000000' textStyle={'cp'}>
                {item}
              </Text>
            )
          })}
        </Stack>
      </MotionBox>
    </Container>
  )
})
export default SubPage
