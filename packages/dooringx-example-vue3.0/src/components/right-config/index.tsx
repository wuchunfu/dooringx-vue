/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-24 17:32:06
 * @LastEditTime: 2021-11-25 21:31:11
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/right-config/index.tsx
 */



import { defineComponent, reactive,computed, ref,watchEffect, inject } from 'vue'
import { injectKey,UserConfig,IBlockType,IStoreData,deepCopy } from '@dooring/dooringx-vue-lib';
import  './index.scss'
export default defineComponent({
  name: 'ReftConfig',
  props:{
    storeState:{type:Object},
    config:{type:UserConfig},
  },
  setup(props) {

    const config:UserConfig = inject(injectKey)
     // 从用户注册的config中获取所有注册的组件map；
     const configCategory=computed(()=>{
      return config.getConfig().rightRenderListCategory
    });

    const activeTab = reactive({
      activeName: configCategory.value[0].displayName,
      activeType:configCategory.value[0].type
    })

    const defaultConfig =computed(()=>{
      return props.config
    })

    const state=computed(()=>{
      return props.storeState
    })
    const current=ref(null);
    const input=ref('dooringx');
    const predefineColors = ref([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577',
    ])

    //全局配置改变store 全局属性；
    const handleChange=(e)=>{

      const val = e;
      // 如果是模态框编辑状态，
			const isEdit = defaultConfig.value.getStoreChanger().isEdit();
			if (isEdit) {
        const originData: IStoreData = deepCopy(
          defaultConfig.value.getStoreChanger().getOrigin()!.now
        );
        originData.container.height = val;
        defaultConfig.value.getStoreChanger().updateOrigin(originData);
      } else {
        const originData = deepCopy(defaultConfig.value.getStore().getData());
        originData.container.height = val;
        defaultConfig.value.getStore().setData(originData);
      }

    }

    const handleColorChange=(e)=>{
      const isEdit = defaultConfig.value.getStoreChanger().isEdit();
      if (isEdit) {
        const originData: IStoreData = deepCopy(
          defaultConfig.value.getStoreChanger().getOrigin()!.now
        );
        originData.globalState.containerColor = e
        defaultConfig.value.getStoreChanger().updateOrigin(originData);
      } else {
        const originData = deepCopy(props.config.getStore().getData());
        originData.globalState.containerColor = e;
        defaultConfig.value.getStore().setData(originData);
      }
    }


    const handleClick=(tab:any, event:any) =>{
      activeTab.activeType=tab.instance.attrs.type;
    }


    watchEffect(()=>{
      let item: IBlockType | undefined;
      state.value.block.some((v) => {
        if (v.focus) {
          item = v;
        }
        return v.focus === true;
      });
      if (item) {
        current.value=item;
      } else {
        current.value=null;
      }
    });

     return ()=>(
       <>
        {
          !current.value&&(
            <>
            <div style={{ padding: '20px' }}>
              <el-row style={{ padding: '10px 0 20px 0', fontWeight: 'bold', userSelect: 'none' }}>
              全局设置
              </el-row>
              <el-row  justify="space-between" style={{ padding: '10px 0' }}>
                <el-col span={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>标题</el-col>
                <el-col span={18} style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                  <el-input v-model={input.value} placeholder="dooringx" />
                </el-col>
              </el-row>
              <el-row  justify="space-between" style={{ padding: '10px 0' }}>
                <el-col span={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>容器高度</el-col>
                <el-col span={18} style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                <el-input-number
                    v-model={state.value.container.height}
                    min={667}
                    controls-position="right"
                    onChange={(e)=>{handleChange(e)}}
                  />
                </el-col>
              </el-row>
              <el-row  justify="space-between" style={{ padding: '10px 0' }}>
                <el-col span={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>容器底色</el-col>
                <el-col span={18} style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                  <div class="color-block">
                  <el-color-picker  show-alpha  size="medium"  predefine={predefineColors.value} v-model={state.value.globalState.containerColor} onChange={((e)=>{handleColorChange(e)})} />
                  </div>
                </el-col>
              </el-row>
            </div>

            </>
          )
        }
        {
          current.value&&(
            <el-tabs v-model={activeTab.activeName}   tab-position="top" class="rightConfig" onTabClick={handleClick}>


            {
              configCategory.value.map((tabItem)=>(

                <el-tab-pane name={tabItem.displayName} type={tabItem.type} lazy  v-slots={{
                  label:(item=tabItem)=><>
                    <div class={'tabItem'}>
                      {item.displayName}
                    </div>

                   </>
                }}>
                {/* <div class="leftco">
                  {
                    checkList.value.map((list)=>(
                     <>
                       <div
                        class="coitem"
                        {...dragEventResolve(list)}
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
                </div> */}
                </el-tab-pane>
              ))
            }
        </el-tabs>

          )
        }

       </>
     )

  }
})