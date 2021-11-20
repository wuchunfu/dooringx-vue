
import { defineComponent, reactive,computed, ref, inject } from 'vue'
import { injectKey,UserConfig } from '@dooring/dooringx-vue-lib';
import  './index.scss'
import {useDragEventResolve} from '@dooring/dooringx-vue-lib'
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
    // const onDragStart=(item)=>{
    //   console.log("item is ");
    // }
    // const onDragOver=(e)=>{
    //   e.preventDefault();
    // }
    const  {onDragStart,onDragOver}=useDragEventResolve()
    const dragStart=(e)=>{
      console.log(e,'in to drag');
    }
     const testRest=()=>{
       return {
        onDragStart: () => {
          console.log('on drag start');
        },
       }
     }
     return ()=>(
       <>
        <el-tabs v-model={state.activeName} tab-position="left" class="leftConfig" onTabClick={handleClick}>
            {
              tabs.map((tabItem)=>(

                <el-tab-pane name={tabItem.displayName} type={tabItem.type} lazy  v-slots={{
                  label:(item=tabItem)=><>
                    <div class={'tabItem'}>
                      <i style="font-size:22px" class={`icon iconfont ${item.icon}`}  ></i>
                      {item.displayName}
                    </div>

                   </>
                }}>
                <div class="leftco">
                  {
                    checkList.value.map((list)=>(
                     <>
                       <div
                        class="coitem"
                        draggable
                        onDragover={e=>{onDragOver}}
                        onDragstart={e=>{onDragStart(list,e)}}
                       >
                        <div class="redbox">
                          <i class={` icon iconfont ${list.img}`}></i>
                          </div>
                          <div class="displayName">
                          {list.displayName}
                        </div>

                        </div>
                      </>
                    ))
                  }
                </div>
                </el-tab-pane>
              ))
            }
        </el-tabs>

       </>
     )

  }
})

{/* <el-tabs v-model="activeName" tab-position="left" class="left-config" @tab-click="handleClick"> */}
// <template v-for="tabItem in tabs"  :key="tabItem.type">
//   <el-tab-pane :name="tabItem.displayName" :type="tabItem.type" lazy >
//     <template #label>
//       <div class="tab-item">
//         <i style="font-size:22px" class="icon iconfont" :class="tabItem.icon"></i>
//         {{ tabItem.displayName }}
//       </div>
//     </template>
//          <div class="leftco">
//         <template v-for="list in checkList" :key="list.component">
//               <div
//                 class="coitem"
//                 draggable="true"
//                 :onDragStart="onDragStart(list)"
//               >
// //                 <div class="redbox">
// //                   <i class="icon iconfont" :class="list.img"></i>
//                 </div>
                // <div class="displayName">
                //   {{list.displayName}}
                // </div>
//               </div>
//         </template>
//        </div>
//   </el-tab-pane>
// </template>

// </el-tabs>

