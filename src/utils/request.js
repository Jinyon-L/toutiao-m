// 封装 axios 请求模块
import axios from 'axios'
import store from '@/store'
import { setItem, getItem } from '@/utils/storage'
import router from '@/router'
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
      config.headers.Authorization = 'Bearer ' + getItem('TOKEN_USER').token
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

// 添加响应拦截器,token过期问题
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error) {
    console.log(error)
    // 使用refresh_token获取新的token
    if (error.response.request.status === 401) {
      try {
        const { data } = await axios({
          method: 'PUT',
          url: 'http://toutiao.itheima.net/v1_0/authorizations',
          headers: {
            Authorization: 'Bearer ' + getItem('TOKEN_USER').refresh_token
          }
        })
        setItem('TOKEN_USER', { token: data.data.token, refresh_token: store.state.user.refresh_token })
        error.config.headers.Authorization = `Bearer ${data.data.token}`
        axios(error.config) // 获取最新token后重新发上一次失败的请求
        location.reload() // 刷新当前页面
      } catch (err) {
        console.log(err)
        // 如果refresh_token也过期
        if (err.response.status === 500 && err.config.url === 'http://toutiao.itheima.net/v1_0/authorizations' && err.config.method === 'put') {
          console.log(123)
          router.replace('/login')
        }
      }
    }
  }
)
