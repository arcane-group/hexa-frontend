import { makeObservable, action, observable, toJS, computed } from 'mobx'
// import PubSub from 'pubsub-js'

import { PageCommon } from './PageCommon'
import type { TScroll } from './Profile'

export type TData = {
  list: any[]
  hasMore: boolean
}

export class LibraryIndex extends PageCommon {
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
  data: TData = {
    list: [],
    hasMore: true,
  }

  @observable
  dataInfiniteScrollProps: TScroll = {
    domsData: {},
    startIndex: 0,
    scrollNum: 0,
  }

  @action
  setData = (data: TData) => {
    this.data = data
  }

  @computed
  get getData() {
    return toJS(this.data)
  }

  @computed
  get getInfiniteScrollProps() {
    return toJS(this.dataInfiniteScrollProps)
  }

  @action
  setInfiniteScrollProps = (data: TScroll, noReset?: boolean) => {
    this.dataInfiniteScrollProps =
      noReset === true ? { ...this.dataInfiniteScrollProps, ...data } : data
  }

  @action
  reset = () => {
    this.data = {
      list: [],
      hasMore: true,
    }
    this.dataInfiniteScrollProps = {
      domsData: {},
      startIndex: 0,
      scrollNum: 0,
    }
  }
}
