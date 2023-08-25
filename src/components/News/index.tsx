import { Box, Text, Image, AspectRatio, Flex, Stack, type StackProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useLingui } from '@lingui/react'
import dayjs from 'dayjs'
import { Link } from '@chakra-ui/next-js'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { observer } from 'mobx-react-lite'
import { memo, useCallback } from 'react'

import { NewsItem } from './NewsItem'
import { getNewsLatestList } from '@/services/news'
import { InfiniteVirtualScroll } from '@/components/InfiniteVirtualScroll'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useInitSetPageScroll, useInitPageScroll } from '@/hooks/usePageStore'
import { MotionCenter } from '@/components/Motion'
import EffectCoverflow from '@/lib/swiper/effect-coverflow.mjs'
import { Container } from '@/components/Container'
import savedImg from '@/assets/svg/news/saved-icon.svg'
import { usePageStore } from '@/hooks/usePageStore'
import type { NewsIndex } from '@/stores/pageStore/NewsIndex'

export const GoSaved = (reset: StackProps) => {
  useLingui()

  const router = useRouter()

  return (
    <Stack
      direction={'row'}
      spacing={'6px'}
      pos='absolute'
      right={0}
      top='44px'
      alignItems={'center'}
      className='hover'
      onClick={() => {
        router.push('/profile')
      }}
      {...reset}
    >
      <Image src={savedImg.src} alt='Go to Saved' h='33px' />
      <Text textStyle={'cp'}>{t`SAVED`}</Text>
    </Stack>
  )
}

const HotTopic = () => {
  return (
    <Stack
      bgColor={'#FBD59F'}
      sx={{
        border: '1px solid',
        borderImage: 'linear-gradient(346.35deg, #155973 5%, rgba(21, 89, 115, 0) 13.2%) 1',
      }}
      bgSize={'100% 100%'}
      direction={'column'}
      spacing={'10px'}
      pos='fixed'
      zIndex={19}
      right={'17px'}
      top='60vh'
      alignItems={'center'}
      px='23px'
      py='36px'
    >
      <Box
        pos='absolute'
        left={'-1px'}
        top={'-1px'}
        bottom={'-1px'}
        right={'-1px'}
        zIndex={0}
        pointerEvents={'none'}
        userSelect={'none'}
        sx={{
          border: '1px solid',
          borderImage: 'linear-gradient(164.41deg, #155973 -1.88%, rgba(21, 89, 115, 0) 20.51%) 1',
        }}
      />
      {['1212', '3333', 'dasdasd', 'dasdasd'].map((item, index) => {
        const search = item?.trim()
        return (
          <Link
            key={index}
            href={{
              // TODO: 跳转哪里
              pathname: '/',
            }}
            className='hover'
          >
            {search?.startsWith('#') ? search : '#' + search}
          </Link>
        )
      })}
    </Stack>
  )
}

export const News = observer(() => {
  useLingui()

  useInitSetPageScroll()

  // const [index, setIndex] = useState(0)

  return (
    <Container py='119px' maxW='1117px' pos='relative'>
      <GoSaved />
      <HotTopic />
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
          <Text textStyle={'ch1'}>{t`TRENDING`}</Text>
        </Box>
        <Box
          w='1240px'
          mt='235px'
          sx={{
            '.swiper': {
              width: '100%',
              height: '100%',
              overflow: 'visible',
            },
            '.news-swiper-slide': {
              width: '306px',
              height: '570px',
              _hover: {
                zIndex: '9 !important',
              },
            },
          }}
        >
          <Swiper
            // initialSlide={index}
            // onSlideChange={swiper => {
            //   setIndex(swiper?.realIndex)
            // }}
            effect={'coverflow'}
            centeredSlides
            centeredSlidesBounds
            centerInsufficientSlides
            grabCursor={false}
            slidesPerView={4}
            modules={[EffectCoverflow]}
          >
            {/* TODO: data 必须是偶数 */}
            {[1, 2, 3, 4].map(item => {
              return (
                <SwiperSlide key={item} className='news-swiper-slide'>
                  <CategoryCard data={item} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </MotionCenter>
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
        mt='44px'
      >
        <Box w='100%'>
          <Text textStyle={'ch1'}>{t`LATEST`}</Text>
        </Box>
        <Box w='100%'>
          <LatestList />
        </Box>
      </MotionCenter>
    </Container>
  )
})

const CategoryCard = ({ data }: { data: any }) => {
  return (
    <Flex pos='relative' w='100%' h='100%' flexDir={'column'} cursor={'pointer'} role='group'>
      <Text
        pos='absolute'
        zIndex={2}
        right={'20px'}
        top={'18px'}
        color='#1D1D1D'
        textStyle={'csmp'}
      >
        CATEGORY
      </Text>
      <Box
        bgColor={'rgba(30, 202, 220, 0)'}
        sx={{
          border: '3px solid',
          borderImage: 'linear-gradient(306.32deg, #1ECADC 1.42%, rgba(30, 202, 220, 0) 100%) 1',
        }}
        overflow={'hidden'}
      >
        <AspectRatio w='100%' ratio={306 / 255}>
          <Image
            src='https://swiperjs.com/demos/images/nature-1.jpg'
            alt=''
            objectFit={'cover'}
            transform='scale(1)'
            _groupHover={{
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </AspectRatio>
      </Box>
      <Box
        flex={1}
        px='21px'
        py='26px'
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 20%, rgba(138, 247, 252, 0) 75.08%)'}
      >
        <Text textStyle={'h1'} color='#1D1D1D'>
          MEMBER TITLE - {data}
        </Text>
        <Text
          color='#595959'
          textStyle={'p'}
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
          h={`${16 * 1.5 * 3}px`}
          my='14px'
        >
          Arcane welcomes the different, the trailblazers, the novel. If you have a growth mindset
          and deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
          have a growth mindset and deep，if you have Arcane welcomes the different, the
          trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
          welcomes the different, the trailblazers, the novel. If you have a growth mindset and
          deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you have
          a growth mindset and deep，if you have Arcane welcomes the different, the trailblazers,
          the novel. If you have a growth mindset and deep，if you have Arcane welcomes the
          different, the trailblazers, the novel. If you have a growth mindset and deep，if you have
        </Text>
        <Text color='#595959' textStyle={'csmp'}>
          {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Box>
    </Flex>
  )
}

const PAGE_SIZE = 20
const LatestList = observer(() => {
  useInitPageScroll(`latest`)

  const {
    setNews: setFinalData,
    getNews: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<NewsIndex>('')

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    d => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getNewsLatestList(page, PAGE_SIZE).then((res: any) => {
        if (res?.data?.code >= 0) {
          const newL = (res.data?.data?.list as any[]) || []
          return {
            list: newL,
            hasMore: newL?.length >= PAGE_SIZE,
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

  const itemKey = useCallback((index: number) => {
    return `${index}`
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
const Cell = memo(({ data }: any) => {
  if (!data) {
    return null
  }
  return <NewsItem data={data} />
})
