<template>
<div>
  <el-header>
    <div>Header</div>
    <LangSelect />
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1']" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item index="/app1">APP1</el-menu-item>
          <el-menu-item index="/app2">APP2</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <div id="app-child_1_container"></div>
      <div id="app-child_2_container"></div>
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>
import startQiankun from '@/qiankun'
import { startConfig } from '@/config/qiankun'
import LangSelect from '@/components/LangSelect'
import actions from '@/shared/actions'
export default {
  components: {
    LangSelect
  },
  mounted () {
    this.initQiankun()
  },
  methods: {
    initQiankun () {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true
        startQiankun(startConfig)
        this.stateChange()
      }
    },
    stateChange () {
    // 注册一个观察者函数
      actions.onGlobalStateChange((state, prevState) => {
        console.log(this.$route.path)
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('主应用收到：', state)
      })
    }
  }
}
</script>

<style>

</style>
