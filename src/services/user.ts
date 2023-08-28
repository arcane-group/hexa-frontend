import request from '@/utils/request'
// import { sleep } from '@/utils/sleep'

// ---------------------------- login ----------------------------

// 用邮箱或者用户名登录 1
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

// 钱包签名登录 1
export const loginWithWallet = async (
  signature: string,
  address: `0x${string}`,
  chainId: number,
  isLinkWallet?: boolean // 是否是关联钱包到现有账户
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

  if (isLinkWallet === true) {
    return await request.post('/web/link_wallet', {
      address,
      chainId,
      signature,
    })
  }

  return await request.post('/web/login_wallet', {
    address,
    chainId,
    signature,
  })
}

// 获取钱包待签名的消息 1
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
  return Promise.resolve({
    data: {
      code: 1,
    },
  })

  return await request.post('/web/check_token')
}

// 获取用户信息 1
export const getUserInfo = async () => {
  return Promise.resolve({
    data: {
      code: 1,
      data: {
        user_id: 123,
        // address: `0x123213213123123123123213123`,
        email: 'string@gmail.com',
        // hasSBT: true,
        pic: '',
        name: 'kringt',
      },
    },
  })

  return await request.post('/web/user_info')
}

// ---------------------------- register ----------------------------

// 查询用户名是否可用 1
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

// 查询邮箱是否可用 1
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

// 注册账号 1
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

// 验证邮箱中的链接（绑定到账户）1
export const verifyEmail = async (code: string) => {
  return Promise.resolve({
    data: {
      code: code === '123' ? 1 : -1,
      data: null,
    },
  })

  return await request.post('/web/verify_email', {
    code,
  })
}

// 忘记密码 通过邮箱发送邮件 1
export const forgotPasswordByEmail = async (email: string) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: null,
    },
  })

  return await request.post('/web/forgot_password', {
    email,
  })
}

// reset password  1
export const resetPassword = async (code: string, password: string) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: null,
    },
  })

  return await request.post('/web/reset_password', {
    code,
    password,
  })
}

// send verify email
export const sendVerifyEmail = async (email: string) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: null,
    },
  })

  return await request.post('/web/send_verify_email', {
    email,
  })
}

// link email 1
export const linkEmail = async (username: string, email: string, password: string) => {
  return Promise.resolve({
    data: {
      code: password === '123' ? 1 : -1,
      data: true,
    },
  })

  return await request.post('/web/link-email', {
    username,
    email,
    password,
  })
}
