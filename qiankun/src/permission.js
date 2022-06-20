import router, { constantRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
import qkActions from '@/shared/actions'

const whiteList = constantRoutes.map(item => item.path).filter(item => item !== '/')

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = getToken()
  const roles = store.state.user.roles

  // handle sso login
  let queryObj = to.query
  if (queryObj && queryObj.accessToken) {
    const { accessToken } = queryObj
    store.commit('user/SET_TOKEN', {
      accessToken
    })
    try {
      // const userInfo = await store.dispatch('user/getInfo')
      const { accessToken, ...data } = queryObj
      to.query = queryObj = data
      // 使用用户信息获取系统需要的数据
      // judgeInitInfoUser(userInfo, to, next, queryObj, true)
    } catch (error) {
      store.dispatch('user/logoutLocal').then(() => {
        next(`/login?redirect=${to.path}`)
      })
    }
    return false
  }

  // handle login status
  if (token) {
    qkActions.setGlobalState({ token })
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (roles && roles.length) {
        qkActions.setGlobalState({ roles })
        next()
      } else {
        try {
          const defaultRoles = ['admin']
          store.commit('user/SET_ROLES', defaultRoles)
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles: defaultRoles })
          // dynamically add accessible routes
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          next(to.path)
        } catch (error) {
          Message.error(error || 'Has Error')
          next({
            path: '/login',
            query: {
              redirect: to.path
            }
          })
        }
      }
    }
  } else {
    if (whiteList.some(item => to.path.indexOf(item) === 0)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
