<template>
  <div id="page-login">
    <LangSelect />
    <el-card>
      <el-form>
        <el-form-item>
          <el-input v-model.trim="formData.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="login">{{ $t('common.login') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import actions from '@/shared/actions'
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    LangSelect
  },
  data () {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        actions.setGlobalState({ token: 'testToken' })
        this.$router.push({
          name: 'app1'
        })
        // todo
      }, 2000)
    }
  }
}
</script>

<style>

</style>
