/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 18:26:05
 * @LastEditTime: 2021-11-19 19:06:13
 * @LastEditors: GeekQiaQia
 * @Description: 用来渲染block 组件；
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/components/blocks.tsx
 */

import { defineComponent,computed ,reactive,inject} from 'vue'
import { cloneDeep } from 'lodash'
import { useStoreState} from '@dooring/dooringx-vue-lib';
import { injectKey,UserConfig } from '@dooring/dooringx-vue-lib';

import'./index.scss'
export default defineComponent({
  name: 'ContainerWrapper',
  props:{
    data:{type:Object}
  },
  setup(props) {

    const blockStyles=computed(()=>{
        return {
          top:`${props.data.top}px`,
          left:`${props.data.top}px`,
          zIndex:`${props.data.zIndex}`,

        }
    });

   const block =computed(()=>{
     return props.data
   })
   const config:UserConfig = inject(injectKey)
   console.log(config);
   const component =config.componentRegister.getComp(block.value.name)
   const renderComponent=component.render(props.data,props.context);
    return ()=>(
      <>
      <div  class="editor_block" style={blockStyles.value}>
        {renderComponent}
      </div>
    </>
    )
  }
})

