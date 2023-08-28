import request from '@/utils/request'

export interface EnquirySchema {
  name: string
  email: string
  service: string
  message: string
  resolved: boolean
}

export const postEnquiry = async (data: EnquirySchema) => {
  return await request
    .post('/enquiry', data)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as EnquirySchema,
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
