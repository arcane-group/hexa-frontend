import { AspectRatio, Box, Center, Stack, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { CollectBtn } from '@/components/News/CollectBtn'

const PL_NUM = 50
export const LibraryItem = ({ data, index }: { data: any; index: number }) => {
  const router = useRouter()

  const reverseNum = (index % 8) - 4
  const pl = reverseNum > 0 ? `${(4 - reverseNum) * PL_NUM}px` : `${(index % 8) * PL_NUM}px`

  return (
    <Box
      mt='20px'
      className='hover'
      _hover={{
        bgColor: 'whiteAlpha.300',
      }}
      transition={'all 0.3s'}
      onClick={() => {
        router.push({
          pathname: '/library/sub-page',
          query: {
            id: data?.id,
          },
        })
      }}
      role='group'
    >
      <Stack
        direction={'row'}
        spacing={'30px'}
        alignItems={'center'}
        pl={pl}
        _groupHover={{
          pl: 0,
        }}
        transition={'all 0.3s'}
      >
        <Box
          w='320px'
          h='200px'
          bgColor={'#fff'}
          sx={{
            border: '2px solid',
            borderImage: 'linear-gradient(290.3deg, #1ECADC 2.76%, #8AF7FC 94.86%) 1',
          }}
        >
          <AspectRatio w='100%' ratio={320 / 200}>
            <Image src={''} alt='' />
          </AspectRatio>
        </Box>
        <Box pos='relative' flex={1} w='0' h='max-content'>
          <Center justifyContent={'space-between'}>
            <Text color='#000000' textStyle={'h2'}>
              TITLE OF DEV GUIDE
            </Text>
            <Box>
              <CollectBtn iconH='29px' id={data?.id} />
            </Box>
          </Center>
          <Box
            mt='7px'
            textStyle={'p'}
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
            maxH={`${16 * 1.5 * 2}px`}
          >
            At Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you
            are a project, an investor,At Hexa Hub, we are looking for leaders within the emerging
            tech landscape. Whether you are a project, an investor,At Hexa Hub, we are looking for
            leaders within the emerging tech landscape. Whether you are a project, an investor,At
            Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you are
            a project, an investor,
          </Box>
          <Text color='#595959' textStyle={'smp'} mt='38px'>
            {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Box>
      </Stack>
      <Box
        h='1px'
        w='100%'
        bgGradient={'linear-gradient(270deg, #FAA775 0%, rgba(252, 199, 119, 0) 100%)'}
      />
    </Box>
  )
}
