/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-16 17:17:35
 * @LastEditTime: 2021-11-25 15:42:26
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/index.ts
 */
import type { InjectionKey } from 'vue'
// 用于制作组件的函数
export { ComponentItemFactory } from './core/components/abstract';

// 用于config类型定义
export  type { InitConfig } from './config/index';

// 用户的设置 包括可以获取store commander
export { default as UserConfig } from './config/index';
// 导出初始化数据仓库
export { defaultStore } from './config';

export type {IStoreData,IBlockType} from './core/store/storeTypes'
// 初始化store时候使用
export { useStoreState } from './hooks';

export {dragEventResolve,containerDragResolve} from './core/crossDrag/index'

// 这个放到外层容器属性里 ...innerContainerDragUp()
export {innerContainerDrag,innerContainerDragUp,innerDrag} from './core/innerDrag/index'

export {containerFocusRemove} from './core/focusHandler/index'


export { containerResizer } from './core/resizeHandler/containerResizer';

export { wrapperMoveState } from './core/wrapperMove/index';

export {wrapperEvent} from './core/wrapperMove'

export {deepCopy} from './core/utils/index'
export const injectKey: InjectionKey<ReturnType<any>> = Symbol()
