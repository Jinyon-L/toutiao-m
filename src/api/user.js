import request from '@/utils/request'

// 登录
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
