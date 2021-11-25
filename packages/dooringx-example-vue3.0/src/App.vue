<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-09 16:07:18
 * @LastEditTime: 2021-11-24 17:30:43
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/App.vue
-->
<template>
  <el-config-provider locale="'/zh-CN'">
    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { defineComponent, computed,provide } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import './assets/icons/iconfont/iconfont.js'
import {defaultConfig} from './plugin/index'  // for test
import { UserConfig,injectKey } from '@dooring/dooringx-vue-lib';
export const config:UserConfig = new UserConfig(defaultConfig);

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
  // 注入可视化编辑器配置
  provide(injectKey, config)

    return {}
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
}
</style>
