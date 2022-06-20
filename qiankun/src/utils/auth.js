import Cookies from 'js-cookie'
import { isNumber, isString } from '@/utils/validate'

const TokenKey = 'Unlumin-Unismart-token'
const UserInfoKey = 'Unlumin-Unismart-Info'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token = '', expires = 7) {
  expires = isNumber(expires) ? Math.ceil(expires / 3600 / 24) : 7 // 默认7天
  return Cookies.set(TokenKey, token, {
    expires
  })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserInfo () {
  const userInfo = window.localStorage.getItem(UserInfoKey)
  return userInfo ? JSON.parse(userInfo) : {}
}

export function setUserInfo (userInfo = '') {
  const str = isString(userInfo) ? userInfo : JSON.stringify(userInfo)
  return window.localStorage.setItem(UserInfoKey, str)
}

export function removeUserInfo () {
  return window.localStorage.removeItem(UserInfoKey)
}
