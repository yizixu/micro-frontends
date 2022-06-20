<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your qiankun-child_1"/>
    <button @click="notify">子传父</button>
    <button @click="logout">登出</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import actions from '@/shared/actions'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState({
      parentProps: state => state.parentProps
    })
  },
  mounted () {},
  methods: {
    notify () {
      actions.setGlobalState({
        message: '子传父'
      })
    },
    logout () {
      this.parentProps.logoutFn()
    }
  }
}
</script>
