import request from '@/utils/request'

// import type { NewsSchema } from './news'
import type { ArticleSchema } from './library'

export interface UserSchema {
  username: string
  role: string
  email: string
  password: string
  avatar: string
  emailVerified: boolean
  walletVerified: boolean
  walletAddress: string
  whitelistStatus: boolean
  savedArticles: string[]
  savedNews: string[]
  _id: string
  __v: number
  createdAt: string
  updatedAt: string
}

// 查询邮箱是否可用
export const checkEmail = async (email: string) => {
  return await request
    .get('/user/email', {
      data: {
        email,
      },
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
        }
      }
      throw new Error('Email already taken')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e?.message,
      }
    })
}

// 查询用户名是否可用
export const checkUsername = async (username: string) => {
  return await request
    .get('/user/username', {
      data: {
        username,
      },
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 1,
          data: true,
          msg: '',
        }
      }
      throw new Error('Username already taken')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e?.message,
      }
    })
}

// 获取用户信息
export const getUserInfo = async (id: string) => {
  return await request
    .get('/user/profile/' + id)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: (Array.isArray(res?.data) ? res?.data[0] : res?.data) as UserSchema,
          msg: '',
        }
      }
      throw new Error('Error retrieving user')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// 验证邮箱中的链接（绑定到账户）
export const verifyEmail = async (id: string, token: string) => {
  return await request
    .get(`/user/verifyEmail/${id}/${token}`)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
          msg: 'User successfully verified',
        }
      } else if (res?.status === 401) {
        throw new Error('Invalid link provided')
      }
      throw new Error('Error verifying email')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e.message,
      }
    })
}

// 绑定钱包到账户
export const verifyWallet = async (
  id: string,
  data: {
    signature: string
    walletAddress: `0x${string}`
  }
) => {
  return await request
    .post(`/user/verifyWallet/${id}`, data)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
          msg: '',
        }
      }
      throw new Error('Error verifying wallet address')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e.message,
      }
    })
}

// 邮箱注册账号
export const register = async (username: string, email: string, password: string) => {
  return await request
    .post('/user/signup', {
      username,
      email,
      password,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as UserSchema,
          msg: '',
        }
      } else if (res?.status === 401) {
        throw new Error('Email already registered')
      }
      throw new Error('Error creating user')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// 忘记密码 通过邮箱发送邮件
export const forgotPasswordByEmail = async (email: string) => {
  return await request
    .post('/user/requestResetPassword', {
      email,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
        }
      } else if (res?.status === 401) {
        throw new Error('User email doesn’t exist')
      }
      throw new Error('Error generating link')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e.message,
      }
    })
}

// reset password
export const resetPassword = async (token: string, password: string, userId: string) => {
  return await request
    .post('/user/resetPassword', {
      token,
      password,
      userId,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
        }
      } else if (res?.status === 401) {
        throw new Error('Invalid password reset token')
      }
      throw new Error('Error')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e.message,
      }
    })
}

// 获取钱包待签名的消息
export const preLogin = async (address: `0x${string}`, chainId: string) => {
  return await request
    .post('/session/preLogin', {
      address,
      chainId,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 1,
          data: res?.data,
          msg: '',
        }
      }
      throw new Error('Error generating signature')
    })
    .catch((e) => {
      return {
        code: -1,
        data: '',
        msg: e.message,
      }
    })
}

// 用邮箱或者用户名登录
export const login = async (email: string, password: string) => {
  return await request
    .post('/session/emailLogin', {
      email,
      password,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data,
          msg: '',
        }
      }
      throw new Error('Email or Password error')
    })
    .catch((e) => {
      return {
        code: -1,
        data: '',
        msg: e.message,
      }
    })
}

// 钱包签名登录
export const loginWithWallet = async (
  signature: string,
  walletAddress: `0x${string}`,
  chainId: string,
  userId?: string // 是否是关联钱包到现有账户
) => {
  if (userId) {
    return await verifyWallet(userId, {
      signature,
      // chainId,
      walletAddress,
    })
  }

  return await request
    .post('/session/walletLogin', {
      walletAddress,
      chainId,
      signature,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data,
          msg: '',
        }
      } else if (res?.status === 401) {
        throw new Error('Invalid signature')
      }
      throw new Error('Error logging in')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// 编辑用户信息
export const editInfo = async (
  uid: string,
  data: { username?: string; password?: string; avatar?: string }
) => {
  return await request
    .put(`/user/edit/${uid}`, data)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data,
          msg: '',
        }
      }
      throw new Error('Error updating profile')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// 绑定邮箱
export const linkEmail = async (username: string, email: string, password: string) => {
  throw new Error('Error')
  return await request
    .post(``, {
      username,
      password,
      email,
    })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data,
          msg: '',
        }
      }
      throw new Error('Error updating profile')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// 获取用户收藏的文章
export const getSavedArticles = async (id: string) => {
  return await request
    .get(`/user/savedArticles/${id}`)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as ArticleSchema[],
          msg: '',
        }
      }
      throw new Error('Error retrieving saved articles')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}
