import { makeObservable, action, observable } from 'mobx'

import { TEST } from './test'

// 全局页面路由设置
export enum PAGEPATH {
  TEST = '/test',
}

const PageClass = {
  [PAGEPATH.TEST]: TEST,
}

export type PageType = undefined | TEST

// 全局页面数据
// TODO: 还差清空缓存策略，不然内存吃不消，但是目前没想好清楚策略
export default class PageStore {
  constructor() {
    makeObservable(this)

    this.addEvent()
  }

  hydrate() {}

  destroy() {
    this.removeEvent()
    this.reset()
  }

  addEvent = () => {}

  removeEvent = () => {}

  @observable
  history = new Map<string, PageType>()

  @observable
  scrollers = new Map<string, number>()

  @action
  setHistory = (key: string, pathname: string) => {
    if (this.history.has(key)) {
    } else {
      const newName = pathname.replace(/\/$/, '') as keyof typeof PageClass
      if (PageClass[newName]) {
        this.history.set(key, new PageClass[newName](newName))
      }
    }
  }

  getHistory = (key: string, pathname?: string) => {
    if (this.history.has(key)) {
    } else if (typeof pathname === 'string') {
      this.setHistory(key, pathname)
    }
    return this.history.get(key) as PageType
  }

  @action
  setPageScrollTop = (key: string, scrollTop: number = window.scrollY) => {
    this.scrollers.set(key, scrollTop)
  }

  getPageScrollTop = (key: string) => {
    return this.scrollers.get(key) || 0
  }

  @action
  reset() {
    this.history.forEach((page) => {
      page?.destroy?.()
    })
    this.history.clear()
    this.scrollers.clear()
  }
}
