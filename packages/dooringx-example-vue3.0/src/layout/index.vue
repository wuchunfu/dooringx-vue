<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
           <Header />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="380px">
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref, watchEffect } from 'vue'

import Header from '../components/Header/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    Header
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
