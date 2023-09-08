import { useCallback } from 'react'
import { computed } from 'mobx'

import { useStore } from '@/stores'

export const useLibraryCollect = (id: string, data: any) => {
  const { walletStore } = useStore()

  const isLiked = computed(() => {
    if (walletStore.getSavedArticles(id)) {
      return true
    }
    return false
  }).get()

  const setIsLiked = useCallback(
    (newIsLiked: boolean) => {
      if (newIsLiked) {
        walletStore?.setSavedArticles(id, data)
      } else {
        walletStore?.setSavedArticles(id)
      }
    },
    [data, id, walletStore]
  )

  return {
    isLiked,
    setIsLiked,
  }
}
