export default {
  language: state => state.app.language,
  editorLang: state => {
    switch (state.app.language) {
      case 'zh':
        return 'zh-cn'
      default:
        return state.app.language
    }
  },
  userInfo: state => state.user.userInfo
}
