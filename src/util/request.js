import axios from 'axios'
import router from '@/router'
import {
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'
import store from '@/store/index.js'
import {
  getToken
} from '@/util/auth'
import Vue from 'vue'
let loadingRequestCount = 0;
let loadingInstance;
const showLoading = () => {
  if (loadingRequestCount === 0) {
    loadingInstance = Loading.service();
  }
  loadingRequestCount++
}
const hideLoading = () => {
  if (loadingRequestCount <= 0) return
  loadingRequestCount--
  if (loadingRequestCount === 0) {
    //以服务的方式调用的 Loading 需要异步关闭
    new Vue().$nextTick(() => {
      loadingInstance.close();
    });
  }
}
// let BUILD_SERVER = 'http://129.120.129.106:8080/'
// let DEV_SERVER = 'http://192.168.1.44:8080/'  

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == "production" ? BUILD_SERVER : DEV_SERVER,
  timeout: 30 * 1000, // 请求超时时间 1小时 = 永远都不会超时 
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  showLoading(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    setTimeout(() => {
      hideLoading()
    }, 500);
    const res = response.data
    if (response.request.responseType == 'arraybuffer') {
      console.log(1231)
      return response.data
    } else {
      if (res.code !== 200 && res.code !== 5) {
        Notification.closeAll()
        Notification({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
        // 4:未登录;
        if (res.code === 4 || res.code === 3) {
          router.replace({
            name: 'login'
          })
          // MessageBox.confirm('您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          //   confirmButtonText: '重新登录',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {

          // })
        }
        return Promise.reject('error')
      } else {
        return response.data
      }
    }
  },
  error => {
    setTimeout(() => {
      hideLoading()
    }, 500);
    Notification({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service