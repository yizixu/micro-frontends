import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth'
import { resetRouter } from '@/router'
import {
  login,
  logout,
  fetchRefreshToken,
  fetchUserInfo
} from '@/api/user'

const state = {
  token: getToken(),
  userInfo: getUserInfo()
}

const mutations = {
  SET_TOKEN: (state, data = {}) => {
    const { accessToken = '', expiresIn = 7 } = data
    state.token = accessToken
    if (accessToken) {
      setToken(accessToken, expiresIn)
    } else {
      removeToken()
    }
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
    if (data) {
      setUserInfo(data)
    } else {
      removeUserInfo()
    }
  }
}

const actions = {
  // user login
  loginAction ({ commit, dispatch }, loginFormData) {
    const { username, password } = loginFormData
    return new Promise((resolve, reject) => {
      login({
        username: username.toLowerCase(),
        password: password
      }).then(async response => {
        const { data = {} } = response
        commit('SET_TOKEN', data)
        // 获取用户信息和配置
        try {
          await dispatch('getInfo')
        } catch (error) {
          return reject(error)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logoutAction ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        token: state.token
      }).then(() => {
        commit('SET_TOKEN', {})
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // Token refresh
  tokenRefresh ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      const { refreshToken = '' } = state.userInfo
      if (!refreshToken) {
        return reject(new Error('Authorization is Empty!'))
      }
      fetchRefreshToken({ refreshToken }).then(async response => {
        const { data = null } = response
        if (!data) {
          reject(new Error('Verification failed, please login again.'))
        }
        commit('SET_TOKEN', data)
        try {
          await dispatch('getInfo')
        } catch (error) {
          return reject(error)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      fetchUserInfo().then(response => {
        const { data = null } = response
        if (!data) {
          reject(new Error('Verification failed, please login again.'))
        }
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', {})
      commit('SET_USERINFO', null)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
