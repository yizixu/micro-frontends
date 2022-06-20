export const startConfig = {
  sandbox: {
    experimentalStyleIsolation: true
  },
  prefetch: true
}
export const appConfig = [
  {
    name: 'vue app 1', // app name registered
    entry: '//localhost:8081',
    container: '#app-child_1_container',
    activeRule: '/app1'
  },
  {
    name: 'vue app 2',
    entry: '//localhost:8082',
    container: '#app-child_2_container',
    activeRule: '/app2'
  }
]
export const defaultAppPath = '/app1'
