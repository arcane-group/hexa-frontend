import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Stack } from '@chakra-ui/react'
import { memo, useCallback } from 'react'

import { useInitSetPageScroll, useInitPageScroll, usePageStore } from '@/hooks/usePageStore'
import { GoSaved } from './index'
import { Container } from '@/components/Container'
import type { NewsCategory } from '@/stores/pageStore/NewsCategory'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getNewsCategoryList } from '@/services/news'
import { InfiniteVirtualScroll } from '../InfiniteVirtualScroll'
import { NewsCard } from './Card'
import { px2vw } from '@/utils/px2vw'

const Category = () => {
  const router = useRouter()
  const { id } = router.query

  const idStr = Array.isArray(id) ? id[0] : id

  useInitSetPageScroll()

  return (
    <Container py='120px' pos='relative'>
      <GoSaved right={{ base: px2vw(20), lg: '40px', xxl: '80px' }} />
      {idStr && <List id={idStr} />}
    </Container>
  )
}
export default Category

const Rows = 10
const Columns = 2
const PAGE_SIZE = Rows * Columns // 需要是 4 的倍数
const List = observer(({ id }: { id: string }) => {
  useInitPageScroll(id)

  const {
    setNews: setFinalData,
    getNews: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<NewsCategory>(id)

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    d => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getNewsCategoryList(page, PAGE_SIZE, id).then((res: any) => {
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
  if (!Array.isArray(data)) {
    return null
  }

  return (
    <Stack direction={'row'} spacing={'152px'} mb='40px' w='max-content' mx='auto'>
      {data?.map((item, index) => {
        if (!item) {
          return null
        }
        return <NewsCard key={index} data={item} />
      })}
    </Stack>
  )
})
