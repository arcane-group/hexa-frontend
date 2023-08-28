import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Stack } from '@chakra-ui/react'
import { memo, useCallback, useMemo } from 'react'

import { useInitSetPageScroll, useInitPageScroll, usePageStore } from '@/hooks/usePageStore'
import { GoSaved } from './index'
import { Container } from '@/components/Container'
import type { NewsCategory } from '@/stores/pageStore/NewsCategory'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getNewsCategoryList } from '@/services/news'
import { InfiniteVirtualScroll } from '../InfiniteVirtualScroll'
import { NewsCard } from './Card'
import { px2vw } from '@/utils/px2vw'

const Category = observer(() => {
  const router = useRouter()
  const { id } = router.query

  const idStr = Array.isArray(id) ? id[0] : id

  useInitSetPageScroll()

  return (
    <Container py={{ base: px2vw(70), lg: '120px' }} pos='relative'>
      <GoSaved right={{ base: px2vw(20), lg: '40px', xxl: '80px' }} />
      {idStr && <List id={idStr} />}
    </Container>
  )
})
export default Category

const List = observer(({ id }: { id: string }) => {
  useInitPageScroll(id)

  const { Rows, Columns, PAGE_SIZE } = useMemo(() => {
    // 判断屏幕尺寸, 不做 resize 监听
    const width = window.innerWidth
    if (width >= 768) {
      return {
        Rows: 10,
        Columns: 2,
        PAGE_SIZE: 10 * 2,
      }
    }
    return {
      Rows: 20,
      Columns: 1,
      PAGE_SIZE: 20 * 1,
    }
  }, [])

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
      reloadDeps: [setFinalData, Columns, Rows],
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
      renderPageSize={Rows}
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
    <Stack
      direction={'row'}
      spacing={'152px'}
      mb='40px'
      w={{
        base: '100%',
        lg: 'max-content',
      }}
      mx='auto'
    >
      {data?.map((item, index) => {
        if (!item) {
          return null
        }
        return <NewsCard key={index} data={item} />
      })}
    </Stack>
  )
})
