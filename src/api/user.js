import request from '@/utils/request'

// 登录注册
export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 刷新用户token
// export const refreshToken = () => {
//   return request({
//     method: 'PUT',
//     url: '/v1_0/authorizations',
//     headers: {
//       Authorization: `Bearer ${store.state.user.refresh_token}`
//     }
//   })
// }
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

// 获取当前登录用户个人信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 修改用户个人信息
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 关注用户
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
