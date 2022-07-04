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

// 获取所有频道列表
export const getAllchannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const getAddchannel = (channels) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户频道
export const deleteChannel = (channelid) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelid}`
  })
}
