import { useMemo, useState } from 'react'
import { useRequest, useMemoizedFn, useUpdateEffect } from 'ahooks'
import type { Service, Data, InfiniteScrollOptions } from 'ahooks/es/useInfiniteScroll/types'

// 需要自定义 setData 的情况使用，否则请直接用 ahook 的 useInfiniteScroll
export const useInfiniteScroll = <TData extends Data>(
  dataStore: {
    finalData: TData
    setFinalData: (data: TData) => void
  },
  service: Service<TData>,
  options: Omit<InfiniteScrollOptions<TData>, 'target' | 'threshold'> = {}
) => {
  const { isNoMore, reloadDeps = [], manual, onBefore, onSuccess, onError, onFinally } = options

  const { finalData, setFinalData } = dataStore
  const [loadingMore, setLoadingMore] = useState(false)

  const noMore = useMemo(() => {
    if (!isNoMore) return false
    return isNoMore(finalData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalData])

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData)
      if (!lastData) {
        setFinalData({
          ...currentData,
          list: [...(currentData.list ?? [])],
        })
      } else {
        setFinalData({
          ...currentData,
          list: [...(lastData.list ?? []), ...currentData.list],
        })
      }
      return undefined as any
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false)
        onFinally?.(d, e)
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        onSuccess?.(d)
      },
      onError: (e) => onError?.(e),
    }
  )

  const loadMore = useMemoizedFn(() => {
    if (noMore) return
    setLoadingMore(true)
    run(finalData)
  })

  const loadMoreAsync = useMemoizedFn(() => {
    if (noMore) return Promise.reject()
    setLoadingMore(true)
    return runAsync(finalData)
  })

  const reload = () => {
    setLoadingMore(false)
    return run()
  }

  const reloadAsync = () => {
    setLoadingMore(false)
    return runAsync()
  }

  useUpdateEffect(() => {
    run()
  }, [...reloadDeps])

  return {
    data: finalData,
    loading: !loadingMore && loading,
    loadingMore,
    noMore,

    loadMore,
    loadMoreAsync,
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel,
  }
}
