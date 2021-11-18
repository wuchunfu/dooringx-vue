/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 00:10:16
 * @LastEditTime: 2021-11-17 00:10:16
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/Wrapper/moveWrapper.vue
 */

<template>
  <div class="dr-container">
    <div class="dr-editor">
      <div class="dr-editor-content">

      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, watchEffect, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
export default defineComponent({
  name: 'drEditor',
  components: {},
  emits: ['on-selected'],
  setup() {

    const state = reactive({
      drag: false
    })

    /**
     * @description 操作当前页面样式表
     */
    watchEffect(() => {
      const bodyStyleStr = `
      .dr-editor-content {
        background-color: rgb(255,255,255);
      }`
      const styleSheets = document.styleSheets[0]
      const firstCssRule = document.styleSheets[0].cssRules[0]
      const isExistContent = firstCssRule.cssText.includes('.dr-editor-content')
      if (isExistContent) {
        styleSheets.deleteRule(0)
      }
      styleSheets.insertRule(bodyStyleStr)
    })
    return {
      ...toRefs(state),

    }
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';

.dr-container {
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 380px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1114px) {
    padding-right: 0;
  }
}

.dr-editor {
  width: 660px;
  height: 740px;
  min-width: 660px;
  padding: 60px 150px 0;
  overflow: hidden auto;
  background: #fafafa;
  border-radius: 5px;
  box-sizing: border-box;
  background-clip: content-box;
  contain: layout;

  &::-webkit-scrollbar {
    width: 0;
  }

  &-content {
    min-height: 100%;
    transform: translate(0);
    box-shadow: 0 8px 12px #ebedf0;
  }
}

.list-group-item {
  position: relative;
  padding: 3px;
  cursor: move;

  > div {
    position: relative;
  }

  &.focus {
    @include showComponentBorder;
  }

  &.drag::after {
    display: none;
  }

  &:not(.has-slot) {
    content: '';
  }

  &.focusWithChild {
    @include showContainerBorder;
  }

  i {
    cursor: pointer;
  }
}
</style>


