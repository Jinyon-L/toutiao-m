// 封装 axios 请求模块
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)
export default request

// 添加响应拦截器,token过期问题（未解决）
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error) {
    // try {
    //   const refreshToken = await axios({
    //     method: 'PUT',
    //     url: 'http://toutiao.itheima.net/v1_0/authorizations',
    //     headers: {
    //       Authorization: `Bearer ${store.state.user.refresh_token}`
    //     }
    //   })
    //   console.log(refreshToken)
    // } catch (err) { }
    // console.log(error)
    // 使用refresh_token获取新的token
    if (error.response.request.status === 401) {
      // console.log(store.state.user.refresh_token)
      // const refreshToken = store.state.user.refresh_token
      // console.log(refreshToken)
    }
  }
)
