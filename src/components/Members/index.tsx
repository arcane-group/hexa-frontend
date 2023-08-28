import { observer } from 'mobx-react-lite'
import { Stack } from '@chakra-ui/react'
import { memo, useCallback, useMemo } from 'react'

import { useInitSetPageScroll, useInitPageScroll, usePageStore } from '@/hooks/usePageStore'
import { Container } from '@/components/Container'
import type { MemberIndex } from '@/stores/pageStore/MemberIndex'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getMemberList } from '@/services/member'
import { InfiniteVirtualScroll } from '../InfiniteVirtualScroll'
import { MemberCard } from './Card'
import px2vw from '@/utils/px2vw'

// TODO： 待加判断，只有当用户有 SBT 权限时候才能访问
const Members = observer(({ id }: { id: string }) => {
  useInitSetPageScroll()

  return (
    <Container py={{ base: px2vw(20), lg: '120px' }} pos='relative'>
      <List id={id} />
    </Container>
  )
})
export default Members

const List = observer(({ id }: { id: string }) => {
  useInitPageScroll(id)

  const { Rows, Columns, PAGE_SIZE } = useMemo(() => {
    // 判断屏幕尺寸, 不做 resize 监听
    const width = window.innerWidth
    if (width >= 1440) {
      return {
        Rows: 6,
        Columns: 4,
        PAGE_SIZE: 6 * 4,
      }
    } else if (width >= 768) {
      return {
        Rows: 8,
        Columns: 3,
        PAGE_SIZE: 8 * 3,
      }
    }
    return {
      Rows: 24,
      Columns: 1,
      PAGE_SIZE: 24 * 1,
    }
  }, [])

  const {
    setData: setFinalData,
    getData: finalData,
    getInfiniteScrollProps,
    setInfiniteScrollProps,
  } = usePageStore<MemberIndex>(id)

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    d => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getMemberList(page, PAGE_SIZE, id).then((res: any) => {
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
      renderPageSize={PAGE_SIZE / Columns}
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
      spacing={'26px'}
      mb='22px'
      w={{ base: '100%', lg: 'max-content' }}
      mx='auto'
    >
      {data?.map((item, index) => {
        if (!item) {
          return null
        }
        return <MemberCard key={index} data={item} />
      })}
    </Stack>
  )
})
