import request from '@/utils/request'

export interface ArticleSchema {
  title: string
  description: string
  category: string
  text: string
  recommended: boolean
  _id: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
  author: string
  avatar: string
  tags: string[]
}

// 分页获取最新图书列表
export const getLibraryLatestList = async () =>
  // page: number, pageSize: number
  {
    return await request
      .get(
        '/articles/latest'
        //  {
        //   params: {
        //     page,
        //     pageSize,
        //   },
        // }
      )
      .then((res) => {
        if (res?.status === 200) {
          return {
            code: 0,
            data: res?.data as ArticleSchema[],
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

// 分页获取指定分类下的图书列表
export const getLibraryCategoryList = async (
  // page: number, pageSize: number,
  type: any
) => {
  return await request
    .get(
      '/articles/category/' + type
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
          data: res?.data as ArticleSchema[],
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

export const getLibraryTopList = async () => {
  return await request
    .get('/articles/top')
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as ArticleSchema[],
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

export const getLibraryreCommendedList = async () => {
  return await request
    .get('/articles/recommended')
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: res?.data as ArticleSchema[],
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

// 查询详情
export const getLibraryById = async (id: string) => {
  return await request
    .get('/articles/' + id)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: Array.isArray(res?.data) ? (res?.data?.[0] as ArticleSchema) : null,
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

export const save = async (articleId: string, userId: string) => {
  return await request
    .post(`/articles/save/${articleId}/${userId}`)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
          msg: '',
        }
      }
      throw new Error('Error saving article')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e?.message,
      }
    })
}

export const remove = async (articleId: string, userId: string) => {
  return await request
    .post(`/articles/remove/${articleId}/${userId}`)
    .then((res) => {
      if (res?.status === 200) {
        return {
          code: 0,
          data: true,
          msg: '',
        }
      }
      throw new Error('Error saving article')
    })
    .catch((e) => {
      return {
        code: -1,
        data: false,
        msg: e?.message,
      }
    })
}
