import { makeObservable, action, observable, toJS, computed } from 'mobx'
// import PubSub from 'pubsub-js'

import { PageCommon } from './PageCommon'
import type { TDomsData } from '@/components/InfiniteVirtualScroll'

export type TScroll = {
  domsData?: TDomsData
  startIndex?: number
  scrollNum?: number
}

export type TSavedData = {
  list: any[]
  hasMore: boolean
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

  addEvent = () => {}

  removeEvent = () => {}

  @observable
  saved: TSavedData = {
    list: [],
    hasMore: true,
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
    }
    this.savedInfiniteScrollProps = {
      domsData: {},
      startIndex: 0,
      scrollNum: 0,
    }
  }
}
