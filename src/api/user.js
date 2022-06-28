import request from '@/utils/request'
// 登录注册
export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
  })
}
// 获取用户频道列表
export const getChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}
