import request from '@/utils/request'

export interface ApplicationSchema {
  name: string
  email: string
  telegram: string
  wechat: string
  twitter: string
  background: string
  projectLink: string
  website: string
  walletAddress: string
  introduction: string
  referral: string
  approved: boolean
}

export const postMembershipApplication = async (data: ApplicationSchema) => {
  return await request
    .post('/application', data)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as ApplicationSchema,
          msg: '',
        }
      }
      throw new Error('Error retrieving applications')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e?.message,
      }
    })
}
