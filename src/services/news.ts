import request from '@/utils/request'
// import { sleep } from '@/utils/sleep'

// 点赞
export const likeNews = async (id: string, status: 0 | 1) => {
  return Promise.resolve({
    data: {
      code: 1,
      data: true,
    },
  })

  return await request.post('/web/like_news', {
    id,
    status,
  })
}

// 分页获取我的收藏列表
export const getMyCollectList = async (page: number, pageSize: number) => {
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

  return await request.get('/web/my_collect_list', {
    params: {
      page,
      pageSize,
    },
  })
}
