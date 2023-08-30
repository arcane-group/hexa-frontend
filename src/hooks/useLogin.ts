import { useAccount, useNetwork, useSignMessage, useDisconnect } from 'wagmi'
import { toast } from 'react-toastify'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  preLogin,
  // checkLogin,
  getUserInfo,
  loginWithWallet,
  login,
} from '@/services/api/user'
import { useStore } from '@/stores'
import { sleep } from '@/utils/sleep'

// 重定向跳转
const useRedirect = () => {
  const {
    query: { redirectTo },
    // pathname,
    replace,
  } = useRouter()

  return useCallback(
    async (waiting: number = 0) => {
      const redirectToUri = (Array.isArray(redirectTo) ? redirectTo[0] : redirectTo) || '/'
      console.log('run 已登录，重定向跳转:', redirectToUri)

      if (waiting && waiting > 0) {
        toast.success(t`Login is successful, the page is about to jump`)
        await sleep(waiting)
      }

      replace(redirectToUri)
    },
    [redirectTo, replace]
  )
}

// 登出
export const useLogout = (isLinkWallet?: boolean) => {
  const { walletStore, commonStore, pageStore } = useStore()
  const { disconnectAsync } = useDisconnect()

  return useCallback(async () => {
    console.log('run 登出. isLinkWallet=', isLinkWallet)

    if (isLinkWallet !== true) {
      walletStore.reset()
      commonStore.reset()
      pageStore.reset()
    }

    try {
      await disconnectAsync().catch((e) => console.error(e))
    } catch (e) {
      console.error(e)
    }
  }, [commonStore, walletStore, pageStore, disconnectAsync, isLinkWallet])
}

// 静默缓存登录 - 直接使用本地缓存进行登录
export const useAutoLogin = () => {
  useLingui()

  const { pathname } = useRouter()

  const { walletStore } = useStore()
  const logoutFn = useLogout()
  const redirectFn = useRedirect()

  return useCallback(
    async (hasToast: boolean = false) => {
      console.log('run 静默缓存登录:', walletStore?.userInfo?.token)
      if (walletStore.loginState !== 1) {
        return false
      }
      try {
        if (walletStore?.userInfo?.token && walletStore?.userInfo?.userId) {
          walletStore.setLoginState(2)

          // const res = await checkLogin()
          // if (res?.data?.code >= 0) {
          //   const res2 = await getUserInfo()
          //   if (res2?.data?.code >= 0) {
          //     walletStore.setUserExtInfo(res2?.data?.data)
          //     walletStore.setLoginState(3)

          //     if (['/sigin-in', '/sign-up'].includes(pathname)) {
          //       await redirectFn()
          //     }

          //     return true
          //   }
          // }
          throw new Error(t`Login status has expired`)
        }
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
      }
      return false
    },
    [logoutFn, walletStore, redirectFn, pathname]
  )
}

// 钱包方式登录 - 在钱包已经链接的状态下, 先用钱包签名, 然后再登录
export const useWalletLogin = (isLinkWallet?: boolean) => {
  useLingui()

  const { walletStore } = useStore()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const logoutFn = useLogout(isLinkWallet)
  const redirectFn = useRedirect()

  return useCallback(
    async (hasToast: boolean = true) => {
      console.log('run 钱包方式登录:', address, chain?.id, isLinkWallet, walletStore.loginState)
      if (walletStore.loginState !== 1 && isLinkWallet !== true) {
        return false
      }

      try {
        if (
          !address ||
          !chain?.id
          // || chain?.unsupported // 限制不支持的链
        ) {
          return false
        }

        !isLinkWallet && walletStore.setLoginState(2)

        // 先获取待签名的消息
        const res = await preLogin(address, `${chain?.id}`)
        if (res?.code < 0) {
          throw new Error(res?.msg)
        }
        // 用钱包签名
        const sign = await signMessageAsync({
          message: res?.data,
        })
        if (!sign) {
          throw new Error(t`Sign message error`)
        }

        const res3 = await loginWithWallet(sign, address, `${chain?.id}`, isLinkWallet)
        if (res3?.code < 0) {
          throw new Error(res3?.msg)
        }
        const userData = res3?.data
        // 设置基础用户信息
        walletStore.setUserInfo({
          token: userData?.token,
          userId: userData?.user_id,
        })
        await sleep(500)

        const res4 = await getUserInfo(userData?._id)
        if (res4?.code < 0) {
          throw new Error(res4?.msg || t`Error getting user information`)
        }
        // 设置详细用户信息
        walletStore.setUserExtInfo(res4?.data)
        !isLinkWallet && walletStore.setLoginState(3)
        await redirectFn()
        return true
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
      }
      return false
    },
    [address, chain?.id, logoutFn, signMessageAsync, walletStore, redirectFn, isLinkWallet]
  )
}

// 账密方式登录
export const useAccountLogin = () => {
  useLingui()

  const { walletStore } = useStore()

  const logoutFn = useLogout()
  const redirectFn = useRedirect()

  return useCallback(
    // email or username
    async (email: string, password: string, hasToast: boolean = true) => {
      console.log('run 账密方式登录')
      if (walletStore.loginState !== 1) {
        return {
          code: -1,
          msg: t`Login status has expired`,
        }
      }

      try {
        if (!email || !password) {
          throw new Error(t`Please enter email and password`)
        }

        walletStore.setLoginState(2)

        // TODO: 需要加一个判断，当已注册 未验证邮箱的时候 跳转验证邮箱页面
        const res3 = await login(email, password)
        if (res3?.code < 0) {
          throw new Error(res3?.msg)
        }
        const userData = res3?.data
        // 设置基础用户信息
        walletStore.setUserInfo({
          token: userData?.token,
          userId: userData?.user_id,
        })
        await sleep(500)

        const res4 = await getUserInfo(userData?._id)
        if (res4?.code < 0) {
          throw new Error(res4?.msg || t`Error getting user information`)
        }
        // 设置详细用户信息
        walletStore.setUserExtInfo(res4?.data)
        walletStore.setLoginState(3)
        await redirectFn()
        return {
          code: 1,
          msg: '',
        }
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
        return {
          code: -1,
          msg: e?.message || t`Login failed`,
        }
      }
    },
    [logoutFn, walletStore, redirectFn]
  )
}
