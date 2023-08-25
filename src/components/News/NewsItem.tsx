import { Box, Center, Stack, Text, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { LikeBtn } from './LikeBtn'
import { CollectBtn } from './CollectBtn'
import { formatTime } from '@/utils/formatTime'
import { UserImg } from '@/components/UserImg'

export const NewsItem = ({ data }: { data: any }) => {
  const router = useRouter()

  return (
    <Box
      pt='28px'
      className='hover'
      _hover={{
        bgColor: 'whiteAlpha.300',
      }}
      transition={'all 0.3s'}
      onClick={() => {
        router.push({
          pathname: '/news-feed/sub-page',
          query: {
            id: data?.id,
          },
        })
      }}
    >
      <Center justifyContent={'space-between'}>
        <Text color='#000000' textStyle={'cp'}>
          TITLE OF DEV GUIDE
        </Text>
        <Stack direction={'row'} spacing={'15px'} alignItems={'center'}>
          <UserImg src={''} w='42px' h='42px' />
          <Stack
            direction={'row'}
            color='#595959'
            textStyle={'csmp'}
            spacing={0}
            className='ellipsis'
          >
            <Text className='ellipsis'>kring</Text>
            <Text className='ellipsis'>{formatTime(1692930902631, true)}</Text>
          </Stack>
        </Stack>
      </Center>
      <Box
        mt='7px'
        textStyle={'h2'}
        color='#595959'
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
        overflow={'hidden'}
        textOverflow='ellipsis'
        display={'-webkit-box'}
        maxH={`${22 * 1.5 * 2}px`}
      >
        At Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you are
        a project, an investor,At Hexa Hub, we are looking for leaders within the emerging tech
        landscape. Whether you are a project, an investor,At Hexa Hub, we are looking for leaders
        within the emerging tech landscape. Whether you are a project, an investor,At Hexa Hub, we
        are looking for leaders within the emerging tech landscape. Whether you are a project, an
        investor,
      </Box>
      <Center justifyContent={'space-between'} mt='15px'>
        <Stack direction='row' spacing={'18px'}>
          {['#dasd', '#dasdas', '#dsada'].map(item => {
            return (
              <Text key={item} color='#1D1D1D' textStyle={'csmp'}>
                {item}
              </Text>
            )
          })}
        </Stack>
        <Stack direction='row' spacing={'25px'}>
          <LikeBtn iconH='29px' id={data?.id} />
          <CollectBtn iconH='29px' id={data?.id} />
        </Stack>
      </Center>
      <Box
        m='auto'
        mt='50px'
        borderColor={'gray.200'}
        borderWidth={'1px'}
        borderStyle={'solid'}
        w='100%'
        maxW='997px'
        h='320px'
      >
        video box
      </Box>
      <Divider mt='28px' borderColor={'#155973'} />
    </Box>
  )
}
