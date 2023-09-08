import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Stack } from '@chakra-ui/react'
import { memo, useCallback, useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { useInitSetPageScroll, useInitPageScroll, usePageStore } from '@/hooks/usePageStore'
import { GoSaved } from '@/components/News/index'
import { Container } from '@/components/Container'
import type { LibraryCategory } from '@/stores/pageStore/LibraryCategory'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getLibraryCategoryList } from '@/services/api/library'
import { InfiniteVirtualScroll } from '../InfiniteVirtualScroll'
import { LibraryCard } from './Card'
import { px2vw } from '@/utils/px2vw'
import { HasSBT } from '@/components/Layout/HasSBT'

const Category = observer(() => {
  useLingui()

  const router = useRouter()
  const { id } = router.query

  const idStr = Array.isArray(id) ? id[0] : id

  useInitSetPageScroll()

  return (
    <Container py={{ base: px2vw(70), lg: '120px' }} pos='relative'>
      <HasSBT tips={t`Oops! Seems like you aren’t a Hexa Member yet. Please connect wallet to verify or visit our membership page for more info.`}>
        <GoSaved right={{ base: px2vw(20), lg: '40px', xxl: '80px' }} />
        {idStr && <List id={idStr} />}
      </HasSBT>
    </Container>
  )
})
export default Category

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
  } = usePageStore<LibraryCategory>(id)

  const infiniteScrollResult = useInfiniteScroll(
    {
      finalData,
      setFinalData,
    },
    _d => {
      // const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getLibraryCategoryList(id).then(res => {
        if (res?.code >= 0) {
          const newL = res?.data || []
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
      reloadDeps: [setFinalData, Columns, Rows],
      isNoMore: d => {
        return !(d && d.hasMore)
      },
    }
  )

  const itemKey = useCallback((index: number, data: any) => {
    return `${index}_${data?._id}`
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
        return <LibraryCard key={index} data={item} />
      })}
    </Stack>
  )
})
