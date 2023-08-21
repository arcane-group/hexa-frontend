import { useAccount, useNetwork, useSignMessage, useDisconnect } from 'wagmi'
import { toast } from 'react-toastify'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { preLogin, checkLogin, getUserInfo, loginWithWallet, login } from '@/services/user'
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
export const useLogout = () => {
  const { walletStore, commonStore, pageStore } = useStore()
  const { disconnectAsync } = useDisconnect()

  return useCallback(async () => {
    console.log('run 登出')

    walletStore.reset()
    commonStore.reset()
    pageStore.reset()
    try {
      await disconnectAsync().catch((e) => console.error(e))
    } catch (e) {
      console.error(e)
    }
  }, [commonStore, walletStore, pageStore, disconnectAsync])
}

// 静默缓存登录 - 直接使用本地缓存进行登录
export const useAutoLogin = () => {
  useLingui()

  const { walletStore } = useStore()
  const logoutFn = useLogout()
  const redirectFn = useRedirect()

  return useCallback(
    async (hasToast: boolean = false) => {
      console.log('run 静默缓存登录')
      if (walletStore.loginState !== 1) {
        return false
      }
      try {
        if (walletStore?.userInfo?.token && walletStore?.userInfo?.userId) {
          walletStore.setLoginState(2)

          const res = await checkLogin()
          if (res?.data?.code >= 0) {
            const res2 = await getUserInfo()
            if (res2?.data?.code >= 0) {
              walletStore.setUserExtInfo(res2?.data?.data)
              walletStore.setLoginState(3)
              await redirectFn()
              return true
            }
          }
          throw new Error(t`Login status has expired`)
        }
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
      }
      return false
    },
    [logoutFn, walletStore, redirectFn]
  )
}

// 钱包方式登录 - 在钱包已经链接的状态下, 先用钱包签名, 然后再登录
export const useWalletLogin = () => {
  useLingui()

  const { walletStore } = useStore()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const logoutFn = useLogout()
  const redirectFn = useRedirect()

  return useCallback(
    async (hasToast: boolean = true) => {
      console.log('run 钱包方式登录')
      if (walletStore.loginState !== 1) {
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

        walletStore.setLoginState(2)

        // 先获取待签名的消息
        const res = await preLogin(address, chain?.id)
        if (res.data?.code < 0) {
          throw new Error(res?.data?.msg)
        }
        const message = res?.data?.data
        // 用钱包签名
        const sign = await signMessageAsync({
          message,
        })
        if (!sign) {
          throw new Error(t`Sign message error`)
        }

        const res3 = await loginWithWallet(sign, address, chain?.id)
        if (res3.data?.code < 0) {
          throw new Error(res3?.data?.msg)
        }
        const userData = res3?.data?.data
        // 设置基础用户信息
        walletStore.setUserInfo({
          token: userData?.token,
          userId: userData?.user_id,
        })
        await sleep(500)

        const res4 = await getUserInfo()
        if (res4?.data?.code < 0) {
          throw new Error(res4?.data?.msg || t`Error getting user information`)
        }
        // 设置详细用户信息
        walletStore.setUserExtInfo(res4?.data?.data)
        walletStore.setLoginState(3)
        await redirectFn()
        return true
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
      }
      return false
    },
    [address, chain?.id, logoutFn, signMessageAsync, walletStore, redirectFn]
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
        return false
      }

      try {
        if (!email || !password) {
          return false
        }

        walletStore.setLoginState(2)

        const res3 = await login(email, password)
        if (res3.data?.code < 0) {
          throw new Error(res3?.data?.msg)
        }
        const userData = res3?.data?.data
        // 设置基础用户信息
        walletStore.setUserInfo({
          token: userData?.token,
          userId: userData?.user_id,
        })
        await sleep(500)

        const res4 = await getUserInfo()
        if (res4?.data?.code < 0) {
          throw new Error(res4?.data?.msg || t`Error getting user information`)
        }
        // 设置详细用户信息
        walletStore.setUserExtInfo(res4?.data?.data)
        walletStore.setLoginState(3)
        await redirectFn()
        return true
      } catch (e: any) {
        hasToast && e?.message && toast.error(e?.message)
        await logoutFn()
      }
      return false
    },
    [logoutFn, walletStore, redirectFn]
  )
}
