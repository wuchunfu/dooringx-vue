/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 18:26:05
 * @LastEditTime: 2021-11-22 23:03:27
 * @LastEditors: GeekQiaQia
 * @Description: 用来渲染block 组件；
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/blocks.tsx
 */

import { defineComponent,computed ,reactive,inject,ref, CSSProperties} from 'vue'
import { cloneDeep } from 'lodash'
import { useStoreState} from '@dooring/dooringx-vue-lib';
import { injectKey,UserConfig } from '@dooring/dooringx-vue-lib';
import {innerDrag} from '@dooring/dooringx-vue-lib'
import'./index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    data:{type:Object}
  },
  setup(props) {

    const blockStyles=computed<CSSProperties>(():CSSProperties=>{
        return {
          top:`${props.data.top}px`,
          left:`${props.data.top}px`,
          zIndex:props?.data?.zIndex as number,
        }
    });

    const {onMouseDown}=innerDrag()

   const block =computed(()=>{
     return props.data
   })

   const config:UserConfig = inject(injectKey)
   const component =config.componentRegister.getComp(block.value.name)
   const renderComponent=component.render(props.data,props.context);
   const blockRef=ref(null);
   const styleDrag: CSSProperties = block.value.canDrag ? { pointerEvents: 'none' } : {};
    return ()=>(
      <>
      <div  class={block.value.focus && block.value.position !== 'static' ?'editor_block dr_block_focus':'editor_block' }
            onMousedown={(e)=>{onMouseDown(e,block.value,config,blockRef.value)}}
            ref={blockRef} style={{...blockStyles.value}}>

              	{/* 绝对定位元素 */}
              {block.value.position !== 'static' && (
                <div  style={{ ...styleDrag }}>
                    {renderComponent}
                </div>
              )}
              	{/* 静态定位 非行内 这里暂不考虑布局影响 */}
            {block.value.position === 'static' && block.value.display !== 'inline' && (
              <div
                // className={animatecss}
                style={{
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                  // ...animateCount,
                }}
              >·
                {renderComponent}
              </div>
            )}
              {/* 静态定位 行内 这里暂不考虑布局影响 */}
            {block.value.position === 'static' && block.value.display === 'inline' && (
              <span style={{ pointerEvents: 'none' }}>{renderComponent}</span>
            )}
      </div>
    </>
    )
  }
})

