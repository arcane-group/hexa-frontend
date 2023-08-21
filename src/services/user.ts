import request from '@/utils/request'
// import { sleep } from '@/utils/sleep'

// ---------------------------- login ----------------------------

// 用邮箱或者用户名登录
export const login = async (username: string, password: string) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: {
        token: 'token123',
        user_id: 123,
      },
    },
  })

  return await request.post('/web/login', {
    username,
    password,
  })
}

// 钱包签名登录
export const loginWithWallet = async (
  signature: string,
  address: `0x${string}`,
  chainId: number
) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: {
        token: 'token123',
        user_id: 123,
      },
    },
  })

  return await request.post('/web/login_wallet', {
    address,
    chainId,
    signature,
  })
}

// 获取钱包待签名的消息
export const preLogin = async (address: `0x${string}`, chainId: number) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: `Login to ${address} on chain ${chainId}`,
    },
  })

  return await request.post('/web/sign_message', {
    address,
    chainId,
  })
}

// 检查登录状态
export const checkLogin = async () => {
  return await request.post('/web/check_token')
}

// 获取用户信息
export const getUserInfo = async () => {
  return Promise.resolve({
    data: {
      code: 1,
      data: {
        user_id: 123,
        address: `0x123213213123123123123213123`,
        email: 'string@gmail.com',
        hasSBT: true,
        pic: '',
        name: 'kringt',
      },
    },
  })

  return await request.post('/web/user_info')
}

// ---------------------------- register ----------------------------

// 查询用户名是否可用
export const checkUsername = async (username: string) => {
  return Promise.resolve(username === 'kring')

  return await request
    .post('/web/check_username', { username })
    .then((res) => {
      if (res.data.code >= 0) {
        return !!res.data?.data
      }
      return false
    })
    .catch(() => {
      return false
    })
}

// 查询邮箱是否可用
export const checkEmail = async (email: string) => {
  return Promise.resolve(true)

  return await request
    .post('/web/check_email', { email })
    .then((res) => {
      if (res.data.code >= 0) {
        return !!res.data?.data
      }
      return false
    })
    .catch(() => {
      return false
    })
}

// 注册账号
export const register = async (username: string, email: string, password: string) => {
  return Promise.resolve({
    data: {
      code: password === '123' ? 1 : -1,
      data: {
        token: 'token123',
        user_id: 123,
      },
    },
  })

  return await request.post('/web/register', {
    username,
    email,
    password,
  })
}
