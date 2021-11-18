<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-16 17:01:35
 * @LastEditTime: 2021-11-18 17:48:45
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/Left/index.vue
-->

<template>
  <el-tabs v-model="activeName" tab-position="left" class="left-config" @tab-click="handleClick">
              <template v-for="tabItem in tabs"  :key="tabItem.type">
                <el-tab-pane :name="tabItem.displayName" :type="tabItem.type" lazy >
                  <template #label>
                    <div class="tab-item">
                      <i style="font-size:22px" class="icon iconfont" :class="tabItem.icon"></i>
                      {{ tabItem.displayName }}
                    </div>
                  </template>
                       <div class="leftco">
                      <template v-for="list in checkList" :key="list.component">
                            <div
                              class="coitem"
                              draggable="true"
                              :onDragStart="onDragStart(list)"
                              :onDragOver="onDragOver"
                            >
                              <div class="redbox">
                                <i class="icon iconfont" :class="list.img"></i>
                              </div>
                              <div class="displayName">
                                {{list.displayName}}
                              </div>
                            </div>
                      </template>
                     </div>
                </el-tab-pane>
              </template>
            </el-tabs>
</template>

<script lang="ts">
import { stat } from 'fs'
import { defineComponent, reactive, toRefs ,computed, ref, watchEffect, inject} from 'vue'
import { injectKey,UserConfig } from '@dooring/dooringx-vue-lib';
export default defineComponent({
  name: 'LeftConfig',
  setup() {

    const config:UserConfig = inject(injectKey)
    const tabs = config.initConfig.leftRenderListCategory
    const state = reactive({
      activeName: tabs[0].displayName,
      activeType:tabs[0].type
    })
     // 从用户注册的config中获取所有注册的组件map；
     const leftAllRegistMap=ref(config.initConfig.leftAllRegistMap);
     // 懒加载选中tab对应的component list
     const checkList = computed(()=>{
       return leftAllRegistMap.value.filter((item)=>{return item.type==state.activeType});
     })

    const handleClick=(tab:any, event:any) =>{
      state.activeType=tab.instance.attrs.type;
    }
    const onDragStart=(item)=>{
      console.log("item is ");
    }
    const onDragOver=(e)=>{
      e.preventDefault();
    }



    return {
      checkList,
      handleClick,
      onDragOver,
      onDragStart,
      ...toRefs(state),
      tabs
    }

  }
})
</script>

<style lang="scss" scoped>
.left-config {
  height: 100%;
  contain: layout;

  > :deep(.el-tabs__header) {
    margin-right: 0;

    .el-tabs__item {
      height: 80px;
      padding: 5px 16px;
      margin:5px 0px;

      .tab-item {
        @apply flex flex-col items-center justify-center;

        [class^='el-icon-'] {
          font-size: 20px;
        }
      }
    }
  }

  > :deep(.el-tabs__content) {
    height: 100%;
    overflow-y: auto;
  }

  .leftco {
		padding: 10px;
		display: flex;
		justify-content: flex-start;
    flex-wrap: wrap;
    height: auto;
    overflow: auto;

		.coitem {
			margin: 5px;
      cursor: pointer;
			.redbox {
				height: 68px;
				width: 68px;
				background: #F7F8FA;
				display: flex;
				align-items: center;
				justify-content: center;
				#icon-checkbox,
				#icon-tabs,
				#icon-jiantou path {
					fill: currentColor;
        }
        i{
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .displayName{
        text-align: center;
        line-height: 20px;
        height: '20px';
        overflow: 'hidden';
        font-feature-settings: "tnum";
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
		}
	}
}
</style>
