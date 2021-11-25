/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 00:10:16
 * @LastEditTime: 2021-11-24 17:30:28
 * @LastEditors: GeekQiaQia
 * @Description: 负责包裹容器的事件监听以及  鼠标事件的处理；
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/container-wrapper/index.tsx
 */
import { defineComponent,computed,renderSlot, useSlots,ref  } from 'vue'
import { wrapperEvent,UserConfig } from "@dooring/dooringx-vue-lib";

export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    config:{type:UserConfig},
  },
  setup(props) {
    const slots=useSlots();
    const wrapperRef = ref(null);
    // 渲染动态blocks
    const defaulgConfig=computed(()=>{
      return props.config
    })
    return ()=>(
      <>
        <div
          ref={wrapperRef}
          style={{
            backgroundColor: '#f0f0f0',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none',

          }}

        {...wrapperEvent(wrapperRef.value, defaulgConfig.value)}
        >
          {renderSlot(slots, 'default')}
        </div>
      </>
    )
  }
})



