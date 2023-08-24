import { makeObservable, action, observable } from 'mobx'

import { Profile } from './Profile'
import { Home } from './Home'

// 全局页面路由设置
export enum PAGEPATH {
  Profile = '/profile',
  Home = '/',
}

const PageClass = {
  [PAGEPATH.Profile]: Profile,
  [PAGEPATH.Home]: Home,
}

export type PageType = undefined | Profile | Home

// 全局页面数据
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
      const newName =
        pathname !== '/' ? (pathname.replace(/\/$/, '') as keyof typeof PageClass) : PAGEPATH.Home
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
