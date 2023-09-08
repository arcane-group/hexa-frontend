import { Box, Text, Image, AspectRatio, Flex } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useLingui } from '@lingui/react'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { observer } from 'mobx-react-lite'
import { memo, useCallback } from 'react'
import { useRequest } from 'ahooks'

import { LineButton } from '@/components/LineButton'
import { GoSaved } from '@/components/News/index'
import { Container } from '@/components/Container'
import { LibraryItem } from './LibraryItem'
import { InfiniteVirtualScroll } from '@/components/InfiniteVirtualScroll'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useInitSetPageScroll, useInitPageScroll } from '@/hooks/usePageStore'
import { MotionCenter } from '@/components/Motion'
import { usePageStore } from '@/hooks/usePageStore'
import { CollectBtn } from '@/components/Library/CollectBtn'
import type { LibraryIndex } from '@/stores/pageStore/LibraryIndex'
import px2vw from '@/utils/px2vw'
import { useStore } from '@/stores'
import { HasSBT } from '@/components/Layout/HasSBT'
import {
  getLibraryLatestList,
  getLibraryTopList,
  getLibraryreCommendedList,
  type ArticleSchema,
} from '@/services/api/library'

const Swiper2: any = Swiper

const Library = observer(() => {
  useLingui()

  useInitSetPageScroll()

  return (
    <Container
      py={{ base: px2vw(70), lg: '119px' }}
      maxW='1117px'
      pos='relative'
      overflow={'hidden'}
    >
      <HasSBT
        tips={t`Oops! Seems like you aren’t a Hexa Member yet. Please connect wallet to verify or visit our membership page for more info.`}
      >
        <GoSaved />

        <Main1 />

        <Main2 />

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
          flexDir={'column'}
        >
          <Box w='100%'>
            <Text textStyle={'ch1'}>{t`LATEST`}</Text>
          </Box>
          <Box w='100%'>
            <LatestList />
          </Box>
        </MotionCenter>
      </HasSBT>
    </Container>
  )
})
export default Library

