/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 16:23:09
 * @LastEditTime: 2021-11-23 17:58:26
 * @LastEditors: GeekQiaQia
 * @Description: 画布组件用来展示画布
 * @FilePath: /dooring/dooringx-vue/packages/dooringx-example-vue3.0/src/components/container.tsx
 */

import { defineComponent, computed } from 'vue'
import Blocks from './blocks'
import { containerResizer, wrapperMoveState, UserConfig } from '@dooring/dooringx-vue-lib'
import { containerDragResolve, innerContainerDrag, containerFocusRemove } from '@dooring/dooringx-vue-lib'
import VerticalAllignMiddle from './icons/verticalAllignMiddle.vue'
import GiteeIcon from './icons/gitee.vue'
import './index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props: {
    storeState: { type: Object },
    config: { type: UserConfig },
    context: { type: String }
  },
  components: {
    Blocks,
    GiteeIcon,
    VerticalAllignMiddle
  },
  setup(props) {
    console.log(props)
    const defaultConfig = computed(() => {
      return props.config
    })

    const scaleState = defaultConfig.value.getScaleState()

    const state = computed(() => {
      return props.storeState
    })

    return () => (
      <>
        <div
          style={{
            position: 'absolute',
            height: `${state.value.container.height + 60}px`,
            width: `${state.value.container.width}px`,
            transform: `scale(${scaleState.value}) translate(${wrapperMoveState.needX}px, ${wrapperMoveState.needY}px)`
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
                overflow: 'hidden'
                // ...editContainerStyle,
              }}
              {...(props.context === 'edit' ? containerDragResolve(defaultConfig.value) : null)}
              {...(props.context === 'edit' ? innerContainerDrag(defaultConfig.value) : null)}
              {...(props.context === 'edit' ? containerFocusRemove(defaultConfig.value) : null)}
            >
              {/* {props.context === 'edit' && (
                <NormalMarkLineRender config={props.config} iframe={false}></NormalMarkLineRender>
              )}
              */}
              {state.value.block.map((v) => {
                return <Blocks key={v.id} data={v} context={props.context}></Blocks>
              })}
            </div>
          </div>
          <div
            style={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: `${state.value.container.width}px`
            }}
          >
            <div style={{ fontSize: '20px', cursor: 's-resize' }} onMousedown={(e) => containerResizer.onMousedown(e, defaultConfig.value)}>
              <VerticalAllignMiddle></VerticalAllignMiddle>
            </div>
          </div>
        </div>
      </>
    )
  }
})
