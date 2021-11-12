<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
           <!-- <Header /> -->
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
import { useStore } from '@/store/index'


export default defineComponent({
  name: 'Layout',
  components: {
  },
  setup() {

    const store = useStore()
    const originalStyle = ref('')
    const colors = reactive({
      primary: '#fff'
    })

    const showSetting = computed(() => store.state.settingsModule.showSettings)
    const opened = computed(() => store.getters['appModule/getSidebarState'])
    const hideHeader = computed(() => store.getters['settingsModule/getHideHeaderState'])
    const fixedHeader = computed(() => store.getters['settingsModule/getFixedHeaderState'])

    const device = computed(() => store.getters['appModule/getDeviceState'])
    const withoutAnimation = computed(() => store.getters['appModule/getSidebarAnimation'])
    const originalStylesheetCount = computed(() => document.styleSheets.length || -1)
    const classObj = computed(() => ({
      hideSidebar: !opened.value,
      openSidebar: opened.value,
      withoutAnimation: withoutAnimation.value,
      mobile: device.value === 'mobile'
    }))
    /**
     * @description 监听device && opend
     * */
    watchEffect(() => {
      if (device.value === 'mobile') {
        store.dispatch('appModule/closeSideBar', { withoutAnimation: false })
      }
    })

    const handleClickOutside = () => {
      store.dispatch('appModule/closeSideBar', { withoutAnimation: false })
    }

    /**
     * @description 切换内容显示
     */
    const handleHeaderChange = () => {
      // 改变state
      store.dispatch('settingsModule/toToggleHeader')
    }
    /**
     * @description 是否固定头部
     */

    const handleFixedHeaderChange = () => {
      // 改变state
      store.dispatch('settingsModule/toToggleFixedHeader')
    }
    const handleSidebarLogoChange = () => {
      // 改变state
      store.dispatch('settingsModule/toToggleSidebarLogo')
    }

    return {
      opened,
      device,
      hideHeader,
      fixedHeader,
      handleClickOutside,
      handleHeaderChange,
      handleFixedHeaderChange,
      handleSidebarLogoChange,
      classObj,
      showSetting,
      ...toRefs(colors)
    }
  }
})
</script>

<style lang="scss" scoped>
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
