import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  addGlobalUncaughtErrorHandler
} from 'qiankun'

import {
  appConfig,
  defaultAppPath
} from '@/config/qiankun'

registerMicroApps(appConfig)

addGlobalUncaughtErrorHandler(event => console.log('错误信息：', event))
setDefaultMountApp(defaultAppPath)
export default start
