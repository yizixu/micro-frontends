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
      },
      redirect: '',
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(async () => {
        this.loading = false
        await this.$store.dispatch('user/login', this.formData)
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery }).catch(() => {})
        // todo
      }, 2000)
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style>

</style>
