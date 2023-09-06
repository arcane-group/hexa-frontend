import request from '@/utils/request'

export interface EnquirySchema {
  name: string
  email: string
  message: string
}

export const postEnquiry = async (data: EnquirySchema) => {
  return await request
    .post('/enquiry', { ...data, resolved: false })
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as EnquirySchema,
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
