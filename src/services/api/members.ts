import request from '@/utils/request'

export interface MembersSchema {
  name: string
  category: string
  description: string
  serviceInfo: string
  servicesAvailable: string[]
  discord: string
}

// 分页获取指定分类下列表
export const getMemberCategoryList = async (
  // page: number, pageSize: number,
  type: any
) => {
  return await request
    .get(
      '/members/category/' + type
      // {
      //   params: {
      //     page,
      //     pageSize,
      //     type,
      //   },
      // }
    )
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as MembersSchema[],
          msg: '',
        }
      }
      throw new Error('Error retrieving articles')
    })
    .catch((e) => {
      return {
        code: -1,
        data: null,
        msg: e.message,
      }
    })
}

// // 查询详情
// export const getLibraryById = async (id: string) => {
//   return await request
//     .get('/members/' + id)
//     .then((res) => {
//       if (res?.status === 200) {
//         return {
//           code: 0,
//           data: Array.isArray(res?.data) ? (res?.data?.[0] as MembersSchema) : null,
//           msg: '',
//         }
//       }
//       throw new Error('Error retrieving articles')
//     })
//     .catch((e) => {
//       return {
//         code: -1,
//         data: null,
//         msg: e.message,
//       }
//     })
// }
