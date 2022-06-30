import request from '@/utils/request'

// 获取新闻推荐数据
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}
