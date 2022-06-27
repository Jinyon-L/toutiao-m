import request from '@/utils/request'

// 获取用户频道列表
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}
