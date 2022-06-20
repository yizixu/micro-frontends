<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="cursor: pointer;">
      <span v-if="showText">{{ $t('navbar.language') }}</span>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ar'" command="ar">
        عربي
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    showText: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
    }
  }
}
</script>
