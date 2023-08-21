import { observable, action, makeObservable, computed } from 'mobx'
import getConfig from 'next/config'

import { getCookie, removeCookie, setCookie } from '@/utils/cookie'

const { publicRuntimeConfig } = getConfig()

const userStoreKey = 'USER_LOCAL_KEY_' + publicRuntimeConfig.storeVersion

export type TUserExtInfo = {
  userId: number
  address?: `0x${string}`
  email?: string
  hasSBT?: boolean // 是否有 SBT
  pic?: string // 头像
  name?: string // 昵称
}

export type TUserInfo = Pick<TUserExtInfo, 'userId'> & {
  token: string
}

export default class WalletStore {
  constructor() {
    makeObservable(this)
  }

  // 基础核心用户信息
  @observable
  userInfo: TUserInfo | null = null

  // 扩展用户信息
  @observable
  userExtInfo: TUserExtInfo | null = null

  // 登录状态
  @observable
  loginState: 1 | 2 | 3 = 1 // 1 no   2 loading   3 ok

  // 默认chainId
  @computed
  get chainId() {
    return publicRuntimeConfig?.defaultChainId
  }

  @action
  hydrate(data: any) {
    if (!data) {
      return
    }
    let obj = null
    try {
      const objStr = getCookie(userStoreKey)
      if (objStr) {
        obj = JSON.parse(objStr)
      }
    } catch (e) {
      console.error(e)
    }
    obj && this.setUserInfo(obj)
  }

  @action
  setUserInfo(data: TUserInfo | null) {
    if (data?.token && data?.userId) {
      setCookie(userStoreKey, JSON.stringify(data), 7)
    } else {
      removeCookie(userStoreKey)
    }
    this.userInfo = data
  }

  @action
  setUserExtInfo(data: TUserExtInfo | null) {
    this.userExtInfo = data
  }

  @action
  setLoginState = (loginState: 1 | 2 | 3) => {
    this.loginState = loginState
  }

  @action
  reset() {
    this.setLoginState(1)
    this.setUserInfo(null)
    this.setUserExtInfo(null)
  }
}
