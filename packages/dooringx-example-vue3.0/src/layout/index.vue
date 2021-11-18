<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-11 16:29:01
 * @LastEditTime: 2021-11-18 17:26:27
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/layout/index.vue
-->
<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
           <Header />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="380px">
        <Left/>
      </el-aside>
      <el-main>
        <Wrapper/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref, watchEffect } from 'vue'

import Left from '../components/Left/index.vue'
import Header from '../components/Header/index.vue'
import Wrapper from '../components/Wrapper/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Left,
    Wrapper
  },
  setup() {


    return {

    }
  }
})
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  position: relative;
  z-index: 99;
  background-color: white;
}

.el-aside {
  background-color: white;
}

.layout-container {
  height: calc(100vh - 80px);
}

.el-main {
  position: relative;
  padding: 12px;
  background-color: #f5f5f5;
  @media (min-width: 1111px) {
    overflow-x: hidden;
  }
}
</style>
