import { Box, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { memo, useCallback } from 'react'

import { useInitPageScroll } from '@/hooks/usePageStore'
import { NewsCard } from '@/components/News/Card'
import { InfiniteVirtualScroll } from '@/components/InfiniteVirtualScroll'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getMyCollectList } from '@/services/news'
import { usePageStore } from '@/hooks/usePageStore'
import type { Profile } from '@/stores/pageStore/Profile'

const Rows = 10
const Columns = 2
const PAGE_SIZE = Rows * Columns // 需要是 4 的倍数
export const SAVED = () => {
  useLingui()

  useInitPageScroll(`saved`)

  const {
    setSaved: setFinalData,
    getSaved: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<Profile>('') as any

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    d => {
      const page = d ? Math.ceil((d.list.length * Columns) / PAGE_SIZE) + 1 : 1
      return getMyCollectList(page, PAGE_SIZE).then((res: any) => {
        if (res?.data?.code >= 0) {
          const newL = (res.data?.data?.list as any[]) || []
          const list: any[] = []
          newL.forEach((item, index) => {
            const rowIndex = Math.floor(index / Columns)
            if (!list[rowIndex]) {
              list[rowIndex] = []
            }
            list[rowIndex].push(item)
          })

          return {
            list: list,
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
    <Box w='max-content' m='auto'>
      <Text textStyle={'ch2'} color='#000'>{t`SAVED`}</Text>
      <Box mt='26px' minW={410 * 2 + 152}>
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
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react/display-name
const Cell = memo(({ data }: any) => {
  if (!Array.isArray(data)) {
    return null
  }

  return (
    <Stack direction={'row'} spacing={'152px'} mb='75px'>
      {data?.map((item, index) => {
        if (!item) {
          return null
        }
        return <NewsCard key={index} />
      })}
    </Stack>
  )
})
