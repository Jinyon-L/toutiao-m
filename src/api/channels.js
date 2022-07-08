import request from '@/utils/request'

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
