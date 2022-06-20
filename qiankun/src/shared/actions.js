import { initGlobalState } from 'qiankun'

const initialState = {
  message: '',
  token: ''
}
const actions = initGlobalState(initialState)

export default actions
