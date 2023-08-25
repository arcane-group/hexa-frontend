import { makeObservable, action, observable, toJS, computed } from 'mobx'
// import PubSub from 'pubsub-js'

import { PageCommon } from './PageCommon'
import type { TScroll } from './Profile'

export type TData = {
  list: any[]
  hasMore: boolean
}

export class NewsCategory extends PageCommon {
  constructor(...args: any[]) {
    super(...args)

    makeObservable(this)

    this.addEvent()
  }

  destroy() {
    this.removeEvent()
    this.reset()
  }

  addEvent = () => {}

  removeEvent = () => {}

  @observable
  news: TData = {
    list: [],
    hasMore: true,
  }

  @observable
  newsInfiniteScrollProps: TScroll = {
    domsData: {},
    startIndex: 0,
    scrollNum: 0,
  }

  @action
  setNews = (data: TData) => {
    this.news = data
  }

  @computed
  get getNews() {
    return toJS(this.news)
  }

  @computed
  get getInfiniteScrollProps() {
    return toJS(this.newsInfiniteScrollProps)
  }

  @action
  setInfiniteScrollProps = (data: TScroll, noReset?: boolean) => {
    this.newsInfiniteScrollProps =
      noReset === true ? { ...this.newsInfiniteScrollProps, ...data } : data
  }

  @action
  reset = () => {
    this.news = {
      list: [],
      hasMore: true,
    }
    this.newsInfiniteScrollProps = {
      domsData: {},
      startIndex: 0,
      scrollNum: 0,
    }
  }
}
