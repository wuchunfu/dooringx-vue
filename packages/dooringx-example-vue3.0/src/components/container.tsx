/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 16:23:09
 * @LastEditTime: 2021-11-25 17:03:42
 * @LastEditors: GeekQiaQia
 * @Description: 画布组件用来展示画布
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/container.tsx
 */

import { defineComponent,computed } from 'vue'
import Blocks from './blocks'
import { containerResizer,wrapperMoveState,UserConfig} from '@dooring/dooringx-vue-lib';
import {containerDragResolve,innerContainerDrag,containerFocusRemove} from '@dooring/dooringx-vue-lib'
import VerticalAllignMiddle from './icons/vertical-allign-middle.vue'
import './index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    storeState:{type:Object},
    config:{type:UserConfig},
    context:{type:String}
  },
  components:{
    Blocks,
    VerticalAllignMiddle
  },
  setup(props) {
    const defaultConfig =computed(()=>{
      return props.config
    })

	  const scaleState = defaultConfig.value.getScaleState();

    const state=computed(()=>{
      return props.storeState
    })

    const bgColor = () => {
      const isEdit = defaultConfig.value.getStoreChanger().isEdit();
      if (isEdit) {
        return 'rgba(255,255,255,1)';
      } else {
        return state.value.globalState.containerColor ?? 'rgba(255,255,255,1)';
      }
    };
    return ()=>(
      <>

        {
          props.context === 'edit'&& (
            <div
            style={{
              position: 'absolute',
              height: `${state.value.container.height + 60}px`,
              width: `${state.value.container.width}px`,
              transform: `scale(${scaleState.value}) translate(${wrapperMoveState.needX}px, ${wrapperMoveState.needY}px)`,
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                id="dr-container"
                class="dr_container"
                style={{
                  height: `${state.value.container.height}px`,
                  width: `${state.value.container.width}px`,
                  backgroundColor: bgColor(),
                  position: 'relative',
                  overflow: 'hidden',
                  // ...editContainerStyle,
                }}
                {...(props.context === 'edit' ? containerDragResolve(defaultConfig.value) : null)}
                {...(props.context === 'edit' ? innerContainerDrag(defaultConfig.value)  : null)}
                {...(props.context === 'edit' ? containerFocusRemove(defaultConfig.value) : null)}
              >
                {/* {props.context === 'edit' && (
                  <NormalMarkLineRender config={props.config} iframe={false}></NormalMarkLineRender>
                )}
                */}
                {state.value.block.map((v) => {
                  return (
                    <Blocks
                      key={v.id}
                      data={v}
                      context={props.context}
                    ></Blocks>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: `${state.value.container.width}px`,
              }}
            >
              <div
                style={{ fontSize: '20px', cursor: 's-resize' }}
                onMousedown={(e) => containerResizer.onMousedown(e, defaultConfig.value)}
              >
                <VerticalAllignMiddle></VerticalAllignMiddle>
              </div>
            </div>
          </div>
          )
        }
        {props.context === 'preview' && (
                <div
                  id="dr-container-preview"
                  // className={styles.yh_container_preview}
                  style={{
                    // height: `${getRealHeight(props.state.container.height)}px`,   //暂时不考虑高度计算；
                    width: `100%`,
                    position: 'relative' as 'absolute' | 'relative',
                    overflow: 'hidden',
                    backgroundColor: bgColor(),
                    // ...previewContainerStyle,
                  }}
                >
                  {state.value.block.map((v) => {
                    return (
                      <Blocks key={v.id} config={props.config} data={v} context={props.context}></Blocks>
                    );
                  })}
                </div>
              )}

    </>
    )
  }
})

