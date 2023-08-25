import { Box, Button, Center, type BoxProps } from '@chakra-ui/react'
import {
  useState,
  useMemo,
  createElement,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { type Data } from 'ahooks/lib/useInfiniteScroll/types'
import { useThrottleFn } from 'ahooks'

import { MotionBox } from '@/components/Motion'
import { Loading } from '@/components/Loading'

type TProps<TData extends Data, T = any> = Pick<BoxProps, Exclude<keyof BoxProps, 'children'>> & {
  children: any
  listProps?: BoxProps
  renderPageSize?: number // 渲染大小
  pageSize: number // 分页大小, >= 10
  defaultItemHeight?: number // 初始化单个列表高度
  itemKey?: (index: number, data: T) => any // 唯一标识，不存在则取用index，但最好存在
  infiniteScrollResult: {
    data: TData | undefined
    loading: boolean
    loadingMore: boolean
    noMore: boolean
    loadMore: () => void
    loadMoreAsync: () => Promise<TData>
    reload: () => void
    reloadAsync: () => Promise<TData>
    mutate: import('react').Dispatch<any>
    cancel: () => void
  } // 配合 ahooks 的 useInfiniteScroll 使用
  extendData?: any // 扩展参数，用于传递给 children
  containerRef?: React.MutableRefObject<HTMLDivElement | null> // 滚动容器的 ref，用于监听滚动事件，默认是document.body
  offsetHeight?: number // 用于预渲染判断
  defaultState?: {
    domsData?: TDomsData
    startIndex?: number
    scrollNum?: number
  }
  onStateChange?: (defaultState: {
    domsData?: TDomsData
    startIndex?: number
    scrollNum?: number
  }) => void
}

export type TDomsData = Record<
  number,
  {
    height: number
    top?: number
  }
>

export function InfiniteVirtualScroll<TData extends Data, T = any> ({
  children,
  pageSize,
  offsetHeight = 0,
  renderPageSize = 10,
  defaultItemHeight = 170,
  infiniteScrollResult,
  listProps,
  itemKey,
  extendData,
  containerRef,
  onStateChange,
  defaultState,
  ...reset
}: TProps<TData, T>) {
  useLingui()

  const boxRef = useRef<HTMLDivElement>(null)

  const { noMore, loadingMore, loading, loadMore, data } = infiniteScrollResult

  const domsRef = useRef<TDomsData>(defaultState?.domsData || {})
  const [domsData, setDomsData] = useState<TDomsData>(defaultState?.domsData || {})

  // 渲染列表项
  const [[startIndex, stopIndex], setShowIndex] = useState<[number, number]>([
    defaultState?.startIndex || 0,
    (defaultState?.startIndex || 0) + (renderPageSize - 1),
  ])

  useEffect(() => {
    const dom = containerRef?.current || document
    if (dom) {
      dom.addEventListener('scroll', runScroll)
    }
    return () => {
      dom && dom.removeEventListener('scroll', runScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  // 容器滚动
  const scrollNumRef = useRef<number>(defaultState?.scrollNum || 0)
  const { run: runScroll } = useThrottleFn(
    () => {
      const containerTop = containerRef?.current?.getBoundingClientRect?.()?.top || 0
      const boxTop = boxRef.current?.getBoundingClientRect?.()?.top || 0
      const scrollNum = Math.max(0, containerTop - boxTop)

      let isGoBottom = false
      if (scrollNum >= scrollNumRef.current) {
        isGoBottom = true
      }
      scrollNumRef.current = scrollNum
      // console.log('scrollNumRef.current:', scrollNumRef.current)
      // console.log('是否是向下滚动：', isGoBottom)

      if (scrollNumRef.current <= 0) {
        return setShowIndex([0, renderPageSize - 1])
      }

      const curIndex = startIndex
      const tagDom = domsRef.current[curIndex]
      if (typeof tagDom?.top === 'undefined' || typeof tagDom?.height === 'undefined') {
        return
      }
      const maxIndex = Array.isArray(data?.list) ? (data?.list as [])?.length - 1 : 0

      // 向下滚动
      if (isGoBottom) {
        let addIndex = 0
        let differencePX = scrollNumRef.current - tagDom.top - (tagDom?.height || defaultItemHeight)
        // console.log('tagDom:', JSON.stringify(tagDom))
        // console.log('differencePX:', differencePX)

        while (differencePX > 0) {
          if (stopIndex + addIndex <= maxIndex) {
            addIndex++
            differencePX -= domsRef.current?.[curIndex + addIndex]?.height || defaultItemHeight
          } else {
            differencePX = 0
          }
        }
        if (addIndex > 0) {
          const newStopIndex = Math.min(stopIndex + addIndex, maxIndex)
          if (newStopIndex > maxIndex - pageSize) {
            !noMore && loadMore()
          }
          setShowIndex([Math.max(0, newStopIndex - (renderPageSize - 1)), newStopIndex])
        }
      }
      // 向上滚动
      else {
        let delIndex = 0
        let differencePX = tagDom.top - scrollNumRef.current
        while (differencePX > 0) {
          if (startIndex - delIndex > 0) {
            delIndex++
            const preDom = domsRef.current?.[startIndex - delIndex]
            differencePX = differencePX - (preDom?.height || defaultItemHeight)
          } else {
            differencePX = 0
          }
        }
        if (delIndex > 0) {
          const newStartIndex = Math.max(startIndex - delIndex, 0)
          setShowIndex([newStartIndex, Math.min(newStartIndex + renderPageSize - 1, maxIndex)])
        }
      }
    },
    { wait: 200 }
  )

  // 如果 index 高度变化，那后续的 domDataRef top 都需要重新计算
  const setItemStyle = useCallback((changeH: number, changeIndex: number) => {
    if (domsRef.current?.[changeIndex]?.height && changeH === domsRef.current[changeIndex].height) {
      return
    }
    // console.log('changeIndex=', changeIndex, '__changeH=', changeH)

    domsRef.current[changeIndex] = {
      height: changeH,
    }

    const newDomsData = { ...domsRef.current }
    setDomsData(newDomsData)
  }, [])

  const main = useMemo(() => {
    if (!Array.isArray(data?.list)) {
      return null
    }

    let initTop = domsRef.current[startIndex]?.top || startIndex * defaultItemHeight
    const items = []
    for (let index = Math.max(0, startIndex); index <= stopIndex; index++) {
      if (index > (data?.list as []).length - 1) {
        break
      }

      const itemData = data?.list[index]
      const key = itemKey?.(index, itemData) || index
      let itemTop
      if (index > startIndex) {
        const preH = domsData?.[index - 1]?.height
        if (preH) {
          initTop += preH
          itemTop = initTop
          domsRef.current[index] = {
            ...(domsData[index] || null),
            top: itemTop,
          }
        }
      } else {
        itemTop = initTop
        domsRef.current[index] = {
          ...(domsData[index] || null),
          top: itemTop,
        }
      }

      items.push(
        <ListItem key={key} top={itemTop} index={index} setHeight={setItemStyle}>
          {createElement(children, {
            data: itemData,
            index,
            key,
            extendData,
          })}
        </ListItem>
      )
    }

    return items
  }, [
    children,
    startIndex,
    stopIndex,
    data?.list,
    itemKey,
    domsData,
    defaultItemHeight,
    setItemStyle,
    extendData,
  ])

  const minHeight = useMemo(() => {
    if (!(Array.isArray(data?.list) && (data?.list as [])?.length > 0)) {
      return 0
    }

    const endIndex = Math.min(stopIndex, (data?.list.length as number) - 1)
    let preH = 0
    let preIndex = 0
    for (let i = endIndex; i >= startIndex; i--) {
      const itemDom = domsRef.current[i]
      if (typeof itemDom?.top === 'number') {
        preH = itemDom.top + (itemDom?.height || defaultItemHeight)
        preIndex = i
        break
      }
    }
    return preH + ((data?.list.length as number) - 1 - preIndex) * defaultItemHeight

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main])

  useEffect(() => {
    onStateChange?.({
      domsData,
      startIndex,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex, domsData])

  return (
    <Box className={'my-infinite-virtual-scroll'} {...reset} ref={boxRef}>
      {loading ? (
        <Center p='12px'>
          <Loading size='md' />
        </Center>
      ) : (
        <>
          <Box
            {...listProps}
            pos='relative'
            style={{
              minHeight: typeof minHeight === 'number' ? Math.max(0, minHeight) : undefined,
            }}
            className={'my-infinite-virtual-scroll-main'}
            overflow={'hidden'}
          >
            {main}
          </Box>
          <Box>
            {noMore ? (
              <Center p='12px' color='blackAlpha.500' fontSize={'14px'}>{t`No more`}</Center>
            ) : loadingMore ? (
              <Center p='12px'>
                <Loading size='md' color='blackAlpha.500' />
              </Center>
            ) : (
              <Center p='12px'>
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  variant='link'
                  color='blackAlpha.500'
                  fontSize={'14px'}
                >
                  {t`Click to load more`}
                </Button>
              </Center>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

const ListItem = ({
  top,
  index,
  setHeight,
  children,
}: {
  top: number | undefined
  index: number
  setHeight: (height: number, index: number) => void
  children: any
}) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { height } = entry.contentRect
        setHeight(height, index)
      }
    })

    const dom = ref?.current
    if (dom) {
      resizeObserver.observe(dom)
    }
    return () => {
      if (dom) {
        resizeObserver.unobserve(dom)
      }
    }
  }, [index, setHeight])

  return (
    <MotionBox
      ref={ref}
      initial='offscreenlist'
      animate={typeof top !== 'undefined' ? 'onscreenlist' : 'offscreenlist'}
      variants={{
        offscreenlist: {
          opacity: 0,
        },
        onscreenlist: {
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.3,
          },
        },
      }}
      pos='absolute'
      w='100%'
      style={{
        transform: `translateY(${typeof top !== 'undefined' ? top : -999}px)`,
      }}
      className={'my-infinite-virtual-scroll-item'}
    >
      {children}
    </MotionBox>
  )
}
