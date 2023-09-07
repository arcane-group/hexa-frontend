import { Box, Text, Image, AspectRatio, Flex, Stack } from '@chakra-ui/react'
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
import { observer } from 'mobx-react-lite'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/next-js'

import { CollectBtn } from '@/components/Library/CollectBtn'
import { GoSaved } from '@/components/News/index'
import { Container } from '@/components/Container'
import { MotionBox } from '@/components/Motion'
import { UserImg } from '@/components/UserImg'
import { formatTime } from '@/utils/formatTime'
import px2vw from '@/utils/px2vw'
import { useStore } from '@/stores'
import { HasSBT } from '@/components/Layout/HasSBT'
import { getLibraryById } from '@/services/api/library'
import { Loading } from '@/components/Loading'

const SubPage = observer(() => {
  const {
    query: { id },
  } = useRouter()

  const strId = Array.isArray(id) ? id[0] : id

  return (
    <Container
      py={{ base: px2vw(70), lg: '106px' }}
      px={{ base: px2vw(20), lg: '0' }}
      maxW='995px'
      pos='relative'
    >
      <HasSBT>
        <GoSaved />
        <Main id={strId} />
      </HasSBT>
    </Container>
  )
})
export default SubPage

const Main = observer(({ id }: { id?: string }) => {
  const {
    commonStore: { isPC },
  } = useStore()

  const { data, loading } = useRequest(
    async () => {
      if (!id) {
        return Promise.resolve(null)
      }
      return await getLibraryById(id).then(res => {
        if (res?.code >= 0) {
          return res?.data || null
        }
        return null
      })
    },
    {
      refreshDeps: [id],
    }
  )
  console.log('getLibraryById data:', data)

  if (loading) {
    return (
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
        <Loading />
      </MotionBox>
    )
  }

  return (
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
          {data?.title}
        </Text>
      </Box>
      <Flex w='100%' alignItems={'flex-end'} justifyContent={'space-between'} mt='25px'>
        <Stack direction={'row'} spacing={'21px'} alignItems={'center'}>
          {/* 缺失头像字段 */}
          <UserImg src={''} w='69px' h='69px' />
          <Stack
            direction={'column'}
            color='#595959'
            textStyle={{ base: 'cp', lg: 'h2' }}
            spacing={0}
            className='ellipsis'
          >
            <Text className='ellipsis'>缺失名字字段</Text>
            <Text className='ellipsis'>{formatTime(data?.updatedAt, true)}</Text>
          </Stack>
        </Stack>
        {isPC ? (
          <Stack direction='row' spacing={'25px'}>
            <CollectBtn iconH='29px' id={data?._id} />
          </Stack>
        ) : null}
      </Flex>
      <AspectRatio w='100%' ratio={998 / 186} mt={{ base: px2vw(21), lg: '32px' }}>
        <Image src={data?.image} alt='' w='100%' objectFit='cover' />
      </AspectRatio>
      <Box mt={{ base: px2vw(6), lg: '37px' }} textStyle={'p'} color='#595959'>
        {data?.text}
      </Box>
      <Flex mt='50px'>
        <Stack direction='row' spacing={'24px'} flex={1} w={0}>
          {[`${data?.category}`].map(item => {
            return (
              <Link key={item} href={`/library/category/${item}`} color='#000000' textStyle={'cp'}>
                #{item}
              </Link>
            )
          })}
        </Stack>
        {!isPC ? (
          <Stack direction='row'>
            <CollectBtn id={data?._id} />
          </Stack>
        ) : null}
      </Flex>
    </MotionBox>
  )
})
