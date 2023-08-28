import { AspectRatio, Box, Center, Stack, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

import { CollectBtn } from '@/components/News/CollectBtn'
import { useStore } from '@/stores'
import px2vw from '@/utils/px2vw'

const PL_NUM = 50
export const LibraryItem = observer(({ data, index }: { data: any; index: number }) => {
  const router = useRouter()

  const {
    commonStore: { isPC },
  } = useStore()

  const reverseNum = isPC ? (index % 8) - 4 : 0
  const pl = isPC
    ? reverseNum > 0
      ? `${(4 - reverseNum) * PL_NUM}px`
      : `${(index % 8) * PL_NUM}px`
    : 0

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
        direction={{ base: 'column', lg: 'row' }}
        spacing={'30px'}
        alignItems={'center'}
        pl={pl}
        _groupHover={{
          pl: 0,
        }}
        transition={'all 0.3s'}
      >
        <Box
          w={{ base: '100%', lg: '320px' }}
          h={{ lg: '200px' }}
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
        <Box pos='relative' flex={1} w={{ lg: '0' }} h='max-content'>
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
            textStyle={{ base: 'smp', lg: 'p' }}
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
            maxH={{
              base: px2vw(14 * 1.5 * 5),
              lg: `${16 * 1.5 * 5}px`,
            }}
          >
            At Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you
            are a project, an investor,At Hexa Hub, we are looking for leaders within the emerging
            tech landscape. Whether you are a project, an investor,At Hexa Hub, we are looking for
            leaders within the emerging tech landscape. Whether you are a project, an investor,At
            Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you are
            a project, an investor,
          </Box>
          <Text color='#595959' textStyle={'smp'} mt={{ base: px2vw(14), lg: '38px' }}>
            {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Box>
      </Stack>
      <Box
        mt={{
          base: px2vw(28),
          lg: 0,
        }}
        h='1px'
        w='100%'
        bgGradient={'linear-gradient(270deg, #FAA775 0%, rgba(252, 199, 119, 0) 100%)'}
      />
    </Box>
  )
})
