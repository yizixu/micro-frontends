
import store from '@/store'
import actions from '@/shared/actions'

actions.setGlobalState({
  logoutFn: function () {
    store.dispatch('user/logout')
  }
})