const Main1 = () => {
  const {
    commonStore: { isPC },
  } = useStore()

  const { data } = useRequest(
    async () => {
      return await getLibraryreCommendedList().then(res => {
        if (res?.code >= 0) {
          return res?.data || []
        }
        return []
      })
    },
    {
      cacheKey: 'getLibraryreCommendedList',
      staleTime: -1,
    }
  )
  console.log('getLibraryreCommendedList data:', data)

  if (Array.isArray(data) && data?.length > 0) {
    return (
      <MotionCenter
        mb={{ base: px2vw(80), lg: '200px' }}
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
        flexDir={'column'}
      >
        <Box
          w='100%'
          sx={{
            '.swiper': {
              width: '100%',
              height: '100%',
              overflow: 'visible',
            },
            '.library-swiper-slide': {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Swiper2
            centeredSlides
            centeredSlidesBounds
            centerInsufficientSlides
            grabCursor={false}
            slidesPerView={isPC ? 4 : 1.1}
            spaceBetween={isPC ? undefined : 20}
          >
            {data.map(item => {
              return (
                <SwiperSlide key={item?._id} className='library-swiper-slide'>
                  <CategoryCard data={item} />
                </SwiperSlide>
              )
            })}
          </Swiper2>
        </Box>
      </MotionCenter>
    )
  }

  return null
}

const Main2 = () => {
  const router = useRouter()

  const { data } = useRequest(
    async () => {
      return await getLibraryTopList().then(res => {
        if (res?.code >= 0) {
          return res?.data?.[0] || null
        }
        return null
      })
    },
    {
      cacheKey: 'getLibraryTopList',
      staleTime: -1,
    }
  )
  console.log('getLibraryTopList data:', data)

  if (data) {
    return (
      <MotionCenter
        mb={{ base: px2vw(80), lg: '200px' }}
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
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box
          w={{ base: px2vw(320), lg: '520px' }}
          h={{ base: px2vw(320), lg: '520px' }}
          bgGradient={'linear-gradient(164.72deg, #8AF7FC 1.2%, rgba(138, 247, 252, 0) 75.08%)'}
          border='3px solid #1ECADC'
          pos='relative'
          _after={{
            content: `" "`,
            pos: 'absolute',
            top: '9px',
            left: '9px',
            width: '100%',
            height: '100%',
            border: '1px solid #1ECADC',
            zIndex: 0,
          }}
          mr={{ lg: '53px' }}
        >
          <Image w='100%' h='100%' src={data?.image} alt='' objectFit={'cover'} />
        </Box>
        <Box flex={1} pos='relative' mt={{ base: px2vw(21), lg: '0' }}>
          <Box pos='absolute' zIndex={2} right={'0'} top={'0'}>
            <CollectBtn
              id={data?._id}
              data={data}
              iconH={'28px'}
              btnProps={{
                h: '28px',
              }}
            />
          </Box>
          <Text textStyle={'cp'} color='#1D1D1D'>
            {data?.category}
          </Text>
          <Text textStyle={'ch2'} mt={{ base: px2vw(13), lg: '0' }} color='#1D1D1D'>
            {data?.title}
          </Text>
          <Text
            color='#595959'
            textStyle={{ base: 'smp', lg: 'cp' }}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
            overflow={'hidden'}
            textOverflow='ellipsis'
            display={'-webkit-box'}
            h={{
              base: px2vw(14 * 1.5 * 3),
              lg: `${24 * 1.5 * 3}px`,
            }}
            my={{ base: px2vw(13), lg: '14px' }}
          >
            {data?.description}
          </Text>
          <Text color='#595959' textStyle={'csmp'} mb={{ base: px2vw(20), lg: '100px' }}>
            {dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <LineButton
            w='210px'
            onClick={() => {
              router.push({
                pathname: '/library/sub-page',
                query: {
                  id: data?._id,
                },
              })
            }}
          >{t`Play`}</LineButton>
        </Box>
      </MotionCenter>
    )
  }

  return null
}

const CategoryCard = ({ data }: { data: ArticleSchema }) => {
  const router = useRouter()

  return (
    <AspectRatio
      w='100%'
      ratio={{
        base: 280 / 578,
        lg: 320 / 578,
      }}
    >
      <Flex
        className='hover'
        pos='relative'
        w='100%'
        h='100%'
        cursor={'pointer'}
        role='group'
        bgImage={data?.image}
        bgSize={'cover'}
        border='1.5px solid #1ECADC'
        borderTopWidth={'3px'}
        borderBottomWidth={'3px'}
        boxShadow={'13px 15px 16px 0px #24BCCC57'}
        onClick={() => {
          router.push({
            pathname: '/library/sub-page',
            query: {
              id: data?._id,
            },
          })
        }}
      >
        <Box
          bgGradient={'linear-gradient(164.72deg, #8AF7FC 1.2%, rgba(138, 247, 252, 0) 75.08%)'}
          pos='absolute'
          left={0}
          top={0}
          width={'100%'}
          height={'100%'}
          zIndex={0}
        />
        <Text
          pos='absolute'
          zIndex={2}
          left={'26px'}
          top={'18px'}
          color='#1D1D1D'
          textStyle={'csmp'}
        >
          {data?.category}
        </Text>
        <Box pos='absolute' zIndex={2} right={'26px'} top={'18px'}>
          <CollectBtn
            id={data?._id}
            data={data}
            iconH={'28px'}
            btnProps={{
              h: '28px',
            }}
          />
        </Box>
        <Flex
          px='30px'
          flex={1}
          justifyContent={'flex-end'}
          flexDir={'column'}
          pos='relative'
          zIndex={1}
          w={0}
          height={'100%'}
        >
          <Text textStyle={'h2'} color='#1D1D1D' className='ellipsis'>
            {data?.title}
          </Text>
          <Text
            color='#595959'
            textStyle={{ base: 'smp', lg: 'p' }}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
            }}
            overflow={'hidden'}
            textOverflow='ellipsis'
            display={'-webkit-box'}
            h={{
              base: px2vw(14 * 1.5 * 5),
              lg: `${16 * 1.5 * 5}px`,
            }}
            my='14px'
          >
            {data?.description}
          </Text>
          <Text color='#595959' textStyle={'smp'} mb='57px'>
            {dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Flex>
      </Flex>
    </AspectRatio>
  )
}

const PAGE_SIZE = 20
const LatestList = observer(() => {
  useInitPageScroll(`latest`)

  const {
    setData: setFinalData,
    getData: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<LibraryIndex>('')

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    _d => {
      // const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getLibraryLatestList().then(res => {
        if (res?.code >= 0) {
          const newL = res?.data || []
          return {
            list: newL,
            hasMore: false, // newL?.length >= PAGE_SIZE,
          }
        }
        return {
          list: [],
          hasMore: false,
        }
      })
    },
    {
      manual: finalData?.list?.length > 0,
      reloadDeps: [setFinalData],
      isNoMore: d => {
        return !(d && d.hasMore)
      },
    }
  )

  const itemKey = useCallback((index: number, data: any) => {
    return `${data?._id}_${index}`
  }, [])

  return (
    <InfiniteVirtualScroll
      infiniteScrollResult={infiniteScrollResult}
      pageSize={PAGE_SIZE}
      renderPageSize={PAGE_SIZE / 2}
      itemKey={itemKey}
      defaultState={getInfiniteScrollProps}
      onStateChange={setInfiniteScrollProps}
    >
      {Cell}
    </InfiniteVirtualScroll>
  )
})

// eslint-disable-next-line react/display-name
const Cell = memo(({ data, index }: any) => {
  if (!data) {
    return null
  }
  return <LibraryItem data={data} index={index} />
})
