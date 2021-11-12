<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { defineComponent, computed } from 'vue'
import { useStore } from './store/index'
import { ElConfigProvider } from 'element-plus'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    const store = useStore()

    const locale = computed(() => {
      const langState = store.getters['settingsModule/getLangState']
      const local = langState === '/zh-CN' ? zhLocale : enLocale
      return local
    })
    return {
      locale
    }
  }
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
