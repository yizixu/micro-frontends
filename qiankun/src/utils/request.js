import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import errorMessageMap from '@/model/errorMessage'
import { isBlob } from '@/utils/validate'
import { Message } from 'element-ui'
import defaultSettings from '@/settings'
const { VUE_APP_BASE_API } = process.env
// create an axios instance
const service = axios.create({
  baseURL: VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// refresh token
const handleRefreshTokenRequest = async (error) => {
  try {
    const data = await store.dispatch('user/tokenRefresh')
    const { accessToken } = data
    store.commit('user/SET_TOKEN', {
      accessToken
    })
    store.commit('user/SET_USERINFO', data)
    const config = error.response.config
    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers['Accept-Language'] = store.getters.language
    const res = await service(config)
    return res
  } catch (error) {
    console.log('handleRefreshTokenRequest', error)
    return error
  }
}

// check auth api
const checkUnAuthApi = (url = '') => {
  url = url.replace(VUE_APP_BASE_API, '')
  return defaultSettings.oAuthApis.includes(url)
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = `Bearer ${token}`
    }
    if (checkUnAuthApi(config.url)) {
      config.headers.Authorization = `Basic ${defaultSettings.basicAuthString}`
    }
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log('success', response)
    const res = response.data
    if (response.config.responseType === 'blob' && isBlob(res)) {
      // if the responseType is blob, judge the constructor of res
      return response
    } else if (res.code !== 200) {
      // if the custom code is not 200, it is judged as an error.
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
  async error => {
    console.log('error', error)
    const { response } = error
    let message = null
    if (response) {
      // 统计请求异常错误日志
      // store.dispatch('app/sendUserLog', {
      //   eventType: 'error_monitor',
      //   eventName: 'ERROR监控',
      //   enventMsg: {
      //     code: response.status,
      //     message: response.data.message || error.message,
      //     path: response.config.url || '',
      //     time: new Date().getTime()
      //   }
      // })
      if (response.status === 401 && !checkUnAuthApi(response.config.url)) {
        let res = null
        try {
          if (!defaultSettings.refreshTokenAutomatically) {
            throw new Error(error)
          }
          res = await handleRefreshTokenRequest(error)
        } catch (err) {
          store.dispatch('user/resetToken').then(() => {
            router.push({
              name: 'login'
            })
          })
          return Promise.reject(err)
        }
        return res
      }
      // 500异常处理，多个错误提示语随机warning提示
      if (response.status === 500) {
        message = errorMessageMap[response.status]
        Message({
          message: message,
          type: 'warning',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
      // 定义错误提示语
      message = response.data.message
    }
    Message({
      message: message || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
