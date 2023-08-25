import request from '@/utils/request'
// import { sleep } from '@/utils/sleep'

// 分页获取指定分类下的会员列表
export const getMemberList = async (page: number, pageSize: number, type: any) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: {
        list: Array.from({ length: page > 5 ? 1 : pageSize }, (_, index) => ({
          id: Date.now() + '_' + index,
        })),
        total: 5 * pageSize + 1,
      },
    },
  })

  return await request.get('/web/member_list', {
    params: {
      page,
      pageSize,
      type,
    },
  })
}
