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
      <HasSBT>
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
      return await getLibraryreCommendedList().then((res: any) => {
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
                <SwiperSlide key={item} className='library-swiper-slide'>
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
      return await getLibraryTopList().then((res: any) => {
        if (res?.code >= 0) {
          return res?.data || []
        }
        return []
      })
    },
    {
      cacheKey: 'getLibraryTopList',
      staleTime: -1,
    }
  )
  console.log('getLibraryTopList data:', data)

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
          <Image w='100%' h='100%' src={''} alt='' />
        </Box>
        <Box flex={1} pos='relative' mt={{ base: px2vw(21), lg: '0' }}>
          <Box pos='absolute' zIndex={2} right={'0'} top={'0'}>
            <CollectBtn
              id={'123'}
              data={{} as any}
              iconH={'28px'}
              btnProps={{
                h: '28px',
              }}
            />
          </Box>
          <Text textStyle={'cp'} color='#1D1D1D'>
            Podcast
          </Text>
          <Text textStyle={'ch2'} mt={{ base: px2vw(13), lg: '0' }} color='#1D1D1D'>
            TITLE OF LASTEST ARTICLE
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
            Arcane welcomes the different, the trailblazers, the novel. If you have a growth mindset
            and deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
            have a growth mindset and deep，if you have Arcane welcomes the different, the
            trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
            welcomes the different, the trailblazers, the novel. If you have a growth mindset and
            deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
            have a growth mindset and deep，if you have Arcane welcomes the different, the
            trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
            welcomes the different, the trailblazers, the novel. If you have a growth mindset and
            deep，if you have
          </Text>
          <Text color='#595959' textStyle={'csmp'} mb={{ base: px2vw(20), lg: '100px' }}>
            {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <LineButton
            w='210px'
            onClick={() => {
              router.push({
                pathname: '/library/category/[id]',
                query: {
                  id: '123',
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

const CategoryCard = ({ data }: { data: any }) => {
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
        flexDir={'column'}
        cursor={'pointer'}
        role='group'
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 1.2%, rgba(138, 247, 252, 0) 75.08%)'}
        border='1.5px solid #1ECADC'
        borderTopWidth={'3px'}
        borderBottomWidth={'3px'}
        px='30px'
        boxShadow={'13px 15px 16px 0px #24BCCC57'}
        onClick={() => {
          router.push({
            pathname: '/library/category/[id]',
            query: {
              id: data,
            },
          })
        }}
      >
        <Text
          pos='absolute'
          zIndex={2}
          left={'26px'}
          top={'18px'}
          color='#1D1D1D'
          textStyle={'csmp'}
        >
          CATEGORY
        </Text>
        <Box pos='absolute' zIndex={2} right={'26px'} top={'18px'}>
          <CollectBtn
            id={data?.id}
            data={data}
            iconH={'28px'}
            btnProps={{
              h: '28px',
            }}
          />
        </Box>
        <Flex flex={1} justifyContent={'flex-end'} flexDir={'column'}>
          <Text textStyle={'h2'} color='#1D1D1D'>
            MEMBER TITLE - {data}
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
            Arcane welcomes the different, the trailblazers, the novel. If you have a growth mindset
            and deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
            have a growth mindset and deep，if you have Arcane welcomes the different, the
            trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
            welcomes the different, the trailblazers, the novel. If you have a growth mindset and
            deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
            have a growth mindset and deep，if you have Arcane welcomes the different, the
            trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
            welcomes the different, the trailblazers, the novel. If you have a growth mindset and
            deep，if you have
          </Text>
          <Text color='#595959' textStyle={'smp'} mb='57px'>
            {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
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
