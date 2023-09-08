import { Box, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { memo, useCallback, useMemo } from 'react'

import { useInitPageScroll } from '@/hooks/usePageStore'
// import { NewsCard } from '@/components/News/Card'
import { LibraryCard } from '@/components/Library/Card'
import { InfiniteVirtualScroll } from '@/components/InfiniteVirtualScroll'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getSavedArticles } from '@/services/api/user'
import { usePageStore } from '@/hooks/usePageStore'
import type { Profile } from '@/stores/pageStore/Profile'
import { observer } from 'mobx-react-lite'
import px2vw from '@/utils/px2vw'
import { useStore } from '@/stores'

export const SAVED = observer(() => {
  useLingui()

  useInitPageScroll(`saved`)

  const { walletStore } = useStore()

  const { Rows, Columns, PAGE_SIZE } = useMemo(() => {
    // 判断屏幕尺寸, 不做 resize 监听
    const width = window.innerWidth
    if (width >= 768) {
      return {
        Rows: 8,
        Columns: 2,
        PAGE_SIZE: 8 * 2,
      }
    }
    return {
      Rows: 24,
      Columns: 1,
      PAGE_SIZE: 24 * 1,
    }
  }, [])

  const {
    setSaved: setFinalData,
    getSaved: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<Profile>('')

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    _d => {
      return getSavedArticles(walletStore?.userInfo?.userId as string).then(res => {
        if (res?.code >= 0) {
          const newL = (res.data || [])?.filter(item => {
            return item?._id
          })
          const list: any[] = []
          newL.forEach((item, index: number) => {
            const rowIndex = Math.floor(index / Columns)
            if (!list[rowIndex]) {
              list[rowIndex] = []
            }
            list[rowIndex].push(item)
          })

          return {
            list: list,
            Columns,
            hasMore: false, // newL?.length >= PAGE_SIZE,
          }
        }
        return {
          list: [],
          Columns,
          hasMore: false,
        }
      })
    },
    {
      manual: finalData?.list?.length > 0,
      reloadDeps: [walletStore?.userInfo?.userId, setFinalData, Columns, Rows],
      isNoMore: d => {
        return !(d && d.hasMore)
      },
    }
  )

  const itemKey = useCallback((index: number) => {
    return `${index}`
  }, [])

  return (
    <Box w={{ base: '100%', lg: 'max-content' }} m='auto'>
      <Text textStyle={'ch2'} color='#000'>{t`SAVED`}</Text>
      <Box
        mt='26px'
        minW={{
          lg: 300 * 2 + 152,
        }}
      >
        <InfiniteVirtualScroll
          infiniteScrollResult={infiniteScrollResult}
          pageSize={PAGE_SIZE}
          renderPageSize={Rows}
          itemKey={itemKey}
          defaultState={getInfiniteScrollProps}
          onStateChange={setInfiniteScrollProps}
        >
          {Cell}
        </InfiniteVirtualScroll>
      </Box>
    </Box>
  )
})

// eslint-disable-next-line react/display-name
const Cell = memo(({ data }: any) => {
  if (!Array.isArray(data)) {
    return null
  }

  return (
    <Stack direction={'row'} spacing={{ lg: '152px' }} mb={{ base: px2vw(25), lg: '75px' }}>
      {data?.map((item, index) => {
        if (!item) {
          return null
        }
        return <LibraryCard key={index} data={item} />
      })}
    </Stack>
  )
})
