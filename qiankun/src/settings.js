const { VUE_APP_GATEWAY_UAA } = process.env
const oAuthPrefix = `${VUE_APP_GATEWAY_UAA}`
export default {
  title: 'UniSmart',

  /**
   * @type { array} ['/xxx/xxx']
   * @description these apis don't need to refresh token or not width access_token.
   * [`${oAuthPrefix}/oauth/user/token`, `${oAuthPrefix}/oauth/refresh/token`]
   */
  oAuthApis: [`${oAuthPrefix}/oauth/user/token`, `${oAuthPrefix}/oauth/token`, `${oAuthPrefix}/oauth/refresh/token`],
  /**
   * @type { String } 'XXXXX'
   * @description headers key of Authorization.
   */
  basicAuthString: 'ZGhnYXRlOnBwMTIz',
  /**
   * @type { Boolean } false | true
   * @description if you want to refresh token automatically, you can set it true.
   */
  refreshTokenAutomatically: false
}
