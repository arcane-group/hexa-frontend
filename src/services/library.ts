import request from '@/utils/request'
// import { sleep } from '@/utils/sleep'

// // 点赞
// export const likeNews = async (id: string, status: 0 | 1) => {
//   return Promise.resolve({
//     data: {
//       code: 1,
//       data: true,
//     },
//   })

//   return await request.post('/web/like_news', {
//     id,
//     status,
//   })
// }

// 分页获取最新图书列表
export const getLibraryLatestList = async (page: number, pageSize: number) => {
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

  return await request.get('/web/library_latest_list', {
    params: {
      page,
      pageSize,
    },
  })
}

// 分页获取指定分类下的图书列表
export const getLibraryCategoryList = async (page: number, pageSize: number, type: any) => {
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

  return await request.get('/web/library_category_list', {
    params: {
      page,
      pageSize,
      type,
    },
  })
}
