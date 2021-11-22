/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 16:23:09
 * @LastEditTime: 2021-11-22 22:12:34
 * @LastEditors: GeekQiaQia
 * @Description: 画布组件用来展示画布
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/container.tsx
 */

import { defineComponent,computed ,watchEffect,ref} from 'vue'
import Blocks from './blocks'
import { cloneDeep } from 'lodash'
import { useStoreState} from '@dooring/dooringx-vue-lib';
import {useContainerDragResolve,innerContainerDrag,containerFocusRemove} from '@dooring/dooringx-vue-lib'
import './index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    config:{type:Object},
    context:{type:String}
  },
  components:{
    Blocks
  },
  setup(props) {

    const defaultConfig =computed(()=>{
      return props.config
    })

    const {onDragOver,onDrop}=useContainerDragResolve();
    const {onMouseMove}=innerContainerDrag(defaultConfig.value);
    const {onMouseDown} =containerFocusRemove(defaultConfig.value);

    const state=ref();
    watchEffect(()=>{
    const [storeState]=useStoreState(defaultConfig.value);
    state.value=storeState
    console.log(state);


    });
    return ()=>(
      <>
        <div
          style={{
            position: 'absolute',
            height: `${state.value.container.height + 60}px`,
            width: `${state.value.container.width}px`,
            // transform: `scale(${scaleState.value}) translate(${wrapperMoveState.needX}px, ${wrapperMoveState.needY}px)`,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              id="dr-container"
              class="dr_container"
              style={{
                height: `${state.value.container.height}px`,
                width: `${state.value.container.width}px`,
                backgroundColor: 'rgb(255, 255, 255)',
                position: 'relative',
                overflow: 'hidden',
                // ...editContainerStyle,
              }}

              onDragover={e=>{onDragOver(e)}}
              onDrop={e=>{onDrop(e,defaultConfig.value)}}
              onMousemove={e=>{onMouseMove(e)}}
              onMousedown={e=>{onMouseDown(e)}}
              // {...(props.context === 'edit' ? {onDragOver:ondragover(e=>{})} : null)}
              // {...(props.context === 'edit' ? innerContainerDrag(props.config) : null)}
              // {...(props.context === 'edit' ? containerFocusRemove(props.config) : null)}
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
          {/* <div
            style={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: `${props.state.container.width}px`,
            }}
          >
            <div
              style={{ fontSize: '20px', cursor: 's-resize' }}
              onMouseDown={(e) => containerResizer.onMousedown(e, props.config)}
            >
              {props.config.getConfig().containerIcon}
            </div>
          </div> */}
        </div>
    </>
    )
  }
})

