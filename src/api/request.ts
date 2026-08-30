import axios from 'axios'

// 你的本机内网IP
const baseURL = 'http://localhost:9090'

const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(config => {
  return config
})

// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.error("请求错误",err)
    return Promise.reject(err)
  }
)

export default request
