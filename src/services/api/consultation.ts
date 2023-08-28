import request from '@/utils/request'

export interface ConsultationSchema {
  name: string
  email: string
  service: string
  message: string
  completed: boolean
}

export const postConsultation = async (data: ConsultationSchema) => {
  return await request
    .post('/consultation', data)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as ConsultationSchema,
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
