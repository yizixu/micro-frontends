import request from '@/utils/request'
const {
  VUE_APP_GATEWAY_UAA,
  VUE_APP_GATEWAY_USER
} = process.env

export function login (params) {
  return request({
    url: `${VUE_APP_GATEWAY_UAA}/oauth/token`,
    method: 'post',
    params
  })
}

export function logout (params = {}) {
  return request({
    url: `${VUE_APP_GATEWAY_UAA}/oauth/remove/token`,
    method: 'get',
    params
  })
}

// accessToken刷新token
export function fetchRefreshToken (data = {}) {
  return request({
    url: `${VUE_APP_GATEWAY_UAA}/oauth/refresh/token`,
    method: 'post',
    data
  })
}

// 获取用户信息
export function fetchUserInfo (params) {
  return request({
    url: `${VUE_APP_GATEWAY_USER}/user`,
    method: 'get',
    params
  })
}
