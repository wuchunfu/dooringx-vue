/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 00:10:16
 * @LastEditTime: 2021-11-19 16:42:39
 * @LastEditors: GeekQiaQia
 * @Description: 负责包裹容器的事件监听以及  鼠标事件的处理；
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/wrapperMove/index.tsx
 */
import { defineComponent,computed,renderSlot, useSlots  } from 'vue'

import { cloneDeep } from 'lodash'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    modelValue:{type:Object}
  },
  setup(props) {
    const slots=useSlots();
    // 渲染动态blocks
    const data=computed(()=>{
      return props.modelValue
    })
    return ()=>(
      <>
        <div style={{
          backgroundColor: '#f0f0f0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
        }}>
          {renderSlot(slots, 'default')}
        </div>
      </>
    )
  }
})



