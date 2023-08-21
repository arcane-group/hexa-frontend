import {
  observable,
  action,
  makeObservable,
  // computed, toJS
} from 'mobx'
// import getConfig from 'next/config'

// const { publicRuntimeConfig } = getConfig()

export default class CommonStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  isPC = false

  // 使用 hydrate 来再次初始化 store。（注意，每次重载app.js的时候都会调用此方法，要做好兼容，避免不必要的bug）
  @action
  hydrate = (obj?: { isPC?: boolean }) => {
    if (typeof obj?.isPC === 'boolean') {
      this.updateIsPC(obj.isPC)
    }
  }

  @action
  updateIsPC(isPC: boolean) {
    if (typeof isPC !== 'boolean') return
    this.isPC = isPC
  }

  @action
  reset() {}
}
