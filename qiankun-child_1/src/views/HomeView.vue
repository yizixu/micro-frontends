<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your qiankun-child_1"/>
    <button @click="notify">子传父</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import actions from '@/shared/actions'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted () {
    // 注册观察者函数
    // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
    actions.onGlobalStateChange(state => {
      const { token } = state
      // 未登录 - 返回主页
      if (!token) {
        alert('未检测到登录信息！')
        return
      }

      // 获取用户信息
      console.log('子应用1拿到Token:', token)
    }, true)
  },
  methods: {
    notify () {
      actions.setGlobalState({
        message: '子传父'
      })
    }
  }
}
</script>
