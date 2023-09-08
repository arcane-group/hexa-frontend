import { makeObservable, action, observable, toJS, computed } from 'mobx'
import PubSub from 'pubsub-js'

import { PageCommon } from './PageCommon'
import type { TDomsData } from '@/components/InfiniteVirtualScroll'
import type { ArticleSchema } from '@/services/api/library'

export type TScroll = {
  domsData?: TDomsData
  startIndex?: number
  scrollNum?: number
}

export type TSavedData = {
  list: ArticleSchema[][]
  hasMore: boolean
  Columns: number
}

export class Profile extends PageCommon {
  constructor(...args: any[]) {
    super(...args)

    makeObservable(this)

    this.addEvent()
  }

  destroy() {
    this.removeEvent()
    this.reset()
  }

  addEvent = () => {
    PubSub.subscribe('savedArticles', this.savedArticlesFn)
  }

  removeEvent = () => {
    PubSub.subscribe('savedArticles', this.savedArticlesFn)
  }

  @action
  savedArticlesFn = (_msg: string, { id, data }: { id: string; data?: ArticleSchema }) => {
    if (!id) {
      return
    }

    // 把 this.saved.list 转化成一维度数组
    const list = this.saved.list.reduce((prev, cur) => [...prev, ...cur], [])
    if (data) {
      list.unshift(data)
    } else {
      const index = list.findIndex((item) => item._id === id)
      if (index > -1) {
        list.splice(index, 1)
      }
    }

    // 把 list 转化成 this.saved.list
    const newList: any[] = []
    list.forEach((item, index: number) => {
      const rowIndex = Math.floor(index / this.saved.Columns)
      if (!newList[rowIndex]) {
        newList[rowIndex] = []
      }
      newList[rowIndex].push(item)
    })

    this.saved = {
      ...this.saved,
      list: newList,
    }
  }

  @observable
  saved: TSavedData = {
    list: [],
    hasMore: true,
    Columns: 1,
  }

  @observable
  savedInfiniteScrollProps: TScroll = {
    domsData: {},
    startIndex: 0,
    scrollNum: 0,
  }

  @action
  setSaved = (data: TSavedData) => {
    this.saved = data
  }

  @computed
  get getSaved() {
    return toJS(this.saved)
  }

  @computed
  get getInfiniteScrollProps() {
    return toJS(this.savedInfiniteScrollProps)
  }

  @action
  setInfiniteScrollProps = (data: TScroll, noReset?: boolean) => {
    this.savedInfiniteScrollProps =
      noReset === true ? { ...this.savedInfiniteScrollProps, ...data } : data
  }

  @action
  reset = () => {
    this.saved = {
      list: [],
      hasMore: true,
      Columns: 1,
    }
    this.savedInfiniteScrollProps = {
      domsData: {},
      startIndex: 0,
      scrollNum: 0,
    }
  }
}
