import { initGlobalState } from 'qiankun'

const initialState = {
  message: '',
  token: '',
  roles: [],
  userInfo: {}
}
const actions = initGlobalState(initialState)

export default actions
