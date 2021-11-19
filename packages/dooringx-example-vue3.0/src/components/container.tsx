/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 16:23:09
 * @LastEditTime: 2021-11-19 16:43:18
 * @LastEditors: GeekQiaQia
 * @Description: 画布组件用来展示画布
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/container.tsx
 */

import { defineComponent,computed ,reactive} from 'vue'
import { cloneDeep } from 'lodash'
import styles from './index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    modelValue:{type:Object}
  },
  setup(props) {
    // 渲染动态blocks
    const data=computed(()=>{
      return props.modelValue
    })
    // mock
    const state=reactive({
      container:{
        width:375,
        height:667
      }
    });
    return ()=>(
      <>
        <div
          style={{
            position: 'absolute',
            height: `${state.container.height + 60}px`,
            width: `${state.container.width}px`,
            // transform: `scale(${scaleState.value}) translate(${wrapperMoveState.needX}px, ${wrapperMoveState.needY}px)`,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              id="dr-container"
              class={styles.drContainer}

              style={{
                height: `${state.container.height}px`,
                width: `${state.container.width}px`,
                backgroundColor: 'rgb(255, 255, 255)',
                position: 'relative',
                overflow: 'hidden',
                // ...editContainerStyle,
              }}
              // {...(props.context === 'edit' ? containerDragResolve(props.config) : null)}
              // {...(props.context === 'edit' ? innerContainerDrag(props.config) : null)}
              // {...(props.context === 'edit' ? containerFocusRemove(props.config) : null)}
            >
              {/* {props.context === 'edit' && (
                <NormalMarkLineRender config={props.config} iframe={false}></NormalMarkLineRender>
              )}
              {props.state.block.map((v) => {
                return (
                  <Blocks
                    config={props.config}
                    key={v.id}
                    data={v}
                    context={props.context}
                  ></Blocks>
                );
              })} */}
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

