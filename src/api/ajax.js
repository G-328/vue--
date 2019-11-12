import axios from 'axios'
import qs from 'qs'
import router from '../router';

//生成一个Axios的伪实列，具备Axios实例对象的所有属性、方法，但是不是真实的Axios实例
const instance = axios.create({
  baseURL: '/api'
})


//添加请求拦截器
instance.interceptors.request.use(config => {
  if(config.method.toUpperCase() === 'POST' && config.data instanceof Object){
    config.data = qs.stringify(config.data)
  }
  
  let token = localStorage.getItem('token_key')
  if (config.headers.needToken) {
    if (token) {
      config.headers.authorization = token
    }else {
      throw new Error('无用户记录，请先登录')
    }
  }
  return config
})


//添加响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {

    if (!error.response) {//没发送请求
      //没有token
      alert(error.response)
      router.currentRoute.path !== '/login' && router.replace('/login')
    }else {//发送了请求
      //有token，token过期了
      if (error.response.status === 401) {
        alert('token已过期，请重新登录')
        router.currentRoute.path !== '/login' && router.replace('/login')
      }else if(error.response.status === 404) {
        //请求404
        alert('资源未找到')
      }else {
        alert('请求失败')
      }
    }
    //手动返回一个状态为pending的promsie的实例来中断，保证不会自动进入下一个成功的回调
    return new Promise(() => {})
  }
)

export default instance